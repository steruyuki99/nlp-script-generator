import React from "react";
import {Grid, Typography, Container } from "@mui/material";
import MeetingCard from "../Components/MeetingCard/MeetingCard";

const ListMeeting = () => {

  return (
    <Container
      component="section"
      maxWidth="lg"
    >
      <Typography variant="h3" component="h2" sx={{ m: 3 }}>
        Meeting List
      </Typography>
      <Grid container alignItems="stretch">
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>{" "}
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListMeeting;
