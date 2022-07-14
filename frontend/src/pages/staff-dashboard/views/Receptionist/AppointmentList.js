import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/AddCircleOutline';
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
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import { DataGrid,GridToolbarQuickFilter,gridClasses   } from '@mui/x-data-grid';
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom"
import * as Yup from "yup";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { Autocomplete } from "@mui/material";
import dayjs from 'dayjs';

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

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
export default function AppointmentList() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [bar, setBar] = useState(false);
  const [patient,setPatient] = useState("");
  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");

  const validationSchema = Yup.object().shape({
    doctor: Yup.object().shape({
      name: 
          Yup.string()
             .required("Doctor is required")
    }).typeError("You must specify a doctor"),
    description: Yup.string()
      .required("description is required")
      .min(6, "description must be at least 6 characters")
      .max(77, "description must not exceed 77 characters"),
    date: Yup.date()
    .required("Date is required")
    .nullable()
    .min(new Date(), "Please choose future date")
    .nullable().transform((curr, orig) => orig === '' ? null : curr)
    .default(undefined),
  });

  const columns = [
    { field: "id", headerName: "ID", minWidth: 210, flex:1 },
    { field: "patient", headerName: "Patient", minWidth: 80, flex:1 },
    { field: "doctor", headerName: "Doctor", minWidth: 80, flex:1 },
    { field: "description", headerName: "Description", minWidth: 80 , flex:1},
    { field: "date", headerName: "Date", minWidth: 120, flex:1},
    { field: "status", headerName: "Status", minWidth: 120, flex:1}
  ];


  const handleClickOpen = (e) => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickOpen3();
    }else{
      setId(selectionModel[0])
      setOpen(true);
    }
  };

  const fetchDoctors = async () => {
    await api.get(`/staff/doctors/all`).then((userData) => {
      setDoctors(userData.data);
    });
  };
  
  const onSubmit = async (data) => {
    console.log(data)
    data.gender = gender;
    try {
      await api.put(`/staff/receptionist/appointments/${selectionModel[0]}`, data).then(userData => {
              handleClose();
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
  const handleClickOpen2 = async (e) => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickOpen3();
    }else{ try {
      await api.get(`/staff/receptionist/appointment/${selectionModel[0]}`).then(appointment => {
       console.log(appointment.data.doctor)
      if(appointment.data.doctor){
        setValue('doctor',appointment.data.doctor.name);
      }
      if(appointment.data.patient){
      setPatient(appointment.data.patient.name)
      }
      setValue('date',dayjs(appointment.data.date).format("YYYY-MM-DDTHH:mm"))
      setValue('description',appointment.data.description)

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
      setPatient("");
    }else if(open3){
      setOpen3(false);
    }
    if(selectionModel[0] !== undefined || selectionModel !== null){
      setSelectionModel([]);
    }
  };

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  const [records, setRecords] = useState([]);
  const fetchData = async () => {
    await api.get(`/staff/receptionist/appointments`).then((userData) => {
      setRecords(userData.data);
    });
  };

  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };

  const newClicked = (e) =>{
    navigate('/staff/dashboard/createappointment');
  }

  useEffect(() => {
    fetchData().catch(console.error);
    fetchDoctors().catch(console.error);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const deleteAppointment = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/receptionist/appointment/${id}`).then((userData) => {
        setMessage("Deleted Successfully!");
        setSeverity("success");
        showBar();
        handleClose();
        fetchData().catch(console.error);
      });
    } catch (err) {
      setMessage("Failed. Could not delete!");
      setSeverity("error");
      console.log(`Error : ${err.message}`);
    }
  };

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
                    patient: record.patient ? record.patient.name : 'TBD',
                    doctor: record.doctor ? record.doctor.name : 'TBD',
                    description: record.description,
                    date: record.date,
                    status: record.status
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
                  } else {
                    setSelectionModel(selection);
                  }
                }}
          />
            </div>
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
                        maxWidth='md'
                        TransitionComponent={Transition}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>{"Edit appointment"}</DialogTitle>
                        <DialogContent>
                        <Grid item xs={12} md={12} lg={12}>
                          <Box component="form" onSubmit={handleSubmit}  sx={{
                          '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}>
                              <div>
                              <TextField
                              id="outlined-multiline-flexible"
                              label="Patient"
                              fullWidth
                              value={patient}
                              multiline
                              required
                              maxRows={5}
                              disabled
                            />
                              <FormControl  sx={{ mr:0, minWidth: 450 }}>
                              <Controller
                            name="doctor"
                            control={control}
                            defaultValue={[]}
                            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                          <Autocomplete
                                sx={{ mb: 4 }}
                                  disablePortal
                                  options={doctors}
                                  getOptionDisabled={(option) => option.disabled}
                                  getOptionLabel={(option) => option.name}
                                  onChange={(event, value) => {
                                    field.onChange(value);
                                  }}
                                renderInput={(params) => (
                                  <TextField
                                  required
                                  error={!!error}
                                  helperText={error?.message}
                                  label="Doctor"
                                  inputRef={ref}
                                  {...params}
                                />
                                  )}
                                />
                                )}
                              />  
                        </FormControl>
                    
                            <TextField
                              sx={{ mb: 4 }}
                              id="datetime-local"
                              fullWidth
                              defaultValue={date}
                              type="datetime-local"
                              label="Select Timing"
                              maxRows={5}
                              helperText={
                                errors.date?.message
                              }
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("date")}
                              error={errors.date ? true : false}
                            />
                            <TextField
                              id="outlined-multiline-flexible"
                              label="Description"
                              fullWidth
                              multiline
                              required
                              maxRows={5}
                              minRows={4}
                              helperText={
                                errors.description?.message
                              }
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("description")}
                              error={errors.description ? true : false}
                            />
          
                                  </div>
                            </Box>
                      </Grid>
                        </DialogContent>
                        <DialogActions>
                          <Button type="submit" variant="contained" onClick={handleClose}>Cancel</Button>
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
        <DialogTitle>{"Delete appointment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this patient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={(e) => {  deleteAppointment(e) }}>YES</Button>
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
