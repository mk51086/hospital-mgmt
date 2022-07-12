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
import { countries } from "../../../../components/shared/countries";
import { Autocomplete } from "@mui/material";

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
export default function MedicineList() {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = useState(false);
  const [bar, setBar] = React.useState(false);

  const [id, setId] = useState("");
  const [gender, setGender] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(25);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    cost: Yup.number()
      .required("Cost is required")
      .min(0, "Cost must be a positive number")
      .typeError('You must specify a number'),
    brand: Yup.string()
      .required("Brand is required")
      .min(3, "Address must be at least 3 characters")
      .max(77, "Address must not exceed 77 characters"),
    description: Yup.string()
    .typeError('Town must be specified'),
  });

  const columns = [
    { field: "id", headerName: "ID", minWidth: 210, flex:1 },
    { field: "name", headerName: "Name", minWidth: 90, flex:1 },
    { field: "cost", headerName: "Cost", width: 40 },
    { field: "brand", headerName: "Brand", minWidth: 60, flex:1  },
    { field: "description", headerName: "Description",minWidth: 80, flex:1 },
    { field: "creator", headerName: "Created by", minWidth: 80, flex:1},
    { field: "createdAt", headerName: "Date created", minWidth: 120, flex:1},
  ];


  const handleClickOpen = (e) => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickOpen3();
    }else{
      setId(selectionModel[0])
      setOpen(true);
    }
  };
  
  const onSubmit = async (data) => {
    console.log(data)
    data.gender = gender;
    try {
      await api.put(`/staff/pharmacist/medicine/${selectionModel[0]}`, data).then(userData => {
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
      await api.get(`/staff/pharmacist/medicine/${selectionModel[0]}`).then(medicine => {
        console.log(medicine)
      setValue('name',medicine.data.name)
      setValue('cost',medicine.data.cost)
      setValue('brand',medicine.data.brand)
      setValue('description',medicine.data.description)
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

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  const [records, setRecords] = useState([]);
  const fetchData = async () => {
    await api.get(`/staff/pharmacist/medicines`).then((userData) => {
      setRecords(userData.data);
    });
  };

  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };

  const newClicked = (e) =>{
    navigate('/staff/dashboard/add-medicine');
  }

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const deletemedicine = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/pharmacist/medicine/${id}`).then((userData) => {
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
                    name: record.name,
                    cost: record.cost,
                    brand: record.brand,
                    description: record.description || 'No description available',
                    creator: record.creator.name,
                    createdAt: record.createdAt,
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
                        <DialogTitle>{"Edit medicine"}</DialogTitle>
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
                              label="Cost"
                              multiline
                              maxRows={2}
                              helperText={
                                errors.cost?.message
                              }
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("cost")}
                              error={errors.cost ? true : false}
                            />

                              <TextField
                              label="Brand"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.brand?.message}
                              required
                              InputLabelProps={{
                                shrink: true,
                              }}
                              {...register("brand")}
                              error={errors.brand ? true : false}
                            />
                             <TextField
                              label="Description"
                              fullWidth
                              multiline
                              maxRows={5}
                              helperText={errors.description?.message}
                              required
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
        <DialogTitle>{"Delete medicine"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this medicine?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={(e) => {  deletemedicine(e) }}>YES</Button>
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
