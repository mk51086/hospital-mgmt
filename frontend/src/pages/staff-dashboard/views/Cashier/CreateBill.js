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

export default function CreateBill() {
 
  const [patient, setPatient] = useState("");
  const [paid, setPaid] = useState("");
  const [total, setTotal] = useState("");
  const [debt, setDebt] = useState("");
  const { user } = useAuthContext();
 
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const handleSubmit = async e => {
    e.preventDefault();
 
    const data = { patient,paid,total,debt, creator: user.id };
    try {
       await api.post("/staff/cashier/bill", data).then(userData => {
        setPatient("");
        setPaid(0);
        setTotal(0);
        setDebt(0);
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

  const handleDebt = async (e) => {
    setPaid(e.target.value);
    setDebt(total - e.target.value)
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
            label="Total"
            fullWidth
            type="number"
            value={total}
            onChange={e => setTotal(e.target.value)}
            InputProps={{ inputProps: { min: 0} }}
            helperText=" "
            maxRows={5}
            required
          />
            <TextField
            label="Paid"
            fullWidth
            type="number"
            value={paid}
            InputProps={{ inputProps: { min: 0} }}
            onChange={e => handleDebt(e)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            label="Debt"
            fullWidth
            value={debt}
            type="number"
            disabled
            onChange={e => setDebt(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
         </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Bill
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
