import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const app = express();

app.use(cors());
app.use(express.json());

// let ADMINS = [];
// let USERS = [];
// let COURSES = [];

const secretKeyAdmin = "suprS3cr3tAdmin";
const secretKeyUsers = "suprS3cr3tUs3rs";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  published: Boolean,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

// const generateJWTAdmin = (user) => {
//   const payload = { username: user.username };
//   return jwt.sign(payload, secretKeyAdmin, { expiresIn: "1hr" });
// };
// const generateJWTUsers = (user) => {
//   const payload = { username: user.username };
//   return jwt.sign(payload, secretKeyUsers, { expiresIn: "1hr" });
// };
const authenticateJWTAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKeyAdmin, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
const authenticateJWTUsers = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKeyUsers, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// const adminAuthentication = (req, res, next) => {
//   const { username, password } = req.headers;
//   const admin = ADMINS.find(
//     (a) => a.username === username && a.password === password
//   );
//   if (admin) {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin authentication failed" });
//   }
// };
// const userAuthentication = (req, res, next) => {
//   const { username, password } = req.headers;
//   const user = USERS.find(
//     (a) => a.username === username && a.password === password
//   );
//   if (user) {
//     req.user = user;
//     next();
//   } else {
//     res.status(403).json({ message: "User authentication failed" });
//   }
// };
// Admin routes

// Connect to mongoDB
mongoose.connect(
  "mongodb+srv://abhisheksangwan:y9Vu3xPCSobeKS21@course-website.mi5hbsi.mongodb.net/course",
  { useUnifiedTopology: true }
);

// Admin Routes
app.get("/admin/me", authenticateJWTAdmin, (req, res) => {
  res.json({
    username: req.user.username,
  });
});
app.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, secretKeyAdmin, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  //   logic to log in admin
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, secretKeyAdmin, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});


app.post("/admin/courses", authenticateJWTAdmin, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();

  if (!course.title) {
    res.status(411).send({ message: "Please fill in correct course title" });
  }
  course.id = Date.now();
  res.send({ message: "course created  successfully", courseId: course.id });
});
app.put("/admin/course/:courseId", authenticateJWTAdmin, async (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});


app.get("/admin/course/:courseId", authenticateJWTAdmin, async (req, res) => {
  // Logic to find a course
  try {
    const courseId = req.params.courseId;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ course });
  } catch (err) {
    console.error("Error while finding the course:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/admin/courses", authenticateJWTAdmin, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post("/users/signup", async (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).send({ message: "user already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, secretKeyUsers, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, secretKeyUsers, {
      expiresIn: "1h",
    });
    res.json({ message: "User Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});


app.get("/users/courses", authenticateJWTUsers, async (req, res) => {
  // logic to list all courses
  const courses = await Course.find({ published: true });
  res.send({ courses });
});

 
app.post("/users/courses/:courseId", authenticateJWTUsers, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid Course ID" });
  }

  const course = await Course.findById(courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).send({ message: "Course not found or unavailable" });
  }
});

app.get("/users/purchasedCourses", authenticateJWTUsers, async (req, res) => {
  // logic to view purchased courses
  // const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).send({ message: "No courses purchased" });
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
