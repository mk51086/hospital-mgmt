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
import { useState, useEffect } from "react";
import { Autocomplete } from "@mui/material";

/*
 patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    doctor: req.body.doctor,
    room: req.body.room,
*/

export default function CreateAppointment() {
  const [records, setRecords] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    fetchData().catch(console.error);
    fetchDoctors().catch(console.error);
  }, []);

  const fetchData = async () => {
    await api.get(`/patient/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  const fetchDoctors = async () => {
    await api.get(`/staff/doctors/all`).then((userData) => {
      setDoctors(userData.data);
    });
  };

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
    patient: Yup.string().required("Patient is required"),
    doctor: Yup.string().required("Doctor is required")
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
      data.patient = patient._id;
      data.doctor = doctor._id;
      console.log(doctor)
      console.log(patient)
        console.log(data)
    try {
      api.post("/staff/receptionist/appointment", data).then((userData) => {
        reset();
        setDoctor("");
        setPatient("");
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
        <Autocomplete
             sx={{ mb: 4 }}
              disablePortal
              options={records}
              value={patient}
              getOptionLabel={(records) => records.name || ""}
              onChange={(event, newValue) => {
                setPatient(newValue);
              }}
             renderInput={(params) => (
                <TextField {...params} label="Patient" helperText={
                    errors.patient?.message
                      ? errors.patient?.message
                      : "Please select a patient"
                  }
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("patient")}
                  error={errors.patient ? true : false} />
              )}
            />
            <Autocomplete
             sx={{ mb: 4 }}
              disablePortal
              options={doctors}
              value={doctor}
              getOptionLabel={(doctors) => doctors.name || ""}
              onChange={(event, newValue) => {
                setDoctor(newValue);
              }}
             renderInput={(params) => (
                <TextField {...params} label="Doctor" helperText={
                    errors.doctor?.message
                      ? errors.doctor?.message
                      : "Please select a doctor"
                  }
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("doctor")}
                  error={errors.doctor ? true : false} />
              )}
              
            />
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
            Create
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
