import Grid from "@mui/material/Grid";
import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/ModeEditOutline';
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
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

// import { useAuthContext } from "../../../../hooks/useAuthContext";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function StaffList() {
  const navigate = useNavigate();
  const renderEditButton = (a) => {
    return (
        <strong>
        <IconButton onClick={(e) => {  handleClickOpen2(e,a.id)  }} 
        color="primary" variant="outlined" >
          <EditIcon />
        </IconButton>
        </strong>
    )
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <Button onClick={handleClickOpen} startIcon={<DeleteIcon  />}>
        Delete
      </Button>
      <Button onClick={handleClickOpen2} startIcon={<EditIcon />}>
        Edit
      </Button>
      <Button onClick={newClicked} startIcon={<AddIcon />}>
        New
      </Button>
     
      </GridToolbarContainer>

    );
  }

  const renderDeleteButton = (a) => {
    return (
        <strong>
            <IconButton onClick={(e) => {  handleClickOpen(e,a.id)  }} 
            color="primary" variant="outlined" ><DeleteIcon />
            </IconButton>
        </strong>
    )
  }
  const columns = [
    { field: "id", headerName: "ID", minWidth: 210, flex:1 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "age", headerName: "Age", width: 50 },
    { field: "gender", headerName: "Gender", width: 70 },
    { field: "department", headerName: "Department", width: 120 },
    { field: "job_title", headerName: "Job Title", minWidth: 100, flex:1 },
    { field: "admin", headerName: "Admin", type: "boolean", width: 60 },
    { field: "education", headerName: "Education", minWidth: 120, flex:1 },
    { field: "address", headerName: "Address", minWidth: 120, flex:1},
    { field: "email", headerName: "Email", minWidth: 180, flex:1 },
    // {field: "update",headerName: "",width: 60, renderCell: renderEditButton, disableClickEventBubbling: true, sortable: false, disableExport: true, filterable: false},
    // {field: "delete", headerName: "", width: 60,  renderCell: renderDeleteButton, disableClickEventBubbling: true, disableExport: true, filterable: false, sortable: false},
  ];

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [bar,setBar] = React.useState(false);
  const [pageSize, setPageSize] = useState(25);
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

  const [selectionModel, setSelectionModel] = useState([]);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleAdminChange = (event) => {
    setAdmin(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {name,email,age,gender,address,phone,department,education,job_title,admin};
    try {
      await api.put(`/staff/${selectionModel[0]}`, data).then(userData => {
        handleClose2();
        fetchData()
        .catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClickOpen = (e) => {
    console.log(selectionModel[0])
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickOpen3();
    }else{
      setId(selectionModel[0])
      setOpen(true);
    }
  };

  const newClicked = (e) =>{
    navigate('/staff/dashboard/add-staff');
  }

  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };

  const handleClickOpen2 = async (e) => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickOpen3();
    }else{ try {
      await api.get(`/staff/${selectionModel[0]}`).then(staff => {
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
    setOpen2(true);}
  };

  const handleClose = () => {
    if(open){
      setOpen(false);
    }else if(open2){
      setOpen2(false);
    }else if(open3){
      setOpen3(false);
    }
    if(selectionModel[0] != undefined || selectionModel != null){
      setSelectionModel([]);
    }
  };

  const handleClose2 = () => {
    setOpen2(false);
    if(selectionModel[0] != undefined || selectionModel != null){
      setSelectionModel([]);
    }
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
    console.log(userData.data)
})}

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const deletestaff = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/${selectionModel[0]}`).then(userData => {
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
          p: 5,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">View Staff</h2>
        <div style={{ height: 600, width: '100%' }}>
              <DataGrid
                components={{ Toolbar: CustomToolbar }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                onCellDoubleClick={(params, event) => {
                  handleClickOpen2();
                }}
                rows={records.map((record) => {
                  return {
                    id: record._id,
                    name: record.name,
                    age: record.age,
                    gender: record.gender,
                    department: record.department?.departmentName,
                    job_title: record.job_title,
                    admin: record.admin,
                    address: record.address,
                    education: record.education,
                    email: record.email
                  }})}
                columns={columns}
                getRowId={(row) => row.id}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[25, 50, 100]}
                pagination
                checkboxSelection
                selectionModel={selectionModel}
                hideFooterSelectedRowCount
                onSelectionModelChange={(selection) => {
                  if (selection.length > 1) {
                    const selectionSet = new Set(selectionModel);
                    const result = selection.filter((s) => !selectionSet.has(s));

                    setSelectionModel(result);
                    console.log(result)
                  } else {
                    setSelectionModel(selection);
                  }
                }}
          />
           <Button
        color="primary"
        variant="contained"
        
      >Delete
      </Button>
            </div>
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

                      <Dialog
                        open={open}
                        keepMounted
                        TransitionComponent={Transition}
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


                      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        
          <DialogTitle>
            <Grid container direction="row" justify="space-between" alignItems="center">
              You must select an item

            </Grid>
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          To proceed with this action you must select an item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
    
  );
}