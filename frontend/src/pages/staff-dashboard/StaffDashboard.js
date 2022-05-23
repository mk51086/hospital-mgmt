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
import MenuIcon from "@mui/icons-material/Menu";
import Copyright from "../../components/Copyright/Copyright";
import { useNavigate } from "react-router-dom";
import StaffRoutes from "./routes/staff.route";

//views
import CreateBill from "./views/Cashier/CreateBill";
import Doctor from "./views/Doctor/Doctor";
import Nurse from "./views/Nurse/Nurse";
import ExaminationList from "./views/Nurse/ExaminationList";
import Profile from "./views/Profile/Profile";
import CreateRoom from "./views/Receptionist/CreateRoom";
import Pharmacist from "./views/Pharmacist/Pharmacist";
import { useAuthContext } from "./../../hooks/useAuthContext";
import AddTest from "./views/LabAssistant/AddTest";
import Tests from "./views/LabAssistant/TestsList";
import AddPatient from "./views/Admin/AddPatient/AddPatient";
import PatientList from "./views/Admin/PatientList/PatientList";
import AddStaff from "./views/Admin/AddStaff/AddStaff";
import StaffList from "./views/Admin/StaffList/StaffList";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [option, setOption] = React.useState(props.option);

  const handleRouteChange = (view) => {
    setOption(view);
    navigate("/staff/dashboard" + view);
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
          <StaffRoutes handleRouteChange={handleRouteChange} />
        </Drawer>

        <Box
          style={{ height: "calc(100vh - 6rem)" }}
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {option === "" && <Profile />}
              {user.admin && option === "/add-patient" && <AddPatient />}
              {user.admin && option === "/add-staff" && <AddStaff />}
              {user.admin && option === "/view-patients" && <PatientList />}
              {user.admin && option === "/view-staff" && <StaffList />}
              {user.jobTitle === "doctor" && option === "/doctor" && <Doctor />}
              {user.jobTitle === "cashier" && option === "/createbill" && (
                <CreateBill />
              )}
              {user.jobTitle === "receptionist" && option === "/createroom" && (
                <CreateRoom />
              )}
               {user.jobTitle === "labassistant" && option === "/add-test" && <AddTest />}
              {user.jobTitle === "labassistant" && option === "/tests" && <Tests />}
              {user.jobTitle === "nurse" && option === "/view-examinations" && (
                <ExaminationList />
              )}
              {user.jobTitle === "nurse" &&
                option === "/createexaminations" && <Nurse />}
              {user.jobTitle === "pharmacist" && option === "/pharmacist" && (
                <Pharmacist />
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} text={"Hospital Management System"} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StaffDashboard(props) {
  return <DashboardContent option={props.option} />;
}
