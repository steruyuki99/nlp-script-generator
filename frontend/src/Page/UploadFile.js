import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
//import firebase
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const UploadFile = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [generatedText, setGeneratedText] = useState("No Text Genenrated");
  let navigate = useNavigate();

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit button");
    function GenerateText() {
      return new Promise((resolve) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios
          .post("http://localhost:8000/upload", formData)
          .then((res) => {
            const minutesText = res.data.results;
            setGeneratedText(res.data.results);
            console.log(res.data.resolve);
            resolve(minutesText);
          })
          .catch((err) => {
            console.log("error on upload file: ", err);
          });
      });
    }

    function UploadText(gText) {
      return new Promise((resolve) => {
        const sendTime = new Date();
        const timed = sendTime.getHours() + ":" + sendTime.getMinutes();
        const day =
          sendTime.getDate() +
          "/" +
          (sendTime.getMonth() + 1) +
          "/" +
          sendTime.getFullYear();
        const time = day + " " + timed;
        console.log(gText);
        addDoc(collection(db, "minutes"), {
          date: time,
          description: description,
          minutesText: gText,
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

    GenerateText()
      .then((gText) => {
        console.log(gText);
        return UploadText(gText);
      })
      .then((docID) => {
        console.log(docID);
        navigate(`/list/${docID}`);
      });
  };

  return (
    <Container component="section" maxWidth="md">
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
        />
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
          Upload FIle
        </Button>
      </Box>
    </Container>
  );
};

export default UploadFile;
