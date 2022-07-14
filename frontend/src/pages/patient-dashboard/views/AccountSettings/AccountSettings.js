import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import api from "../../../../api/axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "./../../../../hooks/useAuthContext";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export default function AccountSettings() {
  const { user } = useAuthContext();
  const [value, setValue] = React.useState(0);
  const [alert, setAlert] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("Male");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(name, email, password, age, gender, country, phone);

    const data = { name, email, password, age, gender, address, town, country, phone };
    try {
      await api.put(`/patient/${id}`, data).then(userData => {
        console.log(userData.data);
        setAlertOpen(true);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  const handlePasswordChange = async e => {
    e.preventDefault();
    setAlert(false);
    if (password !== retypePassword) {
      setAlert(true);
      setPassword("");
      setRetypePassword("");
    }
    else{

    const data = { password };
    try {
      await api.put(`/patient/password/${id}`, data).then(userData => {
        console.log(userData.data);
        setPassword("");
        setRetypePassword("");
        setAlertOpen(true);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }}
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const id = user.id;
  const fetchData = async () => {
    await api.get(`/patient/${id}`).then(patientData => {
      setName(patientData.data.name);
      setEmail(patientData.data.email);
      setPhone(patientData.data.phone);
      setAge(patientData.data.age);
      setCountry(patientData.data.country);
      setGender(patientData.data.gender);
      setAddress(patientData.data.address);
      setTown(patientData.data.town);
    })
  }

  useEffect(() => {
    fetchData()
      .catch(console.error);
  },[])


  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">Edit Account</h2>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="User Details" {...a11yProps(0)} />
              <Tab label="Password" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

                <Grid container spacing={2} columnSpacing={2} sx={{ display: "block" }}>

                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <TextField
                      required
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      onChange={e => setName(e.target.value)}
                      value={name}
                      sx={{ marginRight: "20px" }}
                    />

                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <TextField
                      required
                      fullWidth
                      type="text"
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      sx={{ marginRight: "20px" }}
                    />
                    <TextField
                      required
                      fullWidth
                      type="text"
                      id="town"
                      label="Town"
                      name="town"
                      value={town}
                      onChange={e => setTown(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <TextField
                      required
                      fullWidth
                      name="country"
                      label="Country"
                      type="text"
                      id="country"
                      onChange={e => setCountry(e.target.value)}
                      value={country}
                      sx={{ marginRight: "20px" }}
                    />
                    <TextField
                      required
                      fullWidth
                      name="phone"
                      label="Phone"
                      type="text"
                      id="phone"
                      autoComplete="phone"
                      onChange={e => setPhone(e.target.value)}
                      value={phone}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <TextField
                      fullWidth
                      label="Age"
                      onChange={e => setAge(e.target.value)}
                      value={age}
                      sx={{ marginRight: "20px", maxWidth: "254px" }}
                      required
                    />
                    <TextField
                      required
                      fullWidth
                      id="gender"
                      label="Gender"
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                      select
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, width: "250px" }}>
                  Update
                </Button>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={alertOpen}
                  autoHideDuration={6000}
                  onClose={handleAlertClose}
                  message="Details Updated"
                  action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleAlertClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
          {alert ? <Alert severity="error">Passwords do not match!</Alert> : <></> }
            <Box component="form" onSubmit={handlePasswordChange} sx={{ mt: 3 }}>
              <Grid container spacing={2} columnSpacing={2} sx={{ display: "block" }}>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    name="retypePassword"
                    label="Retype New Password"
                    type="password"
                    id="retypePassword"
                    autoComplete="new-retypePassword"
                    onChange={e => setRetypePassword(e.target.value)}
                    value={retypePassword}
                  />
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ ml: 2, mt: 3, mb: 2, width: "250px" }}>
                  Change Password
                </Button>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  open={alertOpen}
                  autoHideDuration={6000}
                  onClose={handleAlertClose}
                  message="Password Changed"
                  action={
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleAlertClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                />
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Paper>
    </Grid>
  );

}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
