import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
const app = express();

app.use(cors());
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKeyAdmin = "suprS3cr3tAdmin";
const secretKeyUsers = "suprS3cr3tUs3rs";
const generateJWTAdmin = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKeyAdmin, { expiresIn: "1hr" });
};
const generateJWTUsers = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKeyUsers, { expiresIn: "1hr" });
};
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

app.get("/admin/me", authenticateJWTAdmin, (req, res) => {
  res.json({
    username: req.user.username,
  });
});
app.post("/admin/signup", (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username === admin.username);
  if (existingAdmin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    const token = generateJWTAdmin(admin);
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", (req, res) => {
  //   logic to log in admin
  const { username, password } = req.body;
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    const token = generateJWTAdmin(admin);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
});

app.post("/admin/courses", authenticateJWTAdmin, (req, res) => {
  // logic to create a course
  const course = req.body;
  if (!course.title) {
    res.status(411).send({ message: "Please fill in correct course title" });
  }
  course.id = Date.now();
  COURSES.push(course);
  res.send({ message: "course created  successfully", courseId: course.id });
});
app.put("/admin/courses/:courseId", authenticateJWTAdmin, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: "course updated successfully" });
  } else {
    res.status(411).send({ message: "Course not found" });
  }
});
app.get("/admin/courses/:courseId", authenticateJWTAdmin, async (req, res) => {
  // logic to find a course
  const courseId = parseInt(req.params.courseId);
  const course = await COURSES.find((c) => c.id === courseId);
  if (course) {
    res.json({ course });
  } 
});
app.get("/admin/courses", authenticateJWTAdmin, (req, res) => {
  // logic to get all courses
  res.json({ courses: COURSES });
});

// User routes
app.post("/users/signup", (req, res) => {
  // logic to sign up user
  const { username, password } = req.body;
  const existingUser = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (existingUser) {
    res.send({ message: "user already exists" });
  } else {
    const user = { username, password };
    USERS.push(user);
    const token = generateJWTUsers(user);
    res.json({ message: "User created successfully", token });
  }
});

app.post("/users/login", (req, res) => {
  // logic to log in user
  const { username, password } = req.headers;
  const user = USERS.find(
    (a) => a.username === username && a.password === password
  );
  if (user) {
    const token = generateJWTUsers(user);
    res.json({ message: "User Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User authentication failed" });
  }
});

app.get("/users/courses", authenticateJWTUsers, (req, res) => {
  // logic to list all courses
  res.send({ courses: COURSES });
});

app.post("/users/courses/:courseId", authenticateJWTUsers, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((a) => a.id === courseId);
  if (course) {
    const user = USERS.find((a) => a.username === req.user.username);
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(courseId);
      res.json({ message: "Course purchased successfully" });
    }
  } else {
    res.status(411).send({ message: "Course not found or unavailable" });
  }
});

app.get("/users/purchasedCourses", authenticateJWTUsers, (req, res) => {
  // logic to view purchased courses
  // const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses.includes(c.id));
  const user = USERS.find((a) => a.username === req.user.username);
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.send({ message: "No courses purchased" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
