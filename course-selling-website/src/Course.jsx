import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import {
  atom,
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
} from "recoil";

// Define coursesState atom
const coursesState = atom({
  key: "coursesState",
  default: "",
});

function Course() {
  let { courseId } = useParams();
  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourses(data.courses);
      });
  }, [setCourses]); 
 
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center", height:"100vh"}}>
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
}



function CourseCard({ courseId }) {
  const courses = useRecoilValue(coursesState);
  let course = null;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === parseInt(courseId)) {
      course = courses[i];
      break;
    }
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card
        style={{
          border: "1px solid black",
          margin: "10px",
          width: "340px",
          height: "320px",
        }}
      >
        <Typography
          style={{
            overflowWrap: "wrap",
          }}
        >
          <img
            src={course.image}
            alt="course"
            style={{
              width: "340px",
            }}
          />
        </Typography>
        <Typography
          variant="h6"
          style={{
            overflowWrap: "wrap",
          }}
          textAlign={"center"}
        >
          {course.title}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            overflowWrap: "wrap",
            margin: "10px",
          }}
        >
          {course.description}
        </Typography>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  courseId: PropTypes.string.isRequired,
};


function UpdateCard({ courseId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [courses, setCourses] = useRecoilState(coursesState);

  return (
    <div>
      <Card
        variant="outlined"
        style={{
          border: "2px solid black",
          width: "340px",
          height: "320px",
          padding: "15px",
          margin: "10px",
          backgroundColor: "White",
        }}
      >
        <Typography variant="h6">Update Course Details</Typography>
        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image Link"
          variant="outlined"
          style={{ marginBlock: "6px" }}
        />
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
          style={{ marginBlock: "6px" }}
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
          style={{ marginBlock: "6px" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "15px",
          }}
          onClick={() => {
            fetch("http://localhost:3000/admin/courses/" + courseId, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                image: image,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((res) => {
                return res.json();
              })
              .then(() => {
                let updatedCourses = [];
                for (let i = 0; i < courses.length; i++) {
                  if (courses[i].id === parseInt(courseId)) {
                    updatedCourses.push({
                      id: courseId,
                      title: title,
                      description: description,
                      image: image,
                    });
                  } else {
                    updatedCourses.push(courses[i]);
                  }
                }
                setCourses(updatedCourses);
              });
          }}
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}

UpdateCard.propTypes = {
  courseId: PropTypes.string.isRequired,
};
export default Course;
