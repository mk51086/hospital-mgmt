import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function BookAppointment() {
  const { user } = useAuthContext();
  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .required("Date is required")
      .nullable()
      .min(new Date(), "Please choose future date")
      .nullable().transform((curr, orig) => orig === '' ? null : curr)
      .default(undefined),
    description: Yup.string()
      .required("Description is required")
      .min(6, "Description must be at least 6 characters")
      .max(260, "Description must not exceed 260 characters"),
    patient: Yup.string().default(user.id),
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    try {
      api.post("/patient/appointment", data).then((userData) => {
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
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">Book Appointment</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            sx={{ mb: 4 }}
            id="datetime-local"
            fullWidth
            type="datetime-local"
            label="Select Timing"
            maxRows={5}
            helperText={
              errors.date?.message
                ? errors.date?.message
                : "Please select suitable timings"
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("date")}
            error={errors.date ? true : false}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            fullWidth
            multiline
            required
            maxRows={5}
            minRows={4}
            helperText={
              errors.description?.message
                ? errors.description?.message
                : "What is the appointment regarding..."
            }
            {...register("description")}
            error={errors.description ? true : false}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Book
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
