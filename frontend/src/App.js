import "./App.css";
//router
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Components/Header/Header";
import ListMeeting from "./Page/ListMeeting";
import Register from "./Page/Register";
import UploadFile from "./Page/UploadFile";
import Userprofile from "./Page/UserProfile";
import SignIn from "./Page/SignIn";
import Result from "./Page/Result";
// import Dashboard from "./Page/Dashboard";
import ResetPassword from "./Page/ResetPassword";
import UpdateEmail from "./Page/UpdateEmail";
import UpdatePassword from "./Page/UpdatePassword";

const theme = createTheme({
  typography: {
    fontFamily: ["Andada Pro"].join(","),
  },
  palette: {
    primary: {
      main: '#305F7A',
    },
    secondary: {
      main: "#E98074",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="list/:minutesID" element={<Result />} />
            <Route path="list" element={<ListMeeting />} />
            <Route path="register" element={<Register />} />
            <Route path="upload" element={<UploadFile />} />
            <Route path="userprofile" element={<Userprofile />} />
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="reset" element={<ResetPassword />} />
            <Route path="updateEmail" element={<UpdateEmail />} />
            <Route path="updatePassword" element={<UpdatePassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
