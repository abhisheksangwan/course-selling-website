import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    function callback2(data) {
      setCourses(data.courses);
    }
    function callback1(res) {
      res.json().then(callback2);
    }
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course key={course.id} course={course} />; // Add "key" prop
      })}
    </div>
  );
}

export function Course(props) {
  // Add prop validation using PropTypes
  Course.propTypes = {
    course: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {props.course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {props.course.description}
      </Typography>
      <img
        src={props.course.image}
        style={{ width: 300 }}
        alt={props.course.title}
      />
    </Card>
  );
}

export default Courses;
