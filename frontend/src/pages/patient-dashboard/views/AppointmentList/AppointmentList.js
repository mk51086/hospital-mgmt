import Grid from "@mui/material/Grid";
import * as React from 'react';
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid,GridToolbarQuickFilter,gridClasses   } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import Notifybar from "../../../../components/shared/Notifybar";
import CancelIcon from '@mui/icons-material/Cancel';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../../hooks/useAuthContext";
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
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize,setPageSize] = useState(25);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [ id ,setId] = useState('');
  const [bar, setBar] = useState(false);

    const fetchData = async () => {
    await api.get(`/patient/appointment/${user.id}`).then(userData => {
    setRecords(userData.data);
   
})}

const columns = [
  { field: "id", headerName: "ID", minWidth: 190, flex:1 },
  { field: "description", headerName: "Description", width: 120 },
  { field: "date", headerName: "Date", width: 200 },
  { field: "doctor", headerName: "Doctor", minWidth: 120, flex:1 },
  { field: "room", headerName: "Room", width: 70},
  { field: "status", headerName: "Status", minWidth: 120, flex:1},
];

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  const handleClose = () => {
    if(open){
      setOpen(false);
    }
    if(selectionModel[0] !== undefined || selectionModel !== null){
      setSelectionModel([]);
    }
  };

  const handleClickOpen = (e,id) => {
    setId(id);
    setOpen(true);
  };


  const cancelAppointment = async (e) => {
    const selectedRowData = records.filter((row) =>
    selectionModel[0]===row._id.toString());
    console.log(selectionModel)
    console.log(selectedRowData[0])
    e.preventDefault();
    if(selectedRowData[0].status==='Canceled'){
      setOpen(false);
      setMessage("Failed. Appointment has already been canceled!");
        setSeverity("error");
        showBar();
    }else{
      try {
        await api.put(`/patient/appointment/cancel/${selectionModel[0]}`).then(userData => {
          handleClose();
          fetchData()
          .catch(console.error);
          setMessage("Cancelled Successfully!");
          setSeverity("success");
          showBar();
        });
      } catch (err) {
        setMessage("Failed. Could not cancel!");
        setSeverity("error");
        showBar();
        console.log(`Error : ${err.message}`);
      }
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
        {(selectionModel[0] != null ) && 
        <Button onClick={handleClickOpen} startIcon={<CancelIcon />}>
          Cancel
        </Button>
        }
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
                  handleClickOpen();
                }}
                rows={records.map((record) => {
                  return {
                    id: record._id,
                    description: record.description,
                    date: record.date,
                    doctor: record.doctor?.name || 'TBD',
                    room: record?.room || 'TBD',
                    status: record.status,
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
                    setAppointment(selectedRowData)
                    console.log(selectedRowData)
                    setSelectionModel(result);
                    console.log(result)
                  } else {
                    setSelectionModel(selection);
                  }
                }}
          />
            </div>
      </Paper>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cancel Appointment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to cancel this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={(e) => {  cancelAppointment(e) }}>YES</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
          >
        <DialogTitle>
          <Grid container direction="row" justify="space-between" alignItems="center">
            Appointment already canceled
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          This appointment has already been cancelled.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Notifybar
          open={bar}
          onClose={hideBar}
          severity={severity}
          message={message}
        />
    </Grid>
    
  );
}
