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
import { useAuthContext } from "../../../../hooks/useAuthContext";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// import { useAuthContext } from "../../../../hooks/useAuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TestsTypes() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [id, setId] = useState("");
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [normalValues, setNormalValues] = useState("");
  const [available, setAvailable] = React.useState(false);
  const [state, setState] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const data = { testName, description, normalValues, available };
    try {
      await api
        .put(`/labassistant/testtypes/${id}`, data)
        .then((testTypeData) => {
          console.log("saved", testTypeData);
          handleClose2();
          fetchData().catch(console.error);
        });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = {
      testName,
      description,
      normalValues,
      available,
      id: user.id,
    };
    try {
      await api
        .post("/labassistant/testtypes/addtestType", data)
        .then((userData) => {
          reset();
          handleClose2();
          fetchData().catch(console.error);
        });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const reset = () => {
    setTestName("");
    setDescription("");
    setNormalValues("");
    setAvailable(false);
  };

  const handleClickOpen = (e, id) => {
    setId(id);
    setOpen(true);
  };

  const handleClickOpen2 = async (e, id) => {
    try {
      await api.get(`/labassistant/testtypes/${id}`).then((testtype) => {
        setId(id);
        setTestName(testtype.data.testName);
        setDescription(testtype.data.description);
        setNormalValues(testtype.data.normalValues);
        setAvailable(testtype.data.available);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
    setOpen2(true);
    setState(false);
  };

  const handleClickOpen3 = () => {
    setState(true);
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    reset();
  };

  const [records, setRecords] = useState([]);
  const fetchData = async () => {
    await api.get(`/labassistant/testtypes/all`).then((testTypeData) => {
      setRecords(testTypeData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deleteTestType = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/labassistant/testtypes/${id}`).then((testTypeData) => {
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 className="dashboard-title">Test Types</h2>
          <Button
            onClick={handleClickOpen3}
            variant="contained"
            sx={{ mt: 0, mb: 5 }}
          >
            Add Type
          </Button>
        </div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Test Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Normal Values</TableCell>
                <TableCell align="center">Available</TableCell>
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
                    <TableCell align="center">{record.testName}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">{record.normalValues}</TableCell>
                    <TableCell align="center">
                      {record.available ? "Yes" : "No"}
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
                            deleteTestType(e, id);
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
                      <DialogTitle>
                        {state ? "Add Test" : "Edit Test"}
                      </DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{
                            "& .MuiTextField-root": { m: 2, width: "20ch" },
                          }}
                        >
                          <div>
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Test Name"
                              fullWidth
                              multiline
                              value={testName}
                              onChange={(e) => setTestName(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Normal Values"
                              fullWidth
                              multiline
                              value={normalValues}
                              onChange={(e) => setNormalValues(e.target.value)}
                              helperText=" "
                              maxRows={5}
                              required
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Description"
                              fullWidth
                              style={{ width: "54vh" }}
                              multiline
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              helperText=" "
                              maxRows={10}
                              required
                            />
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                width: "54vh",
                              }}
                            >
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={available}
                                      onChange={(e) =>
                                        setAvailable(e.target.checked)
                                      }
                                    />
                                  }
                                  label="Available"
                                />
                              </FormGroup>
                            </div>
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
                            state ? handleAdd(e) : handleSubmit(e, id);
                          }}
                        >
                          Save
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
