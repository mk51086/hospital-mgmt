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
            <Route path='/patient'>
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
            </Route>
            <Route
              path="/patient/dashboard/add-patient"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "labassistant" && (
                    <StaffDashboard option={"/add-patient"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/view-patients"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-patients"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/add-department"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-department"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/view-staff"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-staff"} />
                )
              }
            />
            
            <Route
              path="/staff/dashboard/messages"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/messages"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/view-departments"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-departments"} />
                )
              }
            />


            <Route path='/staff'>
              <Route path='/staff/dashboard/add-patient' element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-patient"} />
                )
              } />
            </Route>

            <Route path='/staff'>
              <Route path='/staff/dashboard/add-staff' element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-staff"} />
                )
              } />
            </Route>

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

            <Route path='/patient'>
              <Route path='/patient/dashboard/view-appointments' element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/view-appointments"} />
                )
              } />
            </Route>

            <Route path='/patient'>
              <Route exact path='/patient/dashboard/account-settings' element={
                !user ? (
                  <Navigate to="/login" />
                ) : user.isStaff ? (
                  <Navigate to="/staff/dashboard" />
                ) : (
                  <PatientDashboard option={"/account-settings"} />
                )
              } />
            </Route>

            <Route path='/staff'>
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
            </Route>
            <Route
              path="/staff/dashboard/prescriptions"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "doctor" && (
                    <StaffDashboard option={"/prescriptions"} />
                  )
                )
              }
            />

          <Route
              path="/staff/dashboard/addprescription"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "doctor" && (
                    <StaffDashboard option={"/addprescription"} />
                  )
                )
              }
            />

            <Route path='/staff'>
              <Route path='/staff/dashboard/createbill' element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  <StaffDashboard option={"/createbill"} />
                )
              } />
            </Route>

            <Route
              path="/staff/dashboard/bills"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "cashier" && (
                    <StaffDashboard option={"/bills"} />
                  )
                )
              }
            />
            <Route path='/staff'>
            <Route
              path="/staff/dashboard/createappointment"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "receptionist" && (
                    <StaffDashboard option={"/createappointment"} />
                  )
                )
              }
            />
          </Route>
              <Route
              path="/staff/dashboard/appointments"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  (user.jobTitle === "receptionist" || user.jobTitle === "cashier") &&(
                    <StaffDashboard option={"/appointments"} />
                  )
                )
              }
            />

            <Route
              path="/staff/dashboard/rooms"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  (user.jobTitle === "receptionist" || user.jobTitle === "cashier") &&(
                    <StaffDashboard option={"/rooms"} />
                  )
                )
              }
            />
            <Route path="/staff">
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
            </Route>
            
            <Route
              path="/staff/dashboard/tests"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "labassistant" && (
                    <StaffDashboard option={"/tests"} />
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
                    <StaffDashboard option={"/add-test"} />
                  )
                )
              }
            />
            <Route
              path="/staff/dashboard/test-types"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "labassistant" && (
                    <StaffDashboard option={"/test-types"} />
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

          <Route path='/staff'>
            <Route
              path="/staff/dashboard/createmedicinebrand"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "pharmacist" && (
                    <StaffDashboard option={"/createmedicinebrand"} />
                  )
                )
              }
            />
            </Route>

            <Route path='/staff'>
            <Route
              path="/staff/dashboard/createmedicine"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "pharmacist" && (
                    <StaffDashboard option={"/createmedicine"} />
                  )
                )
              }
            />
            </Route>


            <Route
              path="/staff/dashboard/medicines"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "pharmacist" && (
                    <StaffDashboard option={"/medicines"} />
                  )
                )
              }
            />

          <Route path='/staff'>
            <Route
              path="/staff/dashboard/medicinebrands"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/patient/dashboard" />
                ) : (
                  user.jobTitle === "pharmacist" && (
                    <StaffDashboard option={"/medicinebrands"} />
                  )
                )
              }
            />
            </Route>

            {/* Default Route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;