import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import api from "../../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import theme from "../../../assets/js/theme";
import colors from "../../../assets/js/colors";
import Copyright from "../../Copyright/Copyright";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Slide from "@mui/material/Slide";
import FormControl from "@mui/material/FormControl";
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const clientId = "797434829804-na3mfjbrf9qir88tepbhputbk66rh3cl.apps.googleusercontent.com";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function LoginForm({ isPatient, handleSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login_user } = useAuthContext();
  const [loading, setLoading] = useState('Loading...');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [name,setName] = useState("");
  const [newAccount,setNewAccount] = useState(false);
  const [gender, setGender] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
    .required("name is required").typeError("You must specify a name"),
    email: Yup.string()
    .required("email is required")
    .min(8, "email must be at least 8 characters long")
    .typeError('email is required'),
    password: Yup.string()
    .required("password is required")
    .min(8, "password must be at least 8 characters")
    .typeError('password is required'),
    gender: Yup.string()
    .required("gender is required")
    .typeError('gender is required'),
    address: Yup.string()
    .required("address is required")
    .min(8, "address must be at least 8 characters")
    .typeError('address is required'),
    image: Yup.string()
  });
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);


  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const handleLoginSuccess = async (response) => {
    console.log(response.profileObj)
    setValue('name',response.profileObj.name);
    setValue('email',response.profileObj.email);
    setValue('image',response.profileObj.imageUrl);
    setLoading();
    try {
      await api.post('/patient/googleauth', response).then(userData => {
        console.log(userData)
        if (userData.data.msg === "patient does not exist") {
          console.log('true');
          setNewAccount(true);
        } else {
          login_user(userData.data);
          console.log('false');
        }
    });
  } catch (err) {
    console.log(`Error : ${err.message}`);
  }
  }

  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }

  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser(null);
  }

  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }



  const handleAutoLoadFinished = () => {
    setLoading();
  }

  const handleLogin = async e => {
    e.preventDefault();
    console.log(email, password);
    const route = isPatient ? "/patient/login" : "/staff/login";
    const data = { email, password };
    try {
        await api.post(route, data).then(userData => {
        console.log(userData.data);
        login_user(userData.data);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClose = ()=>{
    setNewAccount(false);
  }

  const handleChange = async (event) => {
    setGender(event.target.value);
    await trigger(['gender']);
  };

  const onSubmit = async (data) => {
    console.log(data)
    try {
         await api.post("/patient/register", data).then(userData => {
        console.log(userData.data);
        login_user(userData.data);
        // navigate("/login");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {isPatient ? "Patient Login" : "Staff Login"}
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Log In
            </Button>
            {isPatient &&
            <div>
            {user ? <div>
              <div className="name">Welcome {user.name}!</div>
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={handleLogoutSuccess}
                onFailure={handleLogoutFailure}
              />
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div> :
              <GoogleLogin
               onRequest={(e) => {
                loading &&
                e.preventDefault()
               }}
                clientId={clientId}
                buttonText={loading}
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                onAutoLoadFinished={handleAutoLoadFinished}
              />
              }
          </div>
            }
        
            <Button
              style={{ backgroundColor: colors.accentBlue, color: "black" }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSwitch}
            >
              Switch to {isPatient ? "Staff Login" : "Patient Login"}
            </Button>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={newAccount}
        keepMounted
        maxWidth="md"
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Google Signup"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
            It looks like you don't have an account, please fill the information below in order to create one.
          </DialogContentText>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
            >
             <div>
         <TextField
            label="Name"
            fullWidth
            type="text"
            maxRows={5}
            required
            InputLabelProps={{ shrink: true }}  
            helperText={
              errors.name?.message
            }
            onChange={e => setName(e.target.value)}
            {...register("name")}
            error={errors.name ? true : false}
          />
        <TextField
            label="Email"
            fullWidth
            type="text"
            maxRows={5}
            required
            disabled
            InputLabelProps={{ shrink: true }}  
            helperText={
              errors.email?.message
            }
            onChange={e => setName(e.target.value)}
            {...register("email")}
            error={errors.email ? true : false}
          />
             <TextField
            label="Password"
            fullWidth
            type="password"
            maxRows={5}
            required
            InputLabelProps={{ shrink: true }}  
            helperText={
              errors.password?.message
            }
            onChange={e => setName(e.target.value)}
            {...register("password")}
            error={errors.password ? true : false}
          />
           <FormControl  sx={{ m: 1, minWidth: 140 }}>
         <InputLabel id="gender">Gender</InputLabel>
         <Select
          labelId="gender"
          id="gender"
          label="Gender"
          required
          defaultValue={'Male'}
          onChange={handleChange}
          {...register("gender")}
          error={errors.gender ? true : false}
          >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <FormHelperText>{errors.gender?.message}</FormHelperText>
          </Select>
          </FormControl>
             <TextField
            label="Address"
            fullWidth
            type="text"
            maxRows={5}
            required
            InputLabelProps={{ shrink: true }}  
            helperText={
              errors.address?.message
            }
            onChange={e => setName(e.target.value)}
            {...register("address")}
            error={errors.address ? true : false}
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
    </ThemeProvider>
  );
}
