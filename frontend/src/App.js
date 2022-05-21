import "./App.css";
//router
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import ListMeeting from "./Page/ListMeeting";
import Register from "./Page/Register";
import UploadFile from "./Page/UploadFile";
import Userprofile from "./Page/UserProfile";
import SignIn from "./Page/SignIn";
import Result from "./Page/Result";
import Dashboard from "./Page/Dashboard";

function App() {
  return (
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
          <Route path="dashboard" element={<Dashboard/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
