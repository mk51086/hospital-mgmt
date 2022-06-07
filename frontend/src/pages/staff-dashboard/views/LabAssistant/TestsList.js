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

// import { useAuthContext } from "../../../../hooks/useAuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TestsList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [id, setId] = useState("");
  const [test, setTest] = useState("");
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [normal, setNormal] = useState("");

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const data = { test, patient, description, result, normal };
    try {
      await api.put(`/labassistant/${id}`, data).then((testData) => {
        console.log("saved", testData);
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
      await api.get(`/labassistant/${id}`).then((test) => {
        setId(id);
        setTest(test.data.test.testName);
        setPatient(test.data.patient.name);
        setDescription(test.data.description);
        setResult(test.data.result);
        setNormal(test.data.test.normalValues);
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

  // const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  // const id = user.id;
  const fetchData = async () => {
    await api.get(`/labassistant/all`).then((testData) => {
      setRecords(testData.data);
      console.log(testData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deleteTest = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/labassistant/${id}`).then((testData) => {
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
        <h2 className="dashboard-title">Tests</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Test</TableCell>
                <TableCell align="center">Patient</TableCell>
                <TableCell align="center">Notes</TableCell>
                <TableCell align="center">Result</TableCell>
                <TableCell align="center">Normal</TableCell>
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
                    <TableCell align="center">{record.test.testName}</TableCell>
                    <TableCell align="center">{record.patient.name}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">{record.result}</TableCell>
                    <TableCell align="center">
                      {record.test.normalValues}
                    </TableCell>
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
                      <DialogTitle>{"Delete test"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you sure you want to delete this test?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>NO</Button>
                        <Button
                          onClick={(e) => {
                            deleteTest(e, id);
                          }}
                        >
                          YES
                        </Button>
                      </DialogActions>
                    </Dialog>

                    <Dialog
                      open={open2}
                      TransitionComponent={Transition}
                      keepMounted
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Edit Test"}</DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 2, width: "20ch" },
                          }}
                        >
                          <div>
                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="Test"
                              value={test}
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setTest(e.target.value)}
                            />
                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="Patient"
                              value={patient}
                              InputLabelProps={{ shrink: true }}
                              onChange={(e) => setPatient(e.target.value)}
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Notes"
                              fullWidth
                              multiline
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Result"
                              fullWidth
                              multiline
                              value={result}
                              onChange={(e) => setResult(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              disabled
                              id="outlined-disabled"
                              label="Normal"
                              InputLabelProps={{ shrink: true }}
                              value={normal}
                            />
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={handleClose2}
                        >
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
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
}
