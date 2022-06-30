import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from "@mui/styles";
import CoverImage from "../image/landingCover.jpg";
//firebase
import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EAE7DC",
    color: "#8ED8A",
    textAlign: "left",
  },
  title: {
    color: "#E85A4F",
  },
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const classes = useStyles();

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const emailIsValid = email.includes("@");
  const emailInputIsValid = !emailIsValid && emailTouched;

  const passwordIsValid = password.trim() !== "";
  const passwordInputIsValid = !passwordIsValid && passwordTouched;

  let formIsValid = false;
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const emailBlurHandler = (event) => {
    setEmailTouched(true);
  };

  const passwordBlurHandler = (event) => {
    setPasswordTouched(true);
  };

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    function loginHandler() {
      return new Promise((resolve) => {
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            signInWithEmailAndPassword(auth, email, password)
              .then((userCrendential) => {
                const user = userCrendential.user;
                resolve(user);
              })
              .catch((err) => {
                alert(err.message);
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      });
    }

    loginHandler().then((user) => {
      console.log(user);
      navigate("../list");
    });
  };

  return (
    <Grid container component="main" sx={{ height: "90vh", marginTop: "10vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${CoverImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        className={classes.root}
        elevation={6}
        square
      >
        <Paper
          sx={{
            my: 8,
            mx: 4,
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          backgroundColor="white"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" className={classes.title}>
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formIsValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
