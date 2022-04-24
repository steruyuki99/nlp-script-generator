import React from "react";
import { Grid, Typography, Container, Button } from "@mui/material";
import MeetingCard from "../Components/MeetingCard/MeetingCard";

const ListMeeting = () => {
  return (
    <Container component="section" maxWidth="lg">
      <Grid container>
        <Grid item xs>
          <Typography variant="h4" component="h5" sx={{ m: 3, textAlign: 'left' }}>
            Meeting List
          </Typography>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create New Minutes
          </Button>
        </Grid>
      </Grid>
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
