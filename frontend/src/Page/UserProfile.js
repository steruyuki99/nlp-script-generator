import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Userprofile() {
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userDetailed = auth.currentUser;
    console.log(userDetailed);
    if (userDetailed) {
      console.log(userDetailed);
      console.log(userDetailed.displayName);
      setUser(userDetailed);
      setUsername(user.displayName);
    } else{
      navigate("../");
    }
    console.log(username);
    console.log(user.email);
  }, []);

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(user,{
      displayName: username,
    }).then(()=>{
      navigate("../userprofile");
    })
  };

  const logout = async () => {
    await signOut(auth);
    navigate("../");
  };

  return (
    <Container component="main" maxWidth="sm" sx={{marginTop: "13vh"}}>
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
          Userprofile
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="username"
                defaultValue={user.displayName}
                value={username}
                onChange={usernameChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={user.email}
                value={email}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={user.password}
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            // maxWidth="xs"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
          <Button
            fullWidth
            // maxWidth="xs"
            onClick={logout}
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
