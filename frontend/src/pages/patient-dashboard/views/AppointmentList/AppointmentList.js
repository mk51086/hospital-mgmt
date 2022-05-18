import Grid from "@mui/material/Grid";
import * as React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Slide from '@mui/material/Slide';
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function PatientList() {

  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);

    const fetchData = async () => {
    await api.get(`/patient/appointment/${user.id}`).then(userData => {
    setRecords(userData.data);
})}

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">View Patients</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{record._id}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">{record.date}</TableCell>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
    </Grid>
    
  );
}
