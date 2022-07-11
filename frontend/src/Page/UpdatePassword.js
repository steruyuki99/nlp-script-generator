import React, { useState } from "react";
import { Button, TextField, Box, Grid, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  // const [passwordTouched, setPasswordTouched] = useState(false);

  const passwordIsValid = password.trim !== "";

  let formIsValid = false;

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  // const passwordBlurHandler = () => {
  //   setPasswordTouched(true);
  // };

  if (passwordIsValid) {
    formIsValid = true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submittt");
    function uPassword() {
      return new Promise((resolve) => {
        updatePassword(auth.currentUser, password)
          .then(() => {
            alert("Password Update!");
            resolve();
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

    uPassword().then((user) => {
      console.log(user);
      setPassword("");
      // setPasswordTouched("");
      navigate("../userprofile");
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
                Enter Your New Password
              </Typography>
              <Grid item spacing={2} sx={{ mt: 1 }}>
                <TextField
                  required
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  onChange={passwordChangeHandler}
                  // onBlur={passwordBlurHandler}
                />
              </Grid>{" "}
              <Button
                type="submit"
                xs={12}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!formIsValid}
              >
                Update Password
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
