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
import Typography from '@mui/material/Typography';
import {InputAdornment} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { useForm,Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import Notifybar from "../../../../components/shared/Notifybar";


export default function CreateMedicine() {

  const { user } = useAuthContext();

  const [bar, setBar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(260, "Name must not exceed 260 characters"),
    cost: Yup.number()
      .required("Cost is required")
      .min(0, "Cost must be a positive number")
      .typeError('Cost is required'),
    brand: Yup.object().shape({
      name: 
          Yup.string()
              .required("Brand is required")
    }).typeError("You must specify a brand"),
    description: Yup.string(),
    creator: Yup.string().default(user.id)
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    try {
      api.post("/staff/pharmacist/medicine", data).then((userData) => {
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

  const [medbrands,setMedBrands] = useState([]);
  const fetchMedicineBrands = async () =>{
    api.get('/staff/pharmacist/medicinebrands').then(data =>{
      setMedBrands(data.data);
    })
  }

  useEffect(() => {
    fetchMedicineBrands().catch(console.error);
  }, []);

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
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
        <h2 className="dashboard-title">Add Medicine</h2>
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
             sx={{ mb: 4 }}
            label="Cost"
            fullWidth
            type="number"
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            helperText={
              errors.cost?.message
            }
            {...register("cost")}
            error={errors.cost ? true : false}
          />
           <Controller
        name="brand"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
         <Autocomplete
             sx={{ mb: 4 }}
              disablePortal
              options={medbrands}
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
              label="Brand"
              inputRef={ref}
              {...params}
            />
              )}
            />
            )}
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
