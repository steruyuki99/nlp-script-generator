import React, { useState } from "react";
import { Button, TextField, Box, Grid, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();

  const [emailTouched, setEmailTouched] = useState(false);

  const emailIsValid = email.includes("@");

  let formIsValid = false;

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailTouched(true);
  };

  if (emailIsValid) {
    formIsValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submittt");
    function rPassword() {
      return new Promise((resolve) => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            alert("Reset Email sent! Please check your Email");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            alert(errorCode);
          });
      });
    }

    rPassword().then((user) => {
      console.log(user);
      setEmail("");
      setEmailTouched("");
      navigate("");
    });
  };
  return (
    <Grid component="main" sx={{ height: "90vh", marginTop: "10vh" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card sx={{ minWidth: 400, p: 2, mt: 3 }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <Typography component="h1" variant="h5">
                Enter Your Email
              </Typography>
              <Grid item spacing={2} sx={{ mt: 1 }}>
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
              </Grid>{" "}
              <Button
                type="submit"
                xs={12}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formIsValid}
              >
                Send Reset Password Email
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
