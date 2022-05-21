import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ThemeProvider } from "styled-components";

import "./assets/css/styles.css";
import Home from "./pages/home/Home";
import PatientDashboard from "./pages/patient-dashboard/PatientDashboard";
import StaffDashboard from "./pages/staff-dashboard/StaffDashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  const theme = {
    colors: {
      dark: "#818181",
      nav: "#E9FCFF",
      header: "#ff0000",
      body: "#FDFDFD",
      footer: "#00333",
      main: "#1976d2",
      secondary: "#1FAAFF",
      tertiary: "#989898",
    },
  };
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />

            {/* Patient Dashboard */}
            <Route
              path="/patient/dashboard"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={""} />
                )
              }
            />
            <Route
              path="/patient/dashboard/add-patient"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/add-patient"} />
                )
              }
            />
            <Route
              path="/patient/dashboard/view-patients"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/view-patients"} />
                )
              }
            />

            <Route
              path="/patient/dashboard/book-appointment"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/book-appointment"} />
                )
              }
            />

            <Route
              path="/patient/dashboard/view-appointments"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/view-appointments"} />
                )
              }
            />

            <Route
              path="/staff/dashboard"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={""} />
                )
              }
            />
            <Route
              path="/staff/dashboard/doctor"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "doctor" && (
                    <StaffDashboard option={"/doctor"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/createbill"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "cashier" && (
                    <StaffDashboard option={"/createbill"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/createroom"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "receptionist" && (
                    <StaffDashboard option={"/createroom"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/tests"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "labassistant" && (
                    <StaffDashboard option={"/labassistant"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/add-test"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "labassistant" && (
                    <StaffDashboard option={"/labassistant"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/createexaminations"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "nurse" && (
                    <StaffDashboard option={"/createexaminations"} />
                  )
                )
              }
            />

            <Route
              path="/staff/dashboard/view-examinations"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "nurse" && (
                    <StaffDashboard option={"/view-examinations"} />
                  )
                )
              }
            />

            <Route
              path="/staff/dashboard/pharmacist"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "pharmacist" && (
                    <StaffDashboard option={"/pharmacist"} />
                  )
                )
              }
            />
            {/* Default Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
