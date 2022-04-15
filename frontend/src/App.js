import './App.css';
import Header from './Components/Header/Header';
import ListMeeting from './Page/ListMeeting';
import Register from './Page/Register';
import UploadFile from './Page/UploadFile';
import Userprofile from './Page/UserProfile';

function App() {
  return (
    <div className="App">
      <Header />
      <UploadFile />
    </div>
  );
}

export default App;
