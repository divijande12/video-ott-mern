import { Button, Container, Typography } from "@material-ui/core";
import React from "react";
import image from "../../assets/images/30020085.jpg";
import { Link } from "react-router-dom";

const root = {
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  height: "100vh",
};
const container = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh",
};
const error = {
  color: "#FBEFF7",
  fontSize: "12rem",
  textShadow: "5px 10px 8px #9B287B",
};
const content = {
  color: "#FBEFF7",
  fontSize: "2rem",
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "Dancing Script, cursive",
};
const button = {
  color: "white",
  backgroundImage: "linear-gradient(to top right, #291524, purple)",
  borderRadius: "15px",
  marginTop: "40px",
  fontFamily: "Open Sans, sans-serif",
  padding: "10px",
};
export default function NotFound() {
  return (
    <div style={root}>
      <Container style={container}>
        <Typography style={error}>404</Typography>
        <Typography style={content}>LOOKS LIKE YOU ARE</Typography>
        <Typography style={content}>LOST IN SPACE.</Typography>
        <Button
          variant="contained"
          component={Link}
          to={"/logout"}
          style={button}>
          Back To Home
        </Button>
      </Container>
    </div>
  );
}
