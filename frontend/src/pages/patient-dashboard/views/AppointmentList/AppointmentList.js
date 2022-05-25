import Grid from "@mui/material/Grid";
import * as React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AppointmentList() {

  const [open, setOpen] = React.useState(false);
  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  const [ id ,setId] = useState('');

    const fetchData = async () => {
    await api.get(`/patient/appointment/${user.id}`).then(userData => {
    setRecords(userData.data);
   
})}

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])


  const handleClose = () => {
    setOpen(false);
  
  };

  const handleClickOpen = (e,id) => {
    setId(id);
    setOpen(true);
  };


  const cancelAppointment = async (e,id) => {
    e.preventDefault();
    try {
      await api.put(`/patient/appointment/cancel/${id}`).then(userData => {
        handleClose();
        fetchData()
        .catch(console.error);
      });
    } catch (err) {

      console.log(`Error : ${err.message}`);
    }
  };

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
        <h2 className="dashboard-title">Your Appointments</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Doctor</TableCell>
                <TableCell align="center">Room</TableCell>
                <TableCell align="center">Status</TableCell>
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
                    {typeof record.doctor !== 'undefined' &&
                     <TableCell align="center">{record.doctor.name}</TableCell>
                      }
                    {typeof record.room !== 'undefined' &&
                     <TableCell align="center">{record.room.number}</TableCell>
                      }
                     {typeof record.doctor === 'undefined' &&
                     <TableCell align="center">TBD</TableCell>
                      }
                    {typeof record.room === 'undefined' &&
                     <TableCell align="center">TBD</TableCell>
                      }
                    <TableCell align="center">{record.status}</TableCell>
                    <TableCell  align="center">
                    {record.status === 'Pending' && 
                    <IconButton onClick={(e) => {  handleClickOpen(e,record._id)  }} color="primary" variant="outlined" ><CancelIcon />
                    </IconButton>
                    }
                    </TableCell>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cancel Appointment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to cancel this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={(e) => {  cancelAppointment(e,id) }}>YES</Button>
        </DialogActions>
      </Dialog>
    </Grid>
    
  );
}
