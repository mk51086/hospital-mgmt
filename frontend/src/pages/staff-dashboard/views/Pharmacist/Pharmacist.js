import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function Pharmacist() {
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
        <h2 className="dashboard-title">Appointments</h2>
      </Paper>
    </Grid>
  );
}
