import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
import FormControl from "@mui/material/FormControl";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { GridToolbarQuickFilter   } from '@mui/x-data-grid';
import Link from "@mui/material/Link";
import { StripedDataGrid } from "../../../../components/shared/StrippedDataGrid";
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { useForm,Controller } from "react-hook-form";
import { Autocomplete } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Bills() {
  const navigate = useNavigate();

  const [del, setDel] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bar, setBar] = useState(false);
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [isSelected, setIsSelected] = useState(false);
  const [id, setId] = useState("");
  const [patient, setPatient] = useState("");
  const [paid, setPaid] = useState("");
  const [total, setTotal] = useState("");
  const [debt, setDebt] = useState("");
  const [patients,setPatients] = useState([]);
  const [records, setRecords] = useState([]);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const validationSchema = Yup.object().shape({
    patient: Yup.string()
    .required("Patient is required").typeError("You must specify a patient"),
    total: Yup.number()
      .required("Total is required")
      .min(0, "Total must be a positive number")
      .typeError('Total is required'),
    paid: Yup.number()
    .required("Paid is required")
    .min(0, "Paid must be a positive number")
    .typeError('Paid is required')
  });
  const columns = [
    { field: "id", headerName: "ID", minWidth: 120, flex:1 },
    { field: "patient", headerName: "Patient", width: 140 },
    { field: "total", headerName: "Total", width: 120 },
    { field: "paid", headerName: "Paid", width: 120 },
    { field: "debt", headerName: "Debt", width: 120},
    { field: "cancelation_fee", headerName: "Cancellation Fee", width: 120},
    { field: "creator", headerName: "Created by", minWidth: 120, flex:1},
  ];

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

const newClicked = ()=>{
  navigate('/staff/dashboard/createbill')
}

  const handleClickDelete = () => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickSelected();
    } else {
      try {
        setDel(true);
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
    }
  };

  const handleClickSelected = () => {
    setIsSelected(true);
  };

  const handleDebt = async (e) => {
    setPaid(e.target.value);
    setDebt(total - e.target.value)
  }

  const handleTotal = (e)=>{
      setTotal(e.target.value);
      setDebt(e.target.value-getValues().paid);
    }


  const handleClickEdit = async (e) => {
    if(selectionModel[0] === undefined || selectionModel === null){
      handleClickSelected();
    }else{ 
    try {
      await api.get(`/staff/cashier/bill/${selectionModel[0]}`).then((bill) => {
        setValue('paid',bill.data.paid);
        setValue('total', bill.data.total);
        setValue('patient',bill.data.patient.name)
        setPatient(bill.data.patient.name)
        setDebt(bill.data.debt);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
    setEdit(true);
  }
  };

  const handleClose = () => {
    if(del){
      setDel(false);
    }else if(edit){
      setEdit(false);
    }else if(isSelected){
      setIsSelected(false);
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

  const fetchData = async () => {
    await api.get(`/staff/cashier/bills`).then((userData) => {
      setRecords(userData.data);
    });
  };
  const fetchPatients = async () => {
    await api.get(`/patient/all`).then(userData => {
      setPatients(userData.data);
    })
  }

  useEffect(() => {
    fetchData().catch(console.error);
    fetchPatients().catch(console.error);
  }, []);

  const deleteBill = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/staff/cashier/bill/${selectionModel[0]}`).then((userData) => {
        handleClose();
        fetchData().catch(console.error);
        setMessage("Updated Successfully!");
        setSeverity("success");
        showBar();
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
      setMessage("Delete Failed!");
      setSeverity("error");
      showBar();
    }
  };

  const onSubmit = async (data) => {
    data.patient = patient;
    data.debt = debt;
    try {
      await api.put(`/staff/cashier/bill/${selectionModel[0]}`, data).then((userData) => {
              handleClose();
              fetchData().catch(console.error);
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
      <Button onClick={handleClickDelete} startIcon={<DeleteIcon  />}>
        Delete
        </Button>
        <Button onClick={handleClickEdit} startIcon={<EditIcon />}>
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
                  handleClickDelete();
                }}
                rows={records.map((record) => {
                  return {
                    id: record._id,
                    patient: record?.patient?.name,
                    total: `${record.total}€`,
                    paid: `${record.paid}€`,
                    debt: `${record.debt}€`,
                    cancelation_fee: `${record.cancelation_fee}€`,
                    creator: record.creator.name,
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
                    const selectedRowData = records.filter((row) =>
                    selectionSet.has(row._id.toString())
                    );
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
        open={edit}
        keepMounted
        maxWidth="md"
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit Bills"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
            >
             <div>
            <FormControl  sx={{ m: 0, minWidth: 80 }}>
           <Controller
        name="patient"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
       <Autocomplete
             sx={{ mb: 4 }}
              disablePortal
              options={patients.map((option) => option.name)}
              value={patient || ""}
              disabled
              onChange={(event, value) => {
                setPatient(value);
                field.onChange(value);
              }}
             renderInput={(params) => (
              <TextField
              required
              error={!!error}
              helperText={error?.message}
              label="Patient"
              inputRef={ref}
              {...params}
            />
              )}
            />
            )}
          />  
    </FormControl>
    
         <TextField
            label="Total"
            fullWidth
            type="number"
            InputProps={{
              endAdornment:
              '€'
              , inputProps: { min: 0} }}
            maxRows={5}
            required
            InputLabelProps={{ shrink: true }}  
            helperText={
              errors.total?.message
            }
            {...register("total")}
            onChange={e => handleTotal(e)}
            error={errors.total ? true : false}
          />

            <TextField
            label="Paid"
            fullWidth
            type="number"
            maxRows={5}
            required
            InputProps={{
              endAdornment:
              '€'
              , inputProps: { min: 0} }}
            helperText={
              errors.paid?.message
            }
            InputLabelProps={{ shrink: true }}  
            {...register("paid")}
            onChange={e => handleDebt(e)}
            error={errors.paid ? true : false}
          />
           <TextField
            label="Debt"
            fullWidth
            value={debt}
            type="number"
            disabled
            helperText=" "
            InputProps={{
              endAdornment:
              '€'
              }}
            maxRows={5}
            required
          />
         </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit"variant="contained"onClick={handleSubmit(onSubmit)}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={del}
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
          <Button
            onClick={(e) => {
              deleteBill(e, id);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isSelected}
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
