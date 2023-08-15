import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const response = await axios.post("http://localhost:3000/admin/signup", {
      username: email,
      password: password,
    });
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      window.location = "/";
    } else {
      console.log(response.data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div>
        <Typography
          variant={"h6"}
          style={{
            marginTop: "100px",
          }}
        >
          Welcome to Coursera. Sign up here
        </Typography>
      </div>
      <Card
        variant="outlined"
        style={{
          border: "2px solid black",
          width: "340px",
          height: "300px",
          padding: "15px",
          backgroundColor: "White",
        }}
      >
        <TextField
          fullWidth={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          variant="outlined"
          style={{ marginBottom: "70px", height: "5px" }}
        />
        <TextField
          fullWidth={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          type="password"
          variant="outlined"
          style={{ marginBottom: "70px", height: "5px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "15px",
          }}
        >
          <Button size={"large"} variant="contained" onClick={handleSignup}>
            Signup
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              window.location = "/login";
            }}
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
