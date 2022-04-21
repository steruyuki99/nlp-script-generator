import { Container, Typography, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const UploadFile = () => {
  const fileTypes = ["mp3"];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [generatedText, setGeneratedText] = useState("No Text Genenrated");

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("Submit button");
  };

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      console.log(res);
      console.log(res.data.results);
      setGeneratedText(res.data.results);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Container component="section" maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ m: 3 }}>
        Upload File
      </Typography>
      <Box
        component="form"
        noValidate
        sx={{ m: 4, mt: 1 }}
        onSubmit={uploadFile}
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

      <Typography variant="" component="h2" sx={{ m: 3 }}>
        {generatedText}
      </Typography>
    </Container>
  );
};

export default UploadFile;
