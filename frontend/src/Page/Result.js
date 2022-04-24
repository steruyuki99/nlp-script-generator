import * as React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Result() {
  return (
    <Container>
      <Box
        sx={{
        marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
          <Typography
            variant="h4"
            component="h5"
            sx={{ m: 3}}
          >
            Minutes
          </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell variant="head" style={{ width: 130 }}>
                  Title
                </TableCell>
                <TableCell>Sample 1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Date</TableCell>
                <TableCell>24/4/2022</TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell variant="head">Description</TableCell>
                <TableCell>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent placerat mattis tortor, eu condimentum dolor
                  fringilla non. Sed vitae neque erat. Donec purus lectus,
                  maximus vel rhoncus sit amet, rutrum eu ligula.{" "}
                </TableCell>
              </TableRow>{" "}
              <TableRow>
                <TableCell variant="head">Generated Text</TableCell>
                <TableCell>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent placerat mattis tortor, eu condimentum dolor
                  fringilla non. Sed vitae neque erat. Donec purus lectus,
                  maximus vel rhoncus sit amet, rutrum eu ligula. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Praesent placerat
                  mattis tortor, eu condimentum dolor fringilla non. Sed vitae
                  neque erat. Donec purus lectus, maximus vel rhoncus sit amet,
                  rutrum eu ligula. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Praesent placerat mattis tortor, eu
                  condimentum dolor fringilla non. Sed vitae neque erat. Donec
                  purus lectus, maximus vel rhoncus sit amet, rutrum eu ligula.{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
