import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      return res.json();
    })
      .then((data) => {
        setCourses(data.courses);
    })
  }, []);

  if (!courses.length) {
    return <div>loading...</div>
  }
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", background:"#EEEEEE"}}
    >
      {courses.map((course) => {
        return <Course key={course.id} course={course} />; // Add "key" prop
      })}
    </div>
  );
}

export function Course({course}) {
  // Add prop validation using PropTypes
  const navigate = useNavigate();

  Course.propTypes = {
    course: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price:PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        Height: 200,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.image} style={{ width: 300 }} alt={course.title} />
      <Typography textAlign={"center"} variant="subtitle1">
        Price: {course.price}
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + course.id);
          }}
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}

export default Courses;
