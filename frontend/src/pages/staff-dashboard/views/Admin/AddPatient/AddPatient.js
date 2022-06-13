import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormHelperText from '@mui/material/FormHelperText';

export default function AddPatient() {
  const [gender, setGender] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email."),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be a positive number")
      .max(120, "Age must not exceed 120")
      .typeError('You must specify a number'),
    gender: Yup.string()
      .required("Gender is required"),
    address: Yup.string()
      .required("Address is required")
      .min(6, "Address must be at least 6 characters")
      .max(77, "Address must not exceed 77 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .min(6, "Phone must be at least 6 characters")
      .max(30, "Phone must not exceed 30 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(260, "Password must not exceed 260 characters"),
   
  });

  const handleChange = async (event) => {
    setGender(event.target.value);
    await trigger(['gender']);
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = (data) => {
    console.log(data)
    try {
      api.post("/patient/register", data).then((userData) => {
        reset();
      });
      
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        className="title"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">New Patient</h2>
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
            label="Email"
            fullWidth
            multiline
            maxRows={5}
            helperText={errors.email?.message}
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("email")}
            error={errors.email ? true : false}
          />
        <FormControl  sx={{ m: 0, minWidth: 140 }}>
       <TextField
            label="Age"
            multiline
            helperText={
              errors.age?.message
                ? errors.age?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("age")}
            error={errors.age ? true : false}
          />
          </FormControl>
          
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
            multiline
            style = {{width: 205}} 
            helperText={errors.address?.message}
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("address")}
            error={errors.address ? true : false}
          />
      
              <TextField
            label="Phone"
            fullWidth
            multiline
            maxRows={5}
            helperText={errors.phone?.message}
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("phone")}
            error={errors.phone ? true : false}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            helperText={errors.password?.message}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("password")}
            error={errors.password ? true : false}
          />
        
              </div>
          <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Patient
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
