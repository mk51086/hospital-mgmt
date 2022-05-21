import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function AddPatient() {
  // const [date, setaDate] = useState(new Date(Date.now()));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const data = { name,email,age,gender,address,phone,password, id: user.id };
    try {
       await api.post("/patient/register", data).then(userData => {
        setPassword("");
        setName("");
        setEmail("");
        setAge("");
        setGender("");
        setAddress("");
        setPhone("");
        console.log(userData);
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
            value={name}
            onChange={e => setName(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            label="Email"
            fullWidth
            multiline
            value={email}
            onChange={e => setEmail(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            label="Age"
            multiline
            value={age}
            onChange={e => setAge(e.target.value)}
            helperText=" "
            maxRows={2}
            required
          />
           {/* <TextField
            label="Gender"
            fullWidth
            multiline
            value={gender}
            onChange={e => setGender(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          /> */}

         <FormControl  sx={{ m: 1, minWidth: 120 }}>
         <InputLabel id="gender">Gender</InputLabel>
         <Select
          labelId="gender"
          id="gender"
          value={gender}
          label="Gender"
          required
          onChange={handleChange}
          >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          </Select>
          </FormControl>
          <TextField
            label="Address"
            fullWidth
            multiline
            value={address}
            onChange={e => setAddress(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
              <TextField
            label="Phone"
            fullWidth
            multiline
            value={phone}
            onChange={e => setPhone(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
              </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Patient
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
