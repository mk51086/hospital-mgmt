import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";

export default function CreateBill() {
 
  const [patient, setPatient] = useState("");
  const [paid, setPaid] = useState("");
  const [total, setTotal] = useState("");
  const [debt, setDebt] = useState("");
  const { user } = useAuthContext();
 
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
        <TextField
            id="outlined-multiline-flexible"
            label="Patient"
            fullWidth
            multiline
            value={patient}
            onChange={e => setPatient(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            id="outlined-multiline-flexible"
            label="Paid"
            fullWidth
            multiline
            value={paid}
            onChange={e => setPaid(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            id="outlined-multiline-flexible"
            label="Total"
            fullWidth
            multiline
            value={total}
            onChange={e => setTotal(e.target.value)}
            helperText=" "
            maxRows={5}
            required
          />
           <TextField
            id="outlined-multiline-flexible"
            label="Debt"
            fullWidth
            multiline
            value={debt}
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
