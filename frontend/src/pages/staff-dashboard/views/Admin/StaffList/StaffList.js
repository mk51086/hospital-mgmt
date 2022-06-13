import Grid from "@mui/material/Grid";
import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/AddCircleOutline';
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
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { educationList } from "../../../../../components/shared/educationList";
import { DataGrid,GridToolbarQuickFilter,gridClasses   } from '@mui/x-data-grid';
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function StaffList() {

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email."),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be a positive number")
      .max(120, "Age must not exceed 120")
      .typeError('You must specify a number'),
    address: Yup.string()
      .required("Address is required")
      .min(6, "Address must be at least 6 characters")
      .max(77, "Address must not exceed 77 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .min(6, "Phone must be at least 6 characters")
      .max(30, "Phone must not exceed 30 characters"),
    department: Yup.string()
    .required("Department is required").typeError("You must specify a department"),
    job_title: Yup.string()
      .required("Job title is required")
      .min(3, "Job title must be at least 3 characters")
      .max(30, "Job title must not exceed 30 characters"),
    // admin: Yup.boolean().oneOf([true],''),
    education: Yup.array()
    .min(1, "Education is required")
  });


  const navigate = useNavigate();

  function CustomToolbar() {
    return (
      <GridToolbarContainer >
        
        <AppBar position="static" style={{ background: 'transparent' }} variant="dense">
          <Toolbar  style={{display:"flex", justifyContent:"space-between"}}>
              <div>
        <GridToolbarQuickFilter />
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
            </div>
            <div>
              <Link to={"/"} style={{ textDecoration: 'none' }}>
                <Button type="button" variant="contained" color="primary" float="right" onClick={newClicked} startIcon={<AddIcon />}>New</Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </GridToolbarContainer>

    );
  }

  const columns = [
    { field: "id", headerName: "ID", minWidth: 210, flex:1 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "age", headerName: "Age", width: 50 },
    { field: "gender", headerName: "Gender", width: 70 },
    { field: "department", headerName: "Department", width: 120  },
    { field: "job_title", headerName: "Job Title", width: 90 },
    { field: "admin", headerName: "Admin", type: "boolean", width: 60 },
    { field: "education", headerName: "Education", minWidth: 120, flex:1 },
    { field: "address", headerName: "Address", minWidth: 120, flex:1},
    { field: "email", headerName: "Email", minWidth: 180, flex:1 },
  ];

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [bar,setBar] = React.useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [id,setId] = useState("");
  const [gender, setGender] = useState("");
  const [department,setDepartment] = useState('');
  const [education,setEducation] = useState([]);
  const [admin,setAdmin] = useState(false);

  const [message,setMessage] = useState("");
  const [severity,setSeverity] = useState("");

  const [selectionModel, setSelectionModel] = useState([]);

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
      console.log(staff.data)
      setEducation(staff.data.education)
      setValue('name',staff.data.name)
      setGender(staff.data.gender)
      setValue('age',staff.data.age)
      setValue('email',staff.data.email)
      setValue('phone',staff.data.phone)
      setValue('address',staff.data.address)
      setValue('job_title',staff.data.job_title)
      setValue('education',staff.data.education)
      setValue('department',staff.data.department.departmentName)
      setAdmin(staff.data.admin)
      setDepartment(staff.data.department.departmentName)
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
    if(selectionModel[0] !== undefined || selectionModel !== null){
      setSelectionModel([]);
    }
  };

  const handleClose2 = () => {
    setOpen2(false);
    if(selectionModel[0] !== undefined || selectionModel !== null){
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
     console.log(userData.data)
     setRecords(userData.data)
})}

  useEffect(() => {
    fetchData().catch(console.error);
    fetchDepartments().catch(console.error);
  }, [])

  const deletestaff = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/${selectionModel[0]}`).then(userData => {
        setMessage("Deleted Successfully!");
        setSeverity("success");
        showBar();
        handleClose();
        fetchData()
        .catch(console.error);
      });
    } catch (err) {
      setMessage("Delete Failed!");
      setSeverity("error");
      showBar();
      console.log(`Error : ${err.message}`);
    }
  };

  const onSubmit = async (data) => {
    console.log('submit')
    data.admin = admin;
    data.gender = gender;
    try {
      await api.put(`/staff/${selectionModel[0]}`, data).then(userData => {
              handleClose2();
              fetchData()
              .catch(console.error);
            });
            setMessage("Updated Successfully!");
            setSeverity("success");
            showBar();
    } catch (err) {
      setMessage("Updated Failed!");
      setSeverity("error");
      showBar();
      console.log(`Error : ${err.message}`);
    }
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });



  const [departments,setDepartments] = useState([]);
  const fetchDepartments = async () =>{
    api.get('/staff/department/all').then(data =>{
      setDepartments(data.data);
    })
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <div style={{ height: 600, width: '100%' }}>
              <StripedDataGrid
                components={{ Toolbar: CustomToolbar} }
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
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                }
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
                        <Grid item xs={12} md={12} lg={12}>
                          <Box component="form" onSubmit={handleSubmit}  sx={{
                          '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}>
                              <div>
                          <TextField
                              label="Name"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.name?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("name")}
                              error={errors.name ? true : false}
                            />
                          <TextField
                              label="Email"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.email?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("email")}
                              error={errors.email ? true : false}
                            />

                            <TextField
                              label="Age"
                              multiline
                              maxRows={2}
                              helperText={
                                errors.age?.message
                                  ? errors.age?.message
                                  : ""
                              }
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("age")}
                              error={errors.age ? true : false}
                            />

                              <TextField
                              label="Address"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.address?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("address")}
                              error={errors.address ? true : false}
                            />
                                <TextField
                              label="Phone"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.phone?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("phone")}
                              error={errors.phone ? true : false}
                            />

                        <FormControl  sx={{ m: 1, minWidth: 140 }}>
                        <FormLabel>Gender</FormLabel>
                          <RadioGroup row
                            value={gender || 'Female'}
                            onChange={(event) => {
                              setGender(event.target.value);
                            }}
                          >
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            </RadioGroup>
                          </FormControl>  
                            <TextField
                              label="Job title"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.job_title?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("job_title")}
                              error={errors.job_title ? true : false}
                            />
                       <FormControl  sx={{ ml: 0, minWidth: 80 }}>
                            <Controller
                          name="department"
                          control={control}
                          render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <Autocomplete
                              sx={{ mb: 4 }}
                                disablePortal
                                options={departments.map((option) => option.departmentName)}
                                value={department || ""}
                                onChange={(event, value) => {
                                  setDepartment(value);
                                  field.onChange(value);
                                }}
                              renderInput={(params) => (
                                <TextField
                                required
                                error={!!error}
                                helperText={error?.message}
                                label="Department"
                                inputRef={ref}
                                {...params}
                              />
                                )}
                              />
                              )}
                            />  
                        </FormControl>  
                        <FormControl  sx={{ m: 0, minWidth: 80 }}>
                          <Controller
                            name="education"
                            control={control}
                            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                              <Autocomplete
                                disableClearable
                                disablePortal
                                filterSelectedOptions
                                multiple
                                options={educationList.map((option) => option.label)}
                                value={education || []}
                                onChange={(event, newValue) => {
                                  setEducation(newValue);
                                  field.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    required
                                    error={!!error}
                                    helperText={error?.message}
                                    label="Education"
                                    inputRef={ref}
                                    {...params}
                                  />
                                )}
                              />
                            )}
                          /> 
                          </FormControl> 
                          <FormControl  sx={{ m: 1, minWidth: 140 }}>
                              <FormControlLabel
                              control={<Checkbox checked={!!admin}/>} 
                              onChange={(event, value) => {
                                    setAdmin(value);
                                    console.log(value)
                                  }}
                                  label="This employee is an Administrator" />

                              </FormControl>
                                  </div>
                            </Box>
                      </Grid>
                        </DialogContent>
                        <DialogActions>
                          <Button type="submit" variant="contained" onClick={handleClose2}>Cancel</Button>
                          <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Save Changes</Button>
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