import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import RecentHistory from "../Components/Dashboard/RecentHistory";

const Dashboard = () => {

  
  return (
    <Container sx={{ marginTop: "12vh" }}>
 
      <Typography component="h2" variant="h4" sx={{ m:2}}>
        Welcome user A!
      </Typography>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <RecentHistory />
      </Paper>
    </Container>
  );
};

export default Dashboard;
