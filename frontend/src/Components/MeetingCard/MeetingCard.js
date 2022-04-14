import React from "react";
import {Card, CardActions, CardContent, Button, Typography} from "@mui/material";

const MeetingCard = () => {
  return (
    <Card sx={{ minWidth: 275, m: 1 }}>
      <CardContent>
        <Typography variant="h5" component="div" align="left">
          Sample Meeting
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
          15 April 2022
        </Typography>
        <Typography variant="body2" align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          placerat mattis tortor, eu condimentum dolor fringilla non. Sed vitae
          neque erat. Donec purus lectus, maximus vel rhoncus sit amet, rutrum
          eu ligula. 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default MeetingCard;
