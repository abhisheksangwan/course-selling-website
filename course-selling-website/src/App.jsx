 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Signup";
import Login from "./Signin";
import Appbar from "./Appbar";
import Addcourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";
import Profile from "./Profile";
import {
  RecoilRoot,
} from 'recoil';

function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor:"#eeeeee"
    }}>
      <Router>
        <Appbar />
        <RecoilRoot>
          <Routes>
            <Route path={"/userprofile"} element={<Profile />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/addcourse"} element={<Addcourse />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/course/:courseId"} element={<Course />}></Route>
          </Routes>
        </RecoilRoot>
      </Router>
    </div>
  );
}

export default App;
