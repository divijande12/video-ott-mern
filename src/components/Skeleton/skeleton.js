import React from "react";
import { CircularProgress } from "@material-ui/core";

export default function Loader() {
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to top right, #291524, black)",
        backgroundSize: "cover",
        height: "100vh",
        boxSizing: "border-box",
        display: "block",
      }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
}
