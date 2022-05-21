import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Container,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MeetingCard from "../Components/MeetingCard/MeetingCard";
//firebase
import { db, auth } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ListMeeting = () => {
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    function getUID() {
      return new Promise((resolve) => {
        const user = auth.currentUser;
        if (user) {
          resolve(user.uid);
        } else {
          navigate("../");
        }
      });
    }

    function getList(uid) {
      return new Promise((resolve) => {
        const docRef = doc(db, "minutesList", uid);
        getDoc(docRef)
          .then((docSnap) => {
            console.log("Document Data: ", docSnap.data());
            resolve(docSnap.data().minute);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    getUID()
      .then((uid) => {
        return getList(uid);
      })
      .then((List) => {
        console.log(List);
        setList(List);
        console.log(list);
      });
  }, []);

  const routeChange = () => {
    let path = `/upload`;
    navigate(path);
  };

  return (
    <Container component="section" maxWidth="lg" sx={{ marginTop: "10vh", p: 1 }}>
      <Card sx={{ minWidth: 275, p: 2, m: 1 }}>
        <Grid container>
          <Grid item xs>
            <Typography
              variant="h4"
              component="h5"
              sx={{ m: 3, textAlign: "left" }}
            >
              Meeting List
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={routeChange}
            >
              Create New Minutes
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
            <TextField
            
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
        </Grid>
        <Grid container alignItems="stretch">
          {list.map((d, idx) => {
            return (
              <Grid item xs={12} md={4}>
                <MeetingCard
                  key={idx}
                  date={d.date}
                  title={d.title}
                  description={d.description}
                  minuteId={d.minuteID}
                />
              </Grid>
            );
          })}
          {/* <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <MeetingCard />
        </Grid> */}
        </Grid>
      </Card>
    </Container>
  );
};

export default ListMeeting;
