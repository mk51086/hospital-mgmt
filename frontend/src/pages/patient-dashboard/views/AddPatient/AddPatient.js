import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      age,
      gender,
      address,
      phone,
      password,
      id: user.id,
    };
    try {
      await api.post("/patient/register", data).then((userData) => {
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Name"
              fullWidth
              multiline
              value={name}
              onChange={(e) => setName(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Email"
              fullWidth
              multiline
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Age"
              fullWidth
              multiline
              value={age}
              onChange={(e) => setAge(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Gender"
              fullWidth
              multiline
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              fullWidth
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Phone"
              fullWidth
              multiline
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Password"
              fullWidth
              multiline
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText=" "
              maxRows={5}
              required
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
