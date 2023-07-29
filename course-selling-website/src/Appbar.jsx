import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.username) {
          setUserEmail(data.username);
        }
      });
  }, []);

  if (userEmail) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            backgroundColor: "grey",
          }}
        >
          <div>
            <Typography
              variant={"h6"}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                window.location = "/login";
              }}
            >
              Coursera
            </Typography>
          </div>
          <div
            style={{
              marginRight: "10px",
              display: "flex",
            }}
          >
            <Button
              variant={"contained"}
              onClick={() => {
                window.location = "/userprofile";
              }}
              style={{ marginRight: "15px" }}
            >
              {userEmail}
            </Button>
            <Button
              variant={"contained"}
              onClick={() => {
                window.location = "/courses";
              }}
              style={{ marginRight: "15px" }}
            >
              Courses
            </Button>
            <Button
              variant={"contained"}
              onClick={() => {
                window.location = "/addcourse";
              }}
              style={{ marginRight: "15px" }}
            >
              Add Courses
            </Button>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/signup";
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "grey",
      }}
    >
      <div>
        <Typography variant={"h6"} style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>
      </div>
      <div
        style={{
          marginRight: "10px",
          display: "flex",
        }}
      >
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/signup");
          }}
          style={{ marginRight: "15px" }}
        >
          Sign up
        </Button>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
