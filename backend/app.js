const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");
const { getEnabledCategories } = require("trace_events");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use("/files", express.static(__dirname + "/files"));

app.post("/upload", (req, res) => {
  // console.log(req);
  const newpath = __dirname + "/files/";
  const file = req.files.file;
  const filename = file.name;

  function UploadFile() {
    return new Promise((resolve) => {
      file.mv(`${newpath}${filename}`, (err) => {
        if (err) {
          res.status(500).send({ message: "File upload failed", code: 200 });
        }
        resolve("${newpath}${filename}");
      });
    });
    
  }

  function SText() {
    return new Promise((resolve) => {
      const speechToText = new SpeechToTextV1({
        authenticator: new IamAuthenticator({
          apikey: process.env.API_KEY,
        }),
        serviceUrl: process.env.SERVICE_URL,
      });

      const recognizeParams = {
        audio: fs.createReadStream(`files/${filename}`),
        contentType: "audio/mp3",
        wordAlternativesThreshold: 0.9,
      };

      speechToText
        .recognize(recognizeParams)
        .then((speechRecognitionResults) => {
          console.log(JSON.stringify(speechRecognitionResults, null, 2))
          console.log(speechRecognitionResults.result.results[0].alternatives[0].transcript);
          resolve(speechRecognitionResults.result.results[0].alternatives[0].transcript);
        })
        .catch((err) => {
          console.log("error:", err);
        });
    });
  }

  UploadFile()
    .then((fpath) => {
      console.log(fpath);
      return SText();
    })
    .then((text) => {
      console.log(text)
      res.status(200).send({
        message: "File Uploaded",
        code: 200,
        results: text,
      });
    });
});

app.listen(8000, () => {
  console.log("Server running successfully on 8000");
});
