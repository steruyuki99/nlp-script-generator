import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

//firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Result() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(" ");
  const [minutesText, setMinutesText] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [unableAttend, setUnableAttend] = useState("");
  const [dialog, setDialog] = useState([]);
  let { minutesID } = useParams();
  const minutesId = minutesID;
  console.log(minutesId);

  useEffect(() => {
    const docRef = doc(db, "minutes", minutesId);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container  sx={{marginTop: "10vh"}}>
      <Box
        sx={{
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h5" sx={{ m: 3 }}>
          Minutes
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head" style={{ width: 130 }}>
                  Title
                </TableCell>
                <TableCell>{title}</TableCell>
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
              </TableRow>              <TableRow>
                <TableCell variant="head">Participants</TableCell>
                <TableCell>{participants}</TableCell>
              </TableRow>              <TableRow>
                <TableCell variant="head">Participants that unable to attend</TableCell>
                <TableCell>{unableAttend}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Generated Text</TableCell>
                <TableCell>{minutesText}</TableCell>
              </TableRow>
              <TableRow>
              <TableCell variant="head">Dialog</TableCell>
              <TableCell>
                {
                  dialog.map((d, idx) =>{
                    return(
                      <TableRow>
                        <TableCell variant="head" width={"20%"}>Speaker {d.speaker}</TableCell>
                        <TableCell>{d.text}</TableCell>
                      </TableRow>
                    )
                  })
                }</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
