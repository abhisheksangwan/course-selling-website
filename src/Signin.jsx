import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

function Login() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
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
          Welcome to Coursera. Login here
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
          id="outlined-basic"
          label="Email"
          onChange={(e) => {
            console.log(e);
            setEmail(e.target.value);
          }}
          variant="outlined"
          style={{ marginBottom: "70px", height: "5px" }}
        />
        <TextField
          fullWidth={true}
          id="outlined-basic"
          label="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
          <Button
            type="submit"
            variant="contained"
            onClick={async() => {
              const response = await axios.post("http://localhost:3000/admin/login", {
                  username: email,
                  password: password,
                
              })
              let data = response.data;
              localStorage.setItem("token", data.token);
               
            }}
            
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Login;
