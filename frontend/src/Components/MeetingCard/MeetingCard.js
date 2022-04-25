import React from "react";
import {Card, CardActions, CardContent, Button, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MeetingCard = (props) => {
  let navigate = useNavigate(); 
  const routeChange = () =>{
    let path = `/list/${props.minuteId}`;
    navigate(path);
  }
  
  return (
    <Card sx={{ minWidth: 275, m: 1 }} key={props.key}>
      <CardContent>
        <Typography variant="h5" component="div" align="left">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
          {props.date}
        </Typography>
        <Typography variant="body2" align="left">
          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          placerat mattis tortor, eu condimentum dolor fringilla non. Sed vitae
          neque erat. Donec purus lectus, maximus vel rhoncus sit amet, rutrum
          eu ligula.  */}
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={routeChange}>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default MeetingCard;
