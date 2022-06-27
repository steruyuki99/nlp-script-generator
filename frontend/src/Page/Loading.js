// import { defaultListboxReducer } from "@mui/base";
import React from "react";
import {
    Container,
    Typography
  } from "@mui/material";
import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <Container component="section" maxWidth="md" sx={{ marginTop: "12vh" }}>
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 3,
      }}
    >
      <ReactLoading type={"spokes"} color="#305F7A" />
      <Typography variant="h5" component="h5">Loading....</Typography>
    </div></Container>
  );
}

// const Loading = () => (
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     }}
//   >
//     <ReactLoading type={"spokes"} color="#305F7A" />
//   </div>
// );

// export default Loading;
