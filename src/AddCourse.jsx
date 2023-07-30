import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useState } from "react";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(0);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        variant="outlined"
        style={{
          border: "2px solid black",
          width: "400px",
          height: "350px",
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
          style={{ marginTop: "10px" }}
        />
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          varient="outlined"
          style={{ marginTop: "10px" }}
        />
        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          varient="outlined"
          style={{ marginTop: "10px" }}
        />
        <TextField
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          fullWidth={true}
          label="Price"
          varient="outlined"
          style={{ marginTop: "10px" }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "15px",
          }}
          onClick={async () => {
           
             await axios.post(
                "http://localhost:3000/admin/courses",
                {
                  title: title,
                  description: description,
                  image: image,
                  price: price,
                  published: true,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  }
                });
              alert(`Course added!`);
          }}
        >
        Add Course</Button>
      </Card>
    </div>
  );
}
export default AddCourse;
