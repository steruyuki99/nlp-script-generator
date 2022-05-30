import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
//firebase
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    function createNewUser() {
      return new Promise((resolve) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            resolve(user);
          })
          .catch((err) => {
            console.log("Error on create user ", err);
          });
      });
    }

    function updateDisplayname(user) {
      return new Promise((resolve) => {
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log("Updated username");
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    function updateMinutesList(user) {
      return new Promise((resolve) => {
        const ref = doc(db, "minutesList", user.uid);
        const sendTime = new Date();
        const timed = sendTime.getHours() + ":" + sendTime.getMinutes();
        const day =
          sendTime.getDate() +
          "/" +
          (sendTime.getMonth() + 1) +
          "/" +
          sendTime.getFullYear();
        const time = day + " " + timed;

        setDoc(ref, {
          minute: [
            {
              date: time,
              description: "description for this project",
              minuteID: "i0FTt70pZBvBzNB2qNh9",
              title: "sample",
            },
          ],
        })
          .then(() => {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    createNewUser()
      .then((user) => {
        return updateDisplayname(user);
      })
      .then((user) => {
        console.log("Next navigate");
        console.log(user);
        return updateMinutesList(user);
      })
      .then((user) => {
        navigate(`../list`);
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "10vh" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={usernameChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={passwordChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2"  onClick={
               ()=>{
                navigate(`/`);
               }
              }>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
