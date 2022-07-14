import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { Autocomplete } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useForm,Controller } from "react-hook-form";

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
    patient: Yup.object().shape({
        name: 
            Yup.string()
               .required("patient is required")
      }).typeError("You must specify a patient"),
    doctor: Yup.object().shape({
      name: 
          Yup.string()
             .required("Doctor is required")
    }).typeError("You must specify a doctor")
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
        console.log(data)
    try {
      api.post("/staff/receptionist/appointment", data).then((userData) => {
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
        <h2 className="dashboard-title">New Appointment</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormControl  sx={{ mr:5, minWidth: 450 }}>
                  <Controller
                name="patient"
                control={control}
                defaultValue={[]}
                render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <Autocomplete
                    sx={{ mb: 4 }}
                      disablePortal
                      options={records}
                      getOptionDisabled={(option) => option.disabled}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        field.onChange(value);
                      }}
                    renderInput={(params) => (
                      <TextField
                      required
                      error={!!error}
                      helperText={error?.message}
                      label="Patient"
                      inputRef={ref}
                      {...params}
                    />
                      )}
                    />
                    )}
                  />  
            </FormControl>
            <FormControl  sx={{ mr:5, minWidth: 450 }}>
                  <Controller
                name="doctor"
                control={control}
                defaultValue={[]}
                render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <Autocomplete
                    sx={{ mb: 4 }}
                      disablePortal
                      options={doctors}
                      getOptionDisabled={(option) => option.disabled}
                      getOptionLabel={(option) => option.name}
                      onChange={(event, value) => {
                        field.onChange(value);
                      }}
                    renderInput={(params) => (
                      <TextField
                      required
                      error={!!error}
                      helperText={error?.message}
                      label="Doctor"
                      inputRef={ref}
                      {...params}
                    />
                      )}
                    />
                    )}
                  />  
            </FormControl>
          <TextField
            sx={{ mb: 4 }}
            id="datetime-local"
            fullWidth
            type="datetime-local"
            label="Select Timing"
            maxRows={5}
            helperText={
              errors.date?.message
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
