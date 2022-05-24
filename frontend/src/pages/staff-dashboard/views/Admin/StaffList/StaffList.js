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
import api from "../../../../../api/axios";
import { useState, useEffect } from "react";
import Notifybar from "../../../../../components/shared/Notifybar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { educationList } from "../../../../../components/shared/educationList";



// import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function StaffList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar,setBar] = React.useState(false);

  const [id,setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [department,setDepartment] = useState('');
  const [education,setEducation] = useState([]);
  const [job_title,setjob_title] = useState('');
  const [admin,setAdmin] = useState(false);

  const [message,setMessage] = useState("");
  const [severity,setSeverity] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleAdminChange = (event) => {
    setAdmin(event.target.value);
  };

  const handleSubmit = async (e,id) => {
    e.preventDefault();

    const data = {name,email,age,gender,address,phone,department,education,job_title,admin};
    try {
      await api.put(`/staff/${id}`, data).then(userData => {
        handleClose2();
        fetchData()
        .catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClickOpen = (e,id) => {
    setId(id)
    setOpen(true);
  };

  const handleClickOpen2 = async (e,id) => {
    console.log(id)
    try {
      await api.get(`/staff/${id}`).then(staff => {
        setId(id);
        setName(staff.data.name);
        setEmail(staff.data.email);
        setAge(staff.data.age);
        setGender(staff.data.gender);
        setAddress(staff.data.address);
        setPhone(staff.data.phone);
        setDepartment(staff.data.department);
        setAdmin(staff.data.admin);
        setjob_title(staff.data.job_title);
        setEducation(staff.data.education);
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

  const showBar = () => {
    setBar(true);
  }

  const hideBar = () => {
    setBar(false);
  }

  // const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  // const id = user.id;
  const fetchData = async () => {
    await api.get(`/staff/all`).then(userData => {
    setRecords(userData.data);
})}

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const deletestaff = async (e,id) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/${id}`).then(userData => {
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
        <h2 className="dashboard-title">View Staff</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Job Title</TableCell>
                <TableCell align="center">Admin</TableCell>
                <TableCell align="center">Education</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{record.name}</TableCell>
                    <TableCell align="center">{record.age}</TableCell>
                    <TableCell align="center">{record.gender}</TableCell>
                    <TableCell align="center">{record.department}</TableCell>
                    <TableCell align="center">{record.job_title}</TableCell>
                    <TableCell align="center">{record.admin ? 'True':'False'}</TableCell>
                    <TableCell align="center">{record.education}</TableCell>
                    <TableCell align="center">{record.email}</TableCell>
                    <TableCell  align="center">
                    <IconButton onClick={(e) => {  handleClickOpen2(e,record._id)  }} color="primary" variant="outlined" ><EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => {  handleClickOpen(e,record._id)  }} color="primary" variant="outlined" ><DeleteIcon />
                    </IconButton>
                    </TableCell>
                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Delete staff"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this staff?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>NO</Button>
                          <Button onClick={(e) => {  deletestaff(e,id) }}>YES</Button>
                        </DialogActions>
                      </Dialog>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
        </TableContainer>
              <Notifybar  open={bar} 
              onClose={hideBar}
              severity={severity} 
              message={message}/>
      </Paper>



                      <Dialog
                        open={open2}
                        keepMounted
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Edit staff"}</DialogTitle>
                        <DialogContent>
                        <Box component="form" sx={{
                            '& .MuiTextField-root': { m: 2, width: '20ch' },
                          }}>
                              <div>
                          <TextField
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
                              label="Age"
                              multiline
                              value={age}
                              onChange={e => setAge(e.target.value)}
                              helperText=" "
                              maxRows={2}
                              required
                            />
                              <TextField
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
                              label="Phone"
                              fullWidth
                              multiline
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              required
                              fullWidth
                              name="department"
                              label="Department"
                              id="department"
                              onChange={e => setDepartment(e.target.value)}
                              value={department}
                            />
                            <FormControl  sx={{ m: 0, minWidth: 80 }}>
                          <Autocomplete
                              multiple
                              onChange={(event, newValue) => {
                                setEducation(newValue);
                              }}
                              options={educationList.map((option) => option.label)}
                              value={education}
                              filterSelectedOptions
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Education"
                                  placeholder=""
                                />
                              )}
                            />
                            </FormControl>
                            <TextField
                              required
                              fullWidth
                              name="job_title"
                              label="Job title"
                              type="job_title"
                              id="job_title"
                              onChange={e => setjob_title(e.target.value)}
                              value={job_title}
                            />
                              <FormControl  sx={{ m: 1, minWidth: 140 }}>
                          <InputLabel id="gender">Gender</InputLabel>
                          <Select
                            labelId="gender"
                            id="gender"
                            value={gender}
                            label="Gender"
                            required
                            onChange={handleChange}
                            >
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl  sx={{ m: 1, minWidth: 140 }}>
                          <InputLabel id="gender">Is Admin?</InputLabel>
                          <Select
                            labelId="admin"
                            id="admin"
                            value={admin}
                            label="Is Admin?"
                            required
                            onChange={handleAdminChange}
                            >
                            <MenuItem value={'true'}>True</MenuItem>
                            <MenuItem value={'false'}>False</MenuItem>
                            </Select>
                            </FormControl>
                                </div>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button type="submit" variant="contained" onClick={handleClose2}>Cancel</Button>
                          <Button type="submit" variant="contained" onClick={(e) => {  handleSubmit(e,id)  }}>Save Changes</Button>
                        </DialogActions>
                      </Dialog>
      
    </Grid>
    
  );
}
