import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Grid, Typography, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import axios from "axios";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/course/" + courseId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, [courseId]);
  if (!course) {
    return <div style={{height:"100vh", justifyContent:"center", flexDirection:"column"}}>Loading....</div>
  }
  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid  container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
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
        marginBottom: -110,
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
            {title}
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
        marginTop: 35,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          border: "1px solid black",
          margin: "10px",
          width: "400px",
          height: "340px",
          minHeight: 200,
          zIndex: 2,
        }}
      >
        <img src={course.image} alt="CourseImage" style={{ width: 400 }} />
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
  const [image, setImage] = useState(course.image);
  const [price, setPrice] = useState(course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <Card
        variant="outlined"
        style={{
          maxWidth: "600",
          border: "2px solid black",
          width: "400px",
          height: "340px",
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
              axios.put(
                "http://localhost:3000/admin/courses/" + course.id,
                {
                  title: title,
                  image: image,
                  price: price,
                  published: true,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              let updatedCourse = {
                id: course.id,
                title: title,
                image: image,
                price: price,
              };
              setCourse(updatedCourse);
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
