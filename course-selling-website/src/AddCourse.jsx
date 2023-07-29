import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useState } from "react";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          border: "2px solid black",
          width: "340px",
          height: "300px",
          padding: "15px",
          marginTop: "40px",
          backgroundColor: "White",
        }}
      >
        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image Link"
          varient="outlined"
          style={{ marginTop: "20px" }}
        />
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          varient="outlined"
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          varient="outlined"
          style={{ marginTop: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "15px",
          }}
          onClick={() => {
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
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
                alert("Course added !");
              });
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}
export default AddCourse;
