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
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import Notifybar from "../../../../components/shared/Notifybar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { educationList } from "../../../../components/shared/educationList";
import { useAuthContext } from "../../../../hooks/useAuthContext";


// import { useAuthContext } from "../../../../hooks/useAuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Bills() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar,setBar] = React.useState(false);

  const [id,setId] = useState("");
  const [patient, setPatient] = useState("");
  const [paid, setPaid] = useState("");
  const [total, setTotal] = useState("");
  const [debt, setDebt] = useState("");
  const { user } = useAuthContext();

  const [message,setMessage] = useState("");
  const [severity,setSeverity] = useState("");


  const handleSubmit = async (e,id) => {
    e.preventDefault();

    const data = {paid,total,debt};
    try {
      await api.put(`/staff/cashier/bill/${id}`, data).then(userData => {
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

  const handleDebt = async (e) => {
    setPaid(e.target.value);
    setDebt(total - e.target.value)
  }

  const handleClickOpen2 = async (e,id) => {
    console.log(id)
    try {
      await api.get(`/staff/cashier/bill/${id}`).then(bill => {
        setId(id);
        setPatient(bill.data.patient.name);
        setPaid(bill.data.paid);
        setTotal(bill.data.total);
        setDebt(bill.data.debt);
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
    await api.get(`/staff/cashier/bills`).then(userData => {
    setRecords(userData.data);
})}

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const deleteBill = async (e,id) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/cashier/bill/${id}`).then(userData => {
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
                <TableCell align="center">Patient</TableCell>
                <TableCell align="center">Total</TableCell>
                <TableCell align="center">Paid</TableCell>
                <TableCell align="center">Debt</TableCell>
                <TableCell align="center">Created by</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{record.patient.name}</TableCell>
                    <TableCell align="center">{record.total}</TableCell>
                    <TableCell align="center">{record.paid}</TableCell>
                    <TableCell align="center">{record.debt}</TableCell>
                    <TableCell align="center">{record.creator.name}</TableCell>
                    <TableCell  align="center">
                    <IconButton onClick={(e) => {  handleClickOpen2(e,record._id)  }} color="primary" variant="outlined" ><EditIcon />
                    </IconButton>
                    <IconButton onClick={(e) => {  handleClickOpen(e,record._id)  }} color="primary" variant="outlined" ><DeleteIcon />
                    </IconButton>
                    </TableCell>
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
                                          maxWidth='md'
                                          TransitionComponent={Transition}
                                          aria-describedby="alert-dialog-slide-description"
                                        >
                                          <DialogTitle>{"Edit staff"}</DialogTitle>
                                          <DialogContent>
                                          <Box component="form" sx={{
                                              '& .MuiTextField-root': { m: 1, width: '40ch' },
                                            }}>
                                                <div>
                                                <TextField
                              label="Patient"
                              fullWidth
                              disabled
                              InputProps={{ inputProps: { min: 0} }}
                              value={patient}
                              helperText=" "
                              required
                            />
                            <TextField
                              label="Total"
                              fullWidth
                              type="number"
                              InputProps={{ inputProps: { min: 0} }}
                              value={total}
                              onChange={e => setTotal(e.target.value)}
                              helperText=" "
                              required
                            />
                                <TextField
                              label="Paid"
                              fullWidth
                              type="number"
                              value={paid}
                              InputProps={{ inputProps: { min: 0} }}
                              onChange={e => handleDebt(e)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              label="Debt"
                              fullWidth
                              type="number"
                              disabled
                              value={debt}
                              onChange={e => setDebt(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            
                          </div>
                          </Box>
                        </DialogContent>
                        <DialogActions>
                          <Button type="submit" variant="contained" onClick={handleClose2}>Cancel</Button>
                          <Button type="submit" variant="contained" onClick={(e) => {  handleSubmit(e,id)  }}>Save Changes</Button>
                        </DialogActions>
                      </Dialog>

                      <Dialog
                        open={open}
                        keepMounted
                        TransitionComponent={Transition}
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Delete bill"}</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            Are you sure you want to delete this bill?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>NO</Button>
                          <Button onClick={(e) => {  deleteBill(e,id) }}>YES</Button>
                        </DialogActions>
                      </Dialog>
      
    </Grid>
    
  );
}