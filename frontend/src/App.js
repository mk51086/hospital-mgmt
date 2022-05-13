import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ThemeProvider } from 'styled-components';


import "./assets/css/styles.css";
import Home from "./pages/home/Home";
import PatientDashboard from "./pages/patient-dashboard/PatientDashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Navbar from "./components/Navbar/Navbar";


const App = () => {

  const { user, authIsReady } = useAuthContext();
  const theme = {
    colors: {
      dark: '#818181',
      nav: '#E9FCFF',
      header: '#ff0000',
      body: '#FDFDFD',
      footer: '#00333',
      main: '#1976d2',
      secondary: '#1FAAFF',
      tertiary: '#989898',
    },
  };
  return (
    
    <div className="App">
      		<ThemeProvider theme={theme}>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />
        
        }  />
   
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

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
           
                <PatientDashboard option={"/view-patients"} />
            }
          />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>

    </div>
  );
};

export default App;
