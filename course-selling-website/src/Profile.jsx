import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Profile() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          border: "1px solid black",
          margin: "10px",
          minHeight: "220px",
          width: "300px",
        }}
      >
        <Typography
          style={{
            overflowWrap: "wrap",
          }}
        >
          <img
            src={
              "https://avatars.githubusercontent.com/u/84694512?s=400&u=f8fb0f1f5e049518ac2824ea61804cac99cc2ae1&v=4"
            }
            alt="profile picture"
            style={{
              width: "300px",
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
          Name
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            overflowWrap: "wrap",
            margin: "10px",
          }}
        >
          Email:
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            overflowWrap: "wrap",
            margin: "10px",
          }}
        >
          Description
        </Typography>
      </Card>
    </div>
  );
}
export default Profile;
