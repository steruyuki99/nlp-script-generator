import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ReactAudioPlayer from "react-audio-player";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//firebase
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function Result() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(" ");
  const [minutesText, setMinutesText] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [unableAttend, setUnableAttend] = useState("");
  const [filepath, setFilePath] = useState("");
  const [crrUser, setCrrUser] = useState("");
  // const [suid, setUID] = useState("");
  const [dialog, setDialog] = useState([]);
  let { minutesID } = useParams();
  var suid = "";
  const minutesId = minutesID;
  console.log(minutesId);
  let navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "minutes", minutesId);
    const user = auth.currentUser;
    setCrrUser(user);
    
    getDoc(docRef)
      .then((response) => {
        console.log(response.data());
        console.log(response.data().date);
        setTitle(response.data().title);
        setDescription(response.data().description);
        setDate(response.data().date);
        setMinutesText(response.data().minutesText);
        setLocation(response.data().location);
        setParticipants(response.data().participants);
        setUnableAttend(response.data().unableAttend);
        setDialog(response.data().dialog);
        // setUID(response.data().uid);
        suid = response.data().uid;
        //below coding is for local deployment code. Should change the path to the your development environment respectively
        const filename = response.data().filepath.slice(74);
        const fpath = "http://127.0.0.1:8887" + filename;
        setFilePath(fpath);
        //setFilePath(response.data().filepath);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(filepath);

  const handledelete = (event) => {
    event.preventDefault();

    function deleteCollection() {
      return new Promise((resolve) => {
        deleteDoc(doc(db, "minutes", minutesId))
          .then(() => {
            console.log("Delete from collection");
            resolve();
          })
          .catch((error) => {
            alert(error.message);
          });
      });
    }

    function getUID() {
      return new Promise((resolve) => {
        const user = auth.currentUser;
        if (user) {
          // setUID(user.uid);
          console.log(suid);
          resolve(user.uid);
        } else {
          // navigate("../");
        }
      });
    }

    function getList(uid) {
      return new Promise((resolve) => {
        const docRef = doc(db, "minutesList", uid);
        getDoc(docRef)
          .then((docSnap) => {
            let res = {list:  docSnap.data().minute, uid: uid}
            console.log("Document Data: ", docSnap.data());
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            alert(err);
          });
      });
    }
    function updateUserCollection(res) {
      return new Promise((resolve) => {
        for (var i = 0; i < res.list.length; i++) {
          if (res.list[i].minuteID === minutesID) {
            res.list.splice(i, 1);
            console.log(res.list);
            resolve(res);
          }
        }
      });
    }
    function updateToServer(res) {
      return new Promise((resolve) => {
        console.log(minutesID, date, description);
        const userRef = doc(db, "minutesList", res.uid);
        updateDoc(userRef, {
          minute: res.list,
        })
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            console.log(err);
            alert(err.message);
          });
      });
    }

    deleteCollection()
      .then(() => {
        return getUID();
      })
      .then((uid) => {
        console.log(uid);
        return getList(uid);
      })
      .then((res) => {
        console.log(res);
        return updateUserCollection(res);
      })
      .then((res) => {
        console.log(res);
        updateToServer(res);
      })
      .then(() => {
        alert("Deleted!");
        navigate("../list");
      });
  };
  return (
    <Container
      sx={{
        marginTop: "10vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 2,
          width: "75%",
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h5" sx={{ m: 3 }}>
          Minutes
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800 }} elevation={2}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head" style={{ width: 130 }}>
                  Title
                </TableCell>
                <TableCell> {title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Audio File </TableCell>
                <TableCell>
                  <ReactAudioPlayer src={filepath} controls />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Date</TableCell>
                <TableCell>{date}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Description</TableCell>
                <TableCell>{description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Location</TableCell>
                <TableCell>{location}</TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell variant="head">Participants</TableCell>
                <TableCell>{participants}</TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell variant="head">
                  Participants that unable to attend
                </TableCell>
                <TableCell>{unableAttend}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Generated Text</TableCell>
                <TableCell>{minutesText}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Dialog</TableCell>
                <TableCell>
                  {dialog.map((d, idx) => {
                    return (
                      <TableRow>
                        <TableCell variant="head" width={"20%"}>
                          Speaker {d.speaker}
                        </TableCell>
                        <TableCell>{d.text}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          color="error"
          variant="contained"
          component="span"
          sx={{ mt: 3, mb: 2, color: "white" }}
          onClick={handledelete}
          disabled={!crrUser}
        >
          DELETE THIS SCRIPT
        </Button>
      </Paper>
    </Container>
  );
}
