import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import Notifybar from "../../../../components/shared/Notifybar";
// import { useAuthContext } from "../../../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExaminationList() {
  // const { user } = useAuthContext();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar, setBar] = React.useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [id, setId] = useState("");
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");
  const [nurse, setNurse] = useState("");

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const data = { description };
    try {
      console.log(description);
      await api.put(`/staff/nurse/examination/${id}`, data).then((userData) => {
        handleClose2();
        fetchData().catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClickOpen = (e, id) => {
    setId(id);
    setOpen(true);
  };

  const handleClickOpen2 = async (e, id) => {
    try {
      await api.get(`/staff/nurse/examination/${id}`).then((userData) => {
        setId(id);
        setPatient(userData.data.patient?.name);
        setDescription(userData.data.description);
        setNurse(userData.data.nurse);
        console.log(userData.data.nurse);
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
  };

  const hideBar = () => {
    setBar(false);
  };

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const fetchData = async () => {
    await api.get(`/staff/nurse/examinations`).then((userData) => {
      console.log(userData);
      setRecords(userData.data);
    });
  };

  const deleteExamination = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/nurse/examination/${id}`).then((userData) => {
        console.log("deleted");
        handleClose();
        fetchData().catch(console.error);
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
        <h2 className="dashboard-title">Your Examinations</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Patient</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Nurse</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{record._id}</TableCell>
                    <TableCell align="center">{record.patient?.name}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">{record.nurse}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          handleClickOpen2(e, record._id);
                        }}
                        color="primary"
                        variant="outlined"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          handleClickOpen(e, record._id);
                        }}
                        color="primary"
                        variant="outlined"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Delete Examination"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to delete this examination?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>NO</Button>
                        <Button
                          onClick={(e) => {
                            deleteExamination(e, id);
                          }}
                        >
                          YES
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Notifybar
          open={bar}
          onClose={hideBar}
          severity={severity}
          message={message}
        />
      </Paper>
      <Dialog
        open={open2}
        keepMounted
        maxWidth="md"
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit Examination"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "20ch" },
            }}
          >
            <div>
              <TextField
                label="Patient"
                fullWidth
                disabled
                InputProps={{ inputProps: { min: 0 } }}
                value={patient}
                helperText=" "
                required
              />
              <TextField
                label="Description"
                fullWidth
                value={description}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => setDescription(e.target.value)}
                helperText=" "
                required
              />
              <TextField
                label="Nurse"
                fullWidth
                disabled
                value={nurse}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => setNurse(e.target.value)}
                helperText=" "
                required
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handleClose2}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              handleSubmit(e, id);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
