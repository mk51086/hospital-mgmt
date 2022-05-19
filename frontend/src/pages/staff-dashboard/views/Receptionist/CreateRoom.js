import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";


export default function CreateRoom() {
 // const [date, setaDate] = useState(new Date(Date.now()));
 const [number, setNumber] = useState("");
 const [cost, setCost] = useState("");
 const [status, setStatus] = useState("");
 const { user } = useAuthContext();

 const handleSubmit = async e => {
   e.preventDefault();

   const data = { number,cost,status, creator: user.id };
   try {
      await api.post("/staff/receptionist/room", data).then(userData => {
       setNumber("");
       setCost(0);
       setStatus("");
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
       <h2 className="dashboard-title">New Room</h2>
       <Box component="form" onSubmit={handleSubmit}  sx={{
       '& .MuiTextField-root': { m: 1, width: '40ch' },
     }}>
           <div>
       <TextField
           id="outlined-multiline-flexible"
           label="Number"
           fullWidth
           multiline
           value={number}
           onChange={e => setNumber(e.target.value)}
           helperText=" "
           maxRows={5}
           required
         />
          <TextField
           id="outlined-multiline-flexible"
           label="Cost"
           fullWidth
           multiline
           value={cost}
           onChange={e => setCost(e.target.value)}
           helperText=" "
           maxRows={5}
           required
         />
          <TextField
           id="outlined-multiline-flexible"
           label="Status"
           fullWidth
           multiline
           value={status}
           onChange={e => setStatus(e.target.value)}
           helperText=" "
           maxRows={5}
           required
         />
        </div>
         <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
           Add Room
         </Button>
       </Box>
     </Paper>
   </Grid>
 );
}
