import React from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";


const ListMeeting = () => {
  //   const classes = useStyles();

  return (
    <Container
      component="section"
      maxWidth="lg"
      // className={classes.root}
      //   sx={{ height: "90vh" }}
    >
    <Typography  variant="h3" component="h2" sx={{m:3}}>
        Meeting List
    </Typography>
      <Grid container alignItems="stretch">
        <Grid
          item
          xs={12}
          md={4}
          //   sx={{ height: "100vh", backgroundColor: "blue" }}
        >
          <Card sx={{ minWidth: 275, m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div" align="left">
                be nev o lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
                adjective
              </Typography>
              <Typography variant="body2" align="left">
                well meaning and kindly.
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>{" "}
        <Grid
          item
          xs={12}
          md={4}
          //   sx={{ height: "100vh", backgroundColor: "blue" }}
        >
          <Card sx={{ minWidth: 275, m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div" align="left">
                be nev o lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
                adjective
              </Typography>
              <Typography variant="body2" align="left">
                well meaning and kindly.
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>{" "}
        <Grid
          item
          xs={12}
          md={4}
          //   sx={{ height: "100vh", backgroundColor: "blue" }}
        >
          <Card sx={{ minWidth: 275, m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div" align="left">
                be nev o lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
                adjective
              </Typography>
              <Typography variant="body2" align="left">
                well meaning and kindly.
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>{" "}
        <Grid
          item
          xs={12}
          md={4}
          //   sx={{ height: "100vh", backgroundColor: "blue" }}
        >
          <Card sx={{ minWidth: 275, m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div" align="left">
                be nev o lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" align="left">
                adjective
              </Typography>
              <Typography variant="body2" align="left">
                well meaning and kindly.
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListMeeting;
