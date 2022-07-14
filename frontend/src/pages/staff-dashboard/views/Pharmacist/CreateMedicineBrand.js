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
import Typography from '@mui/material/Typography';
import Notifybar from "../../../../components/shared/Notifybar";
import { useState } from "react";


export default function CreateMedicineBrand() {

  const { user } = useAuthContext();
  const [bar, setBar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");


  
  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(260, "Name must not exceed 260 characters"),
    description: Yup.string(),
    creator: Yup.string().default(user.id)
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
    try {
      api.post("/staff/pharmacist/medicinebrand", data).then((userData) => {
        console.log(userData.data)
        reset();
        setMessage("Added Successfully!");
        setSeverity("success");
        showBar();
      });
    } catch (err) {
      setMessage("Failed. Could not add!");
      setSeverity("error");
      showBar();
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
        <h2 className="dashboard-title">Add Medicine Brand</h2>
        <Typography variant="caption" display="block" gutterBottom>
       Fields marked with * are required
      </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
        sx={{ mb: 4 }}
            label="Name"
            fullWidth
            multiline
            required
            maxRows={5}
            helperText={
              errors.name?.message
            }
            {...register("name")}
            error={errors.name ? true : false}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            maxRows={5}
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
      <Notifybar
          open={bar}
          onClose={hideBar}
          severity={severity}
          message={message}
        />
    </Grid>
  );
}
