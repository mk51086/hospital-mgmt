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

const room_types = [
  {label:'Premium',value:'premium'},
  {label:'Standard',value:'standard'},
  ]

const room_status = [
  {label:'Available',value:'available'},
  {label:'Not available',value:'notavailable'},
]

export default function CreateRoom() {
  const [records, setRecords] = useState([]);
  const { user } = useAuthContext();
  const [status,setStatus] = useState("");
  const [type,setType] = useState("");

  const validationSchema = Yup.object().shape({
    number: Yup.string()
      .required("number is required")
      .min(2, "number must be at least 2 characters")
      .max(260, "number must not exceed 260 characters"),
    floor: Yup.number()
    .required("floor is required")
    .min(0, "floor must be a positive number")
    .max(260, "floor must not exceed 260"),
    type: Yup.object().shape({
        value: 
            Yup.string()
               .required("type is required")
      }).typeError("You must specify a type"),
    status: Yup.object().shape({
      value: 
          Yup.string()
             .required("status is required")
    }).typeError("You must specify a status"),
    description: Yup.string()
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

  const onSubmit =  (data) => {
        console.log(data)
        data.creator = user.id;
        data.type = type;
        data.status = status;
        try {
         api.post("/staff/receptionist/room", data).then(userData => {
           console.log(userData);
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
        <h2 className="dashboard-title">New Room</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormControl  sx={{ mr:5, minWidth: 450 }}>
            <TextField
                sx={{ mb: 4 }}
                fullWidth
                label="Number"
                maxRows={5}
                helperText={
                  errors.number?.message
                }
                required
                {...register("number")}
                InputLabelProps={{
                  shrink: true,
                }}
                error={errors.number ? true : false}
              />
            </FormControl>
            <FormControl  sx={{ mr:5, minWidth: 320 }}>
            <TextField
                sx={{ mb: 4 }}
                fullWidth
                label="Floor"
                type="number"
                maxRows={5}
                helperText={
                  errors.floor?.message
                }
                required
                {...register("floor")}
                error={errors.floor ? true : false}
              />
            </FormControl>
            <FormControl  sx={{ mr:5, minWidth: 450 }}>
                  <Controller
                name="type"
                control={control}
                defaultValue={[]}
                render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <Autocomplete
                    sx={{ mb: 4 }}
                      disablePortal
                      options={room_types}
                      getOptionDisabled={(option) => option.disabled}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, value) => {
                        setType(value.value);
                        field.onChange(value);
                      }}
                    renderInput={(params) => (
                      <TextField
                      required
                      error={!!error}
                      helperText={error?.message}
                      label="Room type"
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
                name="status"
                control={control}
                defaultValue={[]}
                render={({ field: { ref, ...field }, fieldState: { error } }) => (
              <Autocomplete
                    sx={{ mb: 4 }}
                      disablePortal
                      options={room_status}
                      getOptionDisabled={(option) => option.disabled}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, value) => {
                        setStatus(value.value);
                        field.onChange(value);
                      }}
                    renderInput={(params) => (
                      <TextField
                      required
                      error={!!error}
                      helperText={error?.message}
                      label="Status"
                      inputRef={ref}
                      {...params}
                    />
                      )}
                    />
                    )}
                  />  
            </FormControl>
          <TextField
            label="Description"
            fullWidth
            multiline
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
