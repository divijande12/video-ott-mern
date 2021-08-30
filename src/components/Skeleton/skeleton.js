import React from "react";
import { Skeleton } from "@material-ui/lab";
import { Grid } from "@material-ui/core";

export default function Loader() {
  return (
    <div className="row" style={{ display: "flex", flexDirection: "row" }}>
      <Grid sm={12} md={6} lg={3}>
        <Skeleton
          variant="rect"
          style={{
            backgroundColor: "rgba(230, 219, 228,0.1)",
            borderRadius: "5px",
            margin: "0px 20px 0px 5px",
          }}
          width={285}
          height={250}
        />
      </Grid>
      <Grid sm={12} md={6} lg={3}>
        <Skeleton
          variant="rect"
          style={{
            backgroundColor: "rgba(230, 219, 228,0.1)",
            borderRadius: "5px",
            margin: "0px 20px 0px 5px",
          }}
          width={285}
          height={250}
        />
      </Grid>
      <Grid sm={12} md={6} lg={3}>
        <Skeleton
          variant="rect"
          style={{
            backgroundColor: "rgba(230, 219, 228,0.1)",
            borderRadius: "5px",
            margin: "0px 20px 0px 5px",
          }}
          width={285}
          height={250}
        />
      </Grid>
      <Grid sm={12} md={6} lg={3}>
        <Skeleton
          variant="rect"
          style={{
            backgroundColor: "rgba(230, 219, 228,0.1)",
            borderRadius: "5px",
            margin: "0px 20px 0px 5px",
          }}
          width={285}
          height={250}
        />
      </Grid>
    </div>
  );
}
