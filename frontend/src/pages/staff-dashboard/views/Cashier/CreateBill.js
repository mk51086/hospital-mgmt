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
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from '@mui/material/FormControl';

import * as Yup from "yup";
export default function CreateBill() {
  const [patient, setPatient] = useState("");
  const [paid, setPaid] = useState("");
  const [total, setTotal] = useState("");
  const [debt, setDebt] = useState("");
  const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  const validationSchema = Yup.object().shape({
    patient: Yup.object().shape({
      name: 
          Yup.string()
             .required("Patient is required")
    }).typeError("You must specify a patient"),
    total: Yup.number()
      .required("Total is required")
      .min(0, "Total must be a positive number")
      .typeError('Total is required'),
    paid: Yup.number()
    .required("Paid is required")
    .min(0, "Paid must be a positive number")
    .typeError('Paid is required'),
  });

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])


  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = (data) => {
    data.debt = debt;
    data.creator = user.id;
    try {
      api.post("/staff/cashier/bill", data).then((userData) => {
        reset();
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

  const handleTotal = (e)=>{
      setTotal(e.target.value);
      setDebt(e.target.value-paid);
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
        <Box component="form"  sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}>
            <div>
            <FormControl  sx={{ m: 0, minWidth: 80 }}>
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
    
         <TextField
            label="Total"
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 0} }}
            maxRows={5}
            required
            helperText={
              errors.total?.message
            }
            {...register("total")}
            onChange={e => handleTotal(e)}
            error={errors.total ? true : false}
          />

            <TextField
            label="Paid"
            fullWidth
            type="number"
            InputProps={{
              endAdornment:
              '€'
              , inputProps: { min: 0} }}
            maxRows={5}
            required
            helperText={
              errors.paid?.message
            }
            {...register("paid")}
            onChange={e => handleDebt(e)}
            error={errors.paid ? true : false}
          />
           <TextField
            label="Debt"
            fullWidth
            value={debt}
            type="number"
            disabled
            helperText=" "
            InputProps={{
              endAdornment:
              '€'
              }}
            maxRows={5}
            required
          />
         </div>
          <Button onClick={handleSubmit(onSubmit)}  variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Bill
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
