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

  // const [usernameTouched, setUsernameTouched] = useState(false);
  // const [emailTouched, setEmailTouched] = useState(false);
  // const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordIsValid, setPasswordValid] = useState(false);

  const enteredNameIsValid = username.trim() !== "";
  // const usernameInputIsValid = !enteredNameIsValid && usernameTouched;

  const emailIsValid = email.includes("@");
  // const emailInputIsValid = !emailIsValid && emailTouched;

  // const passwordIsValid = password.trim() !== "";
  // const passwordInputIsValid = !passwordIsValid && passwordTouched;

  let formIsValid = false;

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  // const usernameBlurHandler = (event) => {
  //   setUsernameTouched(true);
  // };

  // const emailBlurHandler = (event) => {
  //   setEmailTouched(true);
  // };

  // const passwordBlurHandler = (event) => {
  //   setPasswordTouched(true);
  // };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);

    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    // const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    // const minLengthRegExp   = /.{8,}/;

    const passwordLength = password.length;
    const uppercasePassword = uppercaseRegExp.test(password);
    const lowercasePassword = lowercaseRegExp.test(password);
    const digitsPassword = digitsRegExp.test(password);

    console.log(passwordLength);
    console.log(uppercasePassword);
    console.log(lowercasePassword);
    console.log(passwordIsValid);
    if (
      passwordLength > 0 &&
      uppercasePassword &&
      lowercasePassword &&
      digitsPassword
    ) {
      setPasswordValid(true);
    }
  };

  if (enteredNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

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
            alert(err.message);
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
            alert(err.message);
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
              filepath:
                "C:Users\teruyDocumentsProgramming\fyp\nlp-minutes-meeting\backend/files/Demo_2speaker.mp3",
              minutesText:
                "hello my name is Andrea hi how are you doing I am O. Kay thank you where do you live I live in Alabama nice I live in Colorado how long do you live there I lived there for eleven years do you live alone or with your family I live with my wife really nice I live with sisters how many sisters do you have I have three sisters how long have you been married I have been married for five years it was nice talking to you but I have to go okay bye bye hi William hi Emelia how are you I am fine how are you I am fine where are you from I am from Hawaii while I love Hawaii I always wanted to visit Hawaii eight I would be very happy if you come to Hawaii thank you so much William where are you from I am from Switzerland I heard it is a very nice place thank you it was nice to meet you it was nice to meet you too bye good bye hi Michael hi Emily how are you I am fine where are you working I am working in the factory Michael do you like working in the factory no I do not like working in the factory but I need money yes I understand where do you want to work I want to work in an office I see I hope you get a job in an office thank you Emelie where do you work I work in the hospital what do you do in the hospital I am a doctor I love my job that's great I am happy you have a good job thank you Michael I have to go okay bye Michael by Emily hi how are you I am fine how are you I am fine are you a student yes I study computer science at the university really I study accounting great it is really nice to meet you what year are you in I am in my last year of technology school wow great you must be so happy that you will graduate soon yes I am so happy what year of accounting school are you in I am in my third year of accounting school great do you like accounting school yes I love accounting school I have to go maybe we can meet for coffee yes that sounds great I will call see you soon great by what's up nice to meet you how's it going hi John how are you doing have you got any plans for the weekend how was your weekend so what do you do for a living it's a pleasure to meet you ",
              title: "sample",
              dialog: [
                {
                  text: "hello my name is Andrea ",
                  speaker: 0,
                },
                {
                  text: "hi how are you doing ",
                  speaker: 2,
                },
                {
                  text: "I am O. Kay thank you ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "where do you live ",
                },
                {
                  text: "I live in Alabama ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "nice I live in Colorado ",
                },
                {
                  speaker: 0,
                  text: "how long do you live there ",
                },
                {
                  text: "I lived there for eleven years ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "do you live alone or with your family ",
                },
                {
                  text: "I live with my wife ",
                  speaker: 2,
                },
                {
                  text: "really nice I live with sisters ",
                  speaker: 0,
                },
                {
                  text: "how many sisters do you have ",
                  speaker: 2,
                },
                {
                  text: "I have three sisters how long have you been married ",
                  speaker: 0,
                },
                {
                  text: "I have been married for five years ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "it was nice talking to you but I have to go ",
                },
                {
                  speaker: 2,
                  text: "okay bye bye ",
                },
                {
                  text: "hi William ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "hi Emelia ",
                },
                {
                  speaker: 0,
                  text: "how are you ",
                },
                {
                  text: "I am fine how are you ",
                  speaker: 2,
                },
                {
                  text: "I am fine ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "where are you from ",
                },
                {
                  text: "I am from Hawaii ",
                  speaker: 0,
                },
                {
                  text: "while I love Hawaii I always wanted to visit Hawaii ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "eight I would be very happy if you come to Hawaii ",
                },
                {
                  speaker: 2,
                  text: "thank you so much ",
                },
                {
                  text: "William where are you from ",
                  speaker: 0,
                },
                {
                  text: "I am from Switzerland ",
                  speaker: 2,
                },
                {
                  text: "I heard it is a very nice place ",
                  speaker: 0,
                },
                {
                  text: "thank you ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "it was nice to meet you ",
                },
                {
                  text: "it was nice to meet you too ",
                  speaker: 2,
                },
                {
                  text: "bye ",
                  speaker: 0,
                },
                {
                  text: "good bye ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "hi Michael ",
                },
                {
                  speaker: 2,
                  text: "hi Emily ",
                },
                {
                  speaker: 0,
                  text: "how are you ",
                },
                {
                  speaker: 2,
                  text: "I am fine ",
                },
                {
                  speaker: 0,
                  text: "where are you working ",
                },
                {
                  text: "I am working in the factory ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "Michael do you like working in the factory ",
                },
                {
                  speaker: 2,
                  text:
                    "no I do not like working in the factory but I need money ",
                },
                {
                  text: "yes I understand where do you want to work ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "I want to work in an office ",
                },
                {
                  text: "I see I hope you get a job in an office ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "thank you Emelie where do you work ",
                },
                {
                  speaker: 0,
                  text: "I work in the hospital ",
                },
                {
                  text: "what do you do in the hospital ",
                  speaker: 2,
                },
                {
                  text: "I am a doctor I love my job ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "that's great I am happy you have a good job ",
                },
                {
                  speaker: 0,
                  text: "thank you Michael ",
                },
                {
                  speaker: 2,
                  text: "I have to go ",
                },
                {
                  text: "okay bye Michael ",
                  speaker: 0,
                },
                {
                  text: "by Emily hi how are you ",
                  speaker: 2,
                },
                {
                  text: "I am fine how are you ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "I am fine ",
                },
                {
                  speaker: 0,
                  text: "are you a student ",
                },
                {
                  text: "yes I study computer science at the university ",
                  speaker: 2,
                },
                {
                  speaker: 0,
                  text: "really I study accounting ",
                },
                {
                  speaker: 2,
                  text: "great it is really nice to meet you ",
                },
                {
                  speaker: 0,
                  text: "what year are you in ",
                },
                {
                  text: "I am in my last year of technology school ",
                  speaker: 2,
                },
                {
                  text:
                    "wow great you must be so happy that you will graduate soon ",
                  speaker: 0,
                },
                {
                  text:
                    "yes I am so happy what year of accounting school are you in ",
                  speaker: 2,
                },
                {
                  text: "I am in my third year of accounting school ",
                  speaker: 0,
                },
                {
                  speaker: 2,
                  text: "great do you like accounting school ",
                },
                {
                  text: "yes I love accounting school ",
                  speaker: 0,
                },
                {
                  text: "I have to go maybe we can meet for coffee ",
                  speaker: 2,
                },
                {
                  text: "yes that sounds great ",
                  speaker: 0,
                },
                {
                  text: "I will call see you soon ",
                  speaker: 2,
                },
                {
                  text:
                    "great by what's up nice to meet you how's it going hi John how are you doing have you got any plans for the weekend how was your weekend so what do you do for a living ",
                  speaker: 0,
                },
                {
                  speaker: 0,
                  text: "it's a pleasure to meet you ",
                },
              ],
            },
          ],
        })
          .then(() => {
            resolve(user);
          })
          .catch((err) => {
            console.log(err);
            alert(err);
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
        setUsername("");
        setEmail("");
        setPassword("");
        // setUsernameTouched(false);
        // setEmailTouched(false);
        // setPasswordTouched(false);
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
                // onBlur={usernameBlurHandler}
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
                // onBlur={emailBlurHandler}
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
                // onBlur={passwordBlurHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formIsValid}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
