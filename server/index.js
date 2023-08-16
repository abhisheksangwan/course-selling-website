import express from"express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import userRouter  from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.json({ msg: "SYSTUMM " }));

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(
  "mongodb+srv://abhisheksangwan:y9Vu3xPCSobeKS21@course-website.mi5hbsi.mongodb.net/course"
);

app.listen(3000, () => console.log("Server running on port 3000"));
