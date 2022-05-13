import Grid from "@mui/material/Grid";
import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AppointmentList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");




  const navigate = useNavigate();


  
  const handleSubmit = async (e,id) => {
    e.preventDefault();

    const data = {name,email,age,gender,address,phone};
    try {
      const response = await api.put(`/patients/${id}`, data).then(userData => {
        console.log('saved',userData);
        handleClose2();
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = async (e,id) => {
    try {
      const response = await api.get(`/patients/${id}`).then(patient => {
        setName(patient.data.name);
        setEmail(patient.data.email);
        setAge(patient.data.age);
        setGender(patient.data.gender);
        setAddress(patient.data.address);
        setPhone(patient.data.phone);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  
  };

  const handleClose2 = () => {
    setOpen2(false);
  
  };

  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  const id = user.id;
  useEffect(async () => {
    const response = await api.get(`/patients/all`).then(userData => {
      setRecords(userData.data);
      console.log(userData)
    });
  }, []);

  const deletePatient = async (e,id) => {
    e.preventDefault();
    try {
      const response = await api.delete(`/patients/${id}`).then(userData => {
        console.log('deleted');
        handleClose();
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
        <h2 className="dashboard-title">View Patients</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Registration Date</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{record._id}</TableCell>
                    <TableCell align="center">{record.name}</TableCell>
                    <TableCell align="center">{record.age}</TableCell>
                    <TableCell align="center">{new Date(record.register_date).toUTCString()}</TableCell>
                    <TableCell align="center">{record.email}</TableCell>
                    <TableCell  align="center">
                    <IconButton onClick={(e) => {  handleClickOpen2(e,record._id)  }}color="primary" variant="outlined" ><EditIcon />
                    </IconButton>
                    <IconButton onClick={handleClickOpen} color="primary" variant="outlined" ><DeleteIcon />
                    </IconButton>
                    </TableCell>
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Delete Patient"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this patient?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>NO</Button>
                          <Button onClick={(e) => {  deletePatient(e,record._id)  }}>YES</Button>
                        </DialogActions>
                      </Dialog>


                      <Dialog
                        open={open2}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Edit Patient"}</DialogTitle>
                        <DialogContent>
                        <Box component="form" onSubmit={handleSubmit}  sx={{
                            '& .MuiTextField-root': { m: 2, width: '20ch' },
                          }}>
                              <div>
                          <TextField
                              id="outlined-multiline-flexible"
                              label="Name"
                              fullWidth
                              multiline
                              value={name}
                              onChange={e => setName(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Email"
                              fullWidth
                              multiline
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Age"
                              fullWidth
                              multiline
                              value={age}
                              onChange={e => setAge(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Gender"
                              fullWidth
                              multiline
                              value={gender}
                              onChange={e => setGender(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Address"
                              fullWidth
                              multiline
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                                <TextField
                              id="outlined-multiline-flexible"
                              label="Phone"
                              fullWidth
                              multiline
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                               </div>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button type="submit" variant="contained" onClick={handleClose2}>Cancel</Button>
                          <Button type="submit" variant="contained" onClick={(e) => {  handleSubmit(e,record._id)  }}>Save Changes</Button>
                        </DialogActions>
                      </Dialog>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
    </Grid>
    
  );
}
