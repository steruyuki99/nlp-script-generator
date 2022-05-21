import React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
const RecentHistory = () => {
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Meeting
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width={"20%"}>No.</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            { 
            //will show data at here 
            }
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default RecentHistory;
