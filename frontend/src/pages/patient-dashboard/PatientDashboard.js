import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from '@mui/icons-material/Menu';
import Copyright from "../../components/Copyright/Copyright";
import { useNavigate } from "react-router-dom";

import PatientRoutes from "./routes/PatientRoutes";

import AppointmentList from "./views/PatientList/PatientList";
import Profile from "./views/Profile/Profile";
import AddPatient from "./views/AddPatient/AddPatient";
import BookAppointment from "./views/BookAppointment/BookAppointment";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const [option, setOption] = React.useState(props.option);
  const handleRouteChange = view => {
    setOption(view);
    navigate("/patient/dashboard" + view);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <PatientRoutes handleRouteChange={handleRouteChange} />
        </Drawer>

        <Box
          style={{ height: "calc(100vh - 6rem)" }}
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {option === "" && <Profile />}
              {option === "/add-patient" && <AddPatient />}
              {option === "/view-patients" && <AppointmentList />}
              {option === "/book-appointment" && <BookAppointment />}
            </Grid>
            <Copyright sx={{ pt: 4 }} text={"Hospital Management System"} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function PatientDashboard(props) {
  return <DashboardContent option={props.option} />;
}
