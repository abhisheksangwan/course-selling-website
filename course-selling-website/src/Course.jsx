import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

import axios from "axios";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/courses", {
        Authorization: "Bearer " + localStorage.getItem("token"),
      })
      .then((res) => {
        setCourse(res.data.courses);
      });
  }, []);

  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={8} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
}
function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          display: "flex",
          height: 250,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h5"
            textAlign={"center"}
          >
            Title:{title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
// Add PropTypes validation
GrayTopper.propTypes = {
  title: PropTypes.string.isRequired, // Assuming 'title' should be a required string prop
};

function CourseCard({ course }) {
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          border: "1px solid black",
          margin: "10px",
          width: "350px",
          height: "320px",
          minHeight: 200,
          zIndex: 2,
        }}
      >
        <img src={course.image} alt="CourseImage" style={{ width: 350 }} />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="subtitle2" style={{ color: "gray" }}>
            Price
          </Typography>
          <Typography variant="subtitle1">
            <b>Rs{course.price}</b>
          </Typography>
        </div>
      </Card>
    </div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.string.isRequired,
};

function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.image);
  const [price, setPrice] = useState(course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          maxWidth: "600",
          border: "2px solid black",
          width: "400px",
          height: "390px",
          padding: "15px",
          marginTop: "40px",
          backgroundColor: "White",
        }}
      >
        <div>
          <Typography variant="h6" style={{ marginBottom: 10 }}>
            Update Course Details
          </Typography>

          <TextField
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            fullWidth={true}
            label="Title"
            variant="outlined"
            style={{ marginBlock: "6px" }}
          />
          <TextField
            onChange={(e) => {
              setImage(e.target.value);
            }}
            value={image}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
            style={{ marginBlock: "6px" }}
          />
          <TextField
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            value={description}
            label="Description"
            variant="outlined"
            style={{ marginBlock: "6px" }}
          />
          <TextField
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            value={price}
            label="Price"
            variant="outlined"
            style={{ marginBlock: "6px" }}
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              marginTop: "15px",
            }}
            onClick={async () => {
              axios.put("http://localhost:3000/admin/courses/" + course.id, {
                title: title,
                description: description,
                image: image,
                price: price,
                published: true,
              },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  }
                });
              let updatedCourse = {
                id: course.id,
                title: title,
                description: description,
                image: image,
                price: price,
              }
              setCourse(updatedCourse);
              alert("course updated successfully!"); 
            }}
          >
            Update Course
          </Button>
        </div>
      </Card>
    </div>
  );
}

UpdateCard.propTypes = {
  course: PropTypes.string.isRequired,
  setCourse: PropTypes.string.isRequired,
};
export default Course;
// Define coursesState atom
