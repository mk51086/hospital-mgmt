import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { Autocomplete } from "@mui/material";
import { useEffect } from "react";

export default function CreatePrescription() {
   const { user } = useAuthContext();

  const [patient, setPatient] = useState("");
 
  const [dose, setDose] = useState("");
  const [medicine, setMedicine] = useState("");
  const [doctor, setDoctor] = useState("");
 
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
 
    const data = { patient,dose,medicine, creator: user.id };
    try {
       await api.post("/staff/doctor/prescription", data).then(userData => {
        setPatient("");
        setPatient("");
        setDoctor("");
        setDose("");
        setMedicine("");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  const fetchData = async () => {
    await api.get(`/patient/all`).then(userData => {
      setRecords(userData.data);
    })
  }


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
        <h2 className="dashboard-title">New Bill</h2>
        <Box component="form" onSubmit={handleSubmit}  sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}>
            <div>
        <Autocomplete
                disablePortal
                options={records}
                value={patient}
                getOptionLabel={ records => (records.name) || ""}
                onChange={(event, newValue) => {
                  setPatient(newValue);
                }}
                
                renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Patient"
                      required
                  />
              )}
              />
         
            <TextField
            label="Medicine"
            fullWidth
            value={medicine}
            InputProps={{ inputProps: { min: 0} }}
            helperText=" "
            maxRows={5}
            onChange={(e) => setMedicine(e.target.value)}
            required
          />
           <TextField
            label="Dose"
            fullWidth
            value={dose}
            helperText=" "
            maxRows={5}
            onChange={(e) => setDose(e.target.value)}
            required
          />
         </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Prescription
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
