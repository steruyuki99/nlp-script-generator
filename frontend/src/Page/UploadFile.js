import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
} from "@mui/material";
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
import Loading from "./Loading";

const UploadFile = () => {
  const [userID, setUserID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [unableAttend, setUnableAttend] = useState(" ");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileIsValid, setFileValid] = useState(false);
  const [loadingState, setLoading] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserID(user.uid);
    } else {
      navigate("../");
    }
  }, []);

  // const [titleTouched, setTitleTouched] = useState(false);
  // const [descriptionTouched, setDescriptionTouched] = useState(false);
  // const [locationTouched, setLocationTouched] = useState(false);
  // const [participantsTouched, setParticipantsTouched] = useState(false);
  // const [unparticipantsTouched, setUnparticipantsTouched] = useState(false);

  const enteredTitleIsValid = title.trim() !== "";
  const enteredDescriptionIsValid = description.trim !== "";
  const enteredLocationIsValid = location.trim !== "";
  const enteredParticipantsIsValid = participants.trim !== "";
  const enteredUnableIsValidIsValid = unableAttend.trim !== "";

  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredDescriptionIsValid &&
    enteredLocationIsValid &&
    enteredParticipantsIsValid &&
    enteredUnableIsValidIsValid &&
    fileIsValid
  ) {
    formIsValid = true;
  }

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

  const isValidFileUploaded = (file) => {
    console.log(fileName);
    const validExtensions = ["mp3"];
    const fileExtension = file.split(".").pop();
    console.log(fileExtension);
    return validExtensions.includes(fileExtension);
  };

  const saveFile = (e) => {
    if (e.target.files.length < 1) {
      return;
    }

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);

    if (isValidFileUploaded(e.target.files[0].name)) {
      setFileValid(true);
    } else {
      alert("File Format is not support");
    }
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

    setLoading(true);
    function GenerateText() {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios
          .post("http://localhost:8000/upload", formData)
          .then((res) => {
            console.log(res.data.results);
            console.log(res.data.path);
            console.log(res.data.path.path);
            const filepath = res.data.path.path;
            // const minutesText =
            //   res.data.results.result.results[0].alternatives[0].transcript;
            console.log(res.data.result);
            const dialog = generateDialog(res.data.results);
            const resObj = { dialog: dialog, filepath: filepath };
            console.log(dialog);
            console.log(formData);
            resolve(resObj);
          })
          .catch((err) => {
            console.log("error on upload file: ", err);
            alert(err);
            setLoading(false);
          });
      });
    }

    function UploadText(resObj) {
      return new Promise((resolve) => {
        console.log(resObj);
        addDoc(collection(db, "minutes"), {
          uid: userID,
          date: time,
          description: description,
          minutesText: resObj.dialog.text,
          dialog: resObj.dialog.dialog,
          location: location,
          participants: participants,
          unableAttend: unableAttend,
          title: title,
          filepath: resObj.filepath,
        })
          .then((response) => {
            console.log("Document ID", response.id);
            resolve(response.id);
          })
          .catch((err) => {
            console.log("Firebase Error: ", err);
            alert(err.message);
            setLoading(false);
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
            alert(err.message);
            setLoading(false);
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
        console.log(crrSp);
        console.log(result.result.speaker_labels[i].speaker);
        if (crrSp !== result.result.speaker_labels[i].speaker) {
          const dialog = {
            speaker: result.result.speaker_labels[i].speaker,
            text: str,
          };
          fullDialog.push(dialog);
          console.log(fullDialog);
          console.log(fulltext);
          str = "";
          crrSp = result.result.speaker_labels[i].speaker;
        }
        if (
          result.result.results[j].alternatives[0].timestamps[k][1] ===
          result.result.speaker_labels[i].from
        ) {
          //to add data in to the specific array
          str +=
            result.result.results[j].alternatives[0].timestamps[k][0] + " ";
        } else {
          console.log(
            "A message will not shown " +
              result.result.results[j].alternatives[0].timestamps[k][0]
          );
        }
        if (final) {
          const dialog = {
            speaker: result.result.speaker_labels[i].speaker,
            text: str,
          };
          fullDialog.push(dialog);
          console.log(fullDialog);
          console.log(fulltext);
          str = "";
          crrSp = result.result.speaker_labels[i].speaker;
        }
        k++;
        i++;
      }
      const res = { dialog: fullDialog, text: fulltext };
      return res;
    }
    GenerateText()
      .then((resObj) => {
        console.log(resObj);
        return UploadText(resObj);
      })
      .then((docID) => {
        console.log(docID);
        return updateUserList(docID);
      })
      .then((docID) => {
        console.log(docID);
        setLoading(false);
        navigate(`/list/${docID}`);
      });
  };

  if (!loadingState) {
    return (
      <Container component="section" maxWidth="md" sx={{ marginTop: "12vh" }}>
        <Paper sx={{ minWidth: 275, p: 1, m: 1 }}>
          <Typography variant="h3" component="h2" sx={{ m: 3 }}>
            Upload File
          </Typography>{" "}
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
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
                sx={{ mt: 3, mb: 2, color: "white" }}
              >
                Choose Upload File (Format: MP3 ONLY)
              </Button>
            </label>
            <br />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              disabled={!formIsValid}
            >
              Upload File
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  } else {
    return <Loading />;
  }
};

export default UploadFile;
