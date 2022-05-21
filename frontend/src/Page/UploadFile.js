import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import axios from "axios";
//import firebase
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UploadFile = () => {
  const [userID, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [unableAttend, setUnableAttend] = useState(" ");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserID(user.uid);
    } else {
      navigate("../");
    }
  }, []);

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const locationChangeHandler = (event) => {
    setLocation(event.target.value);
  };
  const participantsChangeHandler = (event) => {
    setParticipants(event.target.value);
  };
  const unableAttendChangeHandler = (event) => {
    setUnableAttend(event.target.value);
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button");
    const sendTime = new Date();
    const timed = sendTime.getHours() + ":" + sendTime.getMinutes();
    const day =
      sendTime.getDate() +
      "/" +
      (sendTime.getMonth() + 1) +
      "/" +
      sendTime.getFullYear();
    const time = day + " " + timed;
    function GenerateText() {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios
          .post("http://localhost:8000/upload", formData)
          .then((res) => {
            console.log(res.data.results);
            const minutesText =
              res.data.results.result.results[0].alternatives[0].transcript;
            console.log(res.data.result);
            const dialog = generateDialog(res.data.results);
            console.log(dialog);
            resolve(dialog);
          })
          .catch((err) => {
            console.log("error on upload file: ", err);
          });
      });
    }

    function UploadText(dialog) {
      return new Promise((resolve) => {
        console.log(dialog);
        addDoc(collection(db, "minutes"), {
          uid: userID,
          date: time,
          description: description,
          minutesText: dialog.text,
          dialog: dialog.dialog,
          location: location,
          participants: participants,
          unableAttend: unableAttend,
          title: title,
        })
          .then((response) => {
            console.log("Document ID", response.id);
            resolve(response.id);
          })
          .catch((err) => {
            console.log("Firebase Error: ", err);
          });
      });
    }

    function updateUserList(docID) {
      return new Promise((resolve) => {
        const docRef = doc(db, "minutesList", userID);
        updateDoc(docRef, {
          minute: arrayUnion({
            date: time,
            description: description,
            title: title,
            minuteID: docID,
          }),
        })
          .then(() => {
            resolve(docID);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    function generateDialog(result) {
      var i = 0; //for speaker_labels array
      var j = 0; //for results
      var k = 0; //for results coounting
      var fullDialog = [];
      var str = "";
      var final = false;
      var crrSp = result.result.speaker_labels[i].speaker;
      var fulltext = result.result.results[j].alternatives[0].transcript;
      console.log(result);
      while (!final) {
        final = result.result.speaker_labels[i].final;
        if (k >= result.result.results[j].alternatives[0].timestamps.length) {
          console.log("K: " + k + " j: " + j);
          k = 0;
          j++;
          fulltext += result.result.results[j].alternatives[0].transcript;
        }
        // setCrrSpeaker(result.result.speaker_labels[i].speaker);
        console.log(crrSp);
        console.log(result.result.speaker_labels[i].speaker);
        if (crrSp != result.result.speaker_labels[i].speaker) {
          const dialog = { speaker: result.result.speaker_labels[i].speaker, text: str };
          fullDialog.push(dialog);
          console.log(fullDialog);
          console.log(fulltext);
          str="";
          var crrSp = result.result.speaker_labels[i].speaker;
        }
        if (
          result.result.results[j].alternatives[0].timestamps[k][1] ==
          result.result.speaker_labels[i].from
        ) {
          //to add data in to the specific array
          str +=
            result.result.results[j].alternatives[0].timestamps[k][0] + " ";
        } else {
          console.log("A message will not shown " + result.result.results[j].alternatives[0].timestamps[k][0]);
        }
        k++;
        i++;
      }
      const res = { dialog: fullDialog, text: fulltext };
      return res;
    }
    GenerateText()
      .then((dialog) => {
        console.log(dialog);
        return UploadText(dialog);
      })
      .then((docID) => {
        console.log(docID);
        return updateUserList(docID);
      })
      .then((docID) => {
        console.log(docID);
        navigate(`/list/${docID}`);
      });
  };

  return (
    <Container component="section" maxWidth="md" sx={{ marginTop: "12vh" }}>
      <Typography variant="h3" component="h2" sx={{ m: 3 }}>
        Upload File
      </Typography>{" "}
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          sx={{ width: "80%" }}
          id="Title"
          label="Title"
          name="Title"
          autoFocus
          onChange={titleChangeHandler}
        />{" "}
        <TextField
          margin="normal"
          required
          sx={{ width: "80%" }}
          id="Description"
          label="Description"
          name="Description"
          autoFocus
          onChange={descriptionChangeHandler}
        />{" "}
        <TextField
          margin="normal"
          required
          sx={{ width: "80%" }}
          id="Location"
          label="Location"
          name="Location"
          autoFocus
          onChange={locationChangeHandler}
        />
        <TextField
          margin="normal"
          required
          sx={{ width: "80%" }}
          id="Participants"
          label="Participants"
          name="Participants"
          autoFocus
          onChange={participantsChangeHandler}
        />{" "}
        <TextField
          margin="normal"
          required
          sx={{ width: "80%" }}
          id="UnableAttend"
          label="Unable Attendant Participants"
          name="UnableAttend"
          autoFocus
          onChange={unableAttendChangeHandler}
        />{" "}
        {/* <Box fullwidth sx={{  justifyContent: 'center'}}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        
        /></Box> */}{" "}
        <br />
        <label htmlFor="upload-File">
          <input
            style={{ display: "none" }}
            id="upload-File"
            name="upload-File"
            type="file"
            onChange={saveFile}
            required
          />
          <Button
            // fullWidth
            color="secondary"
            variant="contained"
            component="span"
            sx={{ mt: 3, mb: 2 }}
          >
            Choose Upload File
          </Button>
        </label>
        <br />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Upload File
        </Button>
      </Box>
    </Container>
  );
};

export default UploadFile;
