import "./App.css";
//router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import ListMeeting from "./Page/ListMeeting";
import Register from "./Page/Register";
import UploadFile from "./Page/UploadFile";
import Userprofile from "./Page/UserProfile";
import LandingPage from "./Page/LandingPage";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="list" element={<ListMeeting />} />
            <Route path="register" element={<Register />} />
            <Route path="upload" element={<UploadFile />} />
            <Route path="userprofile" element={<Userprofile />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
