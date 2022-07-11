// import { defaultListboxReducer } from "@mui/base";
import React from "react";
import { Typography } from "@mui/material";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginTop: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <ReactLoading type={"bars"} color="#305F7A" />
          <Typography variant="h5" component="h5" sx={{  mt:2}}>
            Loading...
          </Typography>
        </div>
      </div>
  );
}
