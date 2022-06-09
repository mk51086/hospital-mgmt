import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState,useEffect } from "react";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import {useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { educationList } from "../../../../../components/shared/educationList";
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormHelperText from '@mui/material/FormHelperText';
export default function AddStaff() {
  // const [date, setaDate] = useState(new Date(Date.now()));
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  // const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [password, setPassword] = useState("");
  const [department,setDepartment] = useState('');
  const [education,setEducation] = useState([]);
  // const [job_title,setjob_title] = useState('');
  const [admin,setAdmin] = useState(false);
  // const { user } = useAuthContext();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email."),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be a positive number")
      .max(120, "Age must not exceed 120")
      .typeError('You must specify a number'),
    gender: Yup.string()
      .required("Gender is required"),
    address: Yup.string()
      .required("Address is required")
      .min(6, "Address must be at least 6 characters")
      .max(77, "Address must not exceed 77 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .min(6, "Phone must be at least 6 characters")
      .max(30, "Phone must not exceed 30 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(260, "Password must not exceed 260 characters"),
    department: Yup.object().shape({
        departmentName: 
            Yup.string()
               .required("Department is required")
      }).typeError("You must specify a department"),
    job_title: Yup.string()
      .required("Job title is required")
      .min(3, "Job title must be at least 3 characters")
      .max(30, "Job title must not exceed 30 characters"),
    admin: Yup.string().required('Admin is a required field'),
    education: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string(),
        label: Yup.string()
      })
    )
    .min(1, "Education is required")
  });

  const navigate = useNavigate();
  
  useEffect(() => {
    fetchDepartments().catch(console.error);
  }, []);

  const handleChange = async (event) => {
    setGender(event.target.value);
    await trigger(['gender']);
  };

  const handleAdminChange = async (event) => {
    setAdmin(event.target.value);
    await trigger(['admin']);
  };
  const [departments,setDepartments] = useState([]);
  const fetchDepartments = async () =>{
    api.get('/staff/department/all').then(data =>{
      setDepartments(data.data);
    })
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    data.education=education;
    console.log(data)
    try {
      api.post("/staff/register", data).then((userData) => {
        reset();
        setEducation("");
        setDepartment("");
      });
      
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   const data = { name,email,age,gender,address,phone,password,education,department,job_title,admin, id: user.id };
  //   try {
  //      await api.post("/staff/register", data).then(userData => {
  //       setPassword("");
  //       setName("");
  //       setEmail("");
  //       setAge("");
  //       setGender("");
  //       setAddress("");
  //       setPhone("");
  //       setDepartment("");
  //       setEducation([]);
  //       setjob_title('');
  //       setAdmin(false);
  //       console.log(userData);
  //     });
  //   } catch (err) {
  //     console.log(`Error : ${err.message}`);
  //   }
  // };

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
        <h2 className="dashboard-title">New Staff</h2>
        <Box component="form" onSubmit={handleSubmit}  sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}>
            <div>
        <TextField
            label="Name"
            fullWidth
            multiline
            maxRows={5}
            helperText={
              errors.name?.message
                ? errors.name?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("name")}
            error={errors.name ? true : false}
          />
           <TextField
            label="Email"
            fullWidth
            multiline
            maxRows={5}
            helperText={
              errors.email?.message
                ? errors.email?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("email")}
            error={errors.email ? true : false}
          />
           <TextField
            label="Age"
            multiline
            maxRows={2}
            helperText={
              errors.age?.message
                ? errors.age?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("age")}
            error={errors.age ? true : false}
          />
             <TextField
            label="Address"
            fullWidth
            multiline
            maxRows={5}
            helperText={
              errors.address?.message
                ? errors.address?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("address")}
            error={errors.address ? true : false}
          />
      
              <TextField
            label="Phone"
            fullWidth
            multiline
            maxRows={5}
            helperText={
              errors.phone?.message
                ? errors.phone?.message
                : ""
            }
            required
            InputLabelProps={{
              shrink: true,
            }}
            {...register("phone")}
            error={errors.phone ? true : false}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            helperText={
              errors.password?.message
                ? errors.password?.message
                : ""
            }
            InputLabelProps={{
              shrink: true,
            }}
            {...register("password")}
            error={errors.password ? true : false}
          />
          {/* <TextField
            required
            fullWidth
            name="department"
            label="Department"
            id="department"
            helperText={
              errors.department?.message
                ? errors.department?.message
                : ""
            }
            InputLabelProps={{
              shrink: true,
            }}
            {...register("department")}
            error={errors.department ? true : false}
          /> */}

  <FormControl  sx={{ m: 0, minWidth: 80 }}>
           <Controller
        name="department"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
       <Autocomplete
             sx={{ mb: 4 }}
              disablePortal
              options={departments}
              getOptionDisabled={(option) => option.disabled}
              getOptionLabel={(option) => option.departmentName}
              onChange={(event, value) => {
                field.onChange(value);
              }}
             renderInput={(params) => (
              <TextField
              required
              error={!!error}
              helperText={error?.message}
              label="Department"
              inputRef={ref}
              {...params}
            />
              )}
            />
            )}
          />  
    </FormControl>


{/* <FormControl  sx={{ m: 0, minWidth: 80 }}>
      <Controller
        name="department"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            disablePortal
            options={departments.map((option) => option.departmentName)}
            onChange={(event, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={!!error}
                helperText={error?.message}
                label="Department"
                inputRef={ref}
                {...params}
              />
            )}
          />
        )}
      /> 

      </FormControl> */}

    <FormControl  sx={{ m: 0, minWidth: 80 }}>
      <Controller
        name="education"
        control={control}
        defaultValue={[]}
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            disableClearable
            disablePortal
            filterSelectedOptions
            multiple
            options={educationList}
            getOptionDisabled={(option) => option.disabled}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => {
              let v2 = [];
              for(let v of value){
                v2.push(v['label']);
              }
              setEducation(v2);
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={!!error}
                helperText={error?.message}
                label="Education"
                inputRef={ref}
                {...params}
              />
            )}
          />
        )}
      /> 
      </FormControl>
          <TextField
            required
            fullWidth
            name="job_title"
            label="Job title"
            type="job_title"
            id="job_title"
            helperText={errors.job_title?.message}
            InputLabelProps={{
              shrink: true,
            }}
            {...register("job_title")}
            error={errors.job_title ? true : false}
          />
             <FormControl  sx={{ m: 1, minWidth: 140 }}>
         <InputLabel id="gender">Gender</InputLabel>
         <Select
          labelId="gender"
          id="gender"
          label="Gender"
          required
          defaultValue={'Male'}
          onChange={handleChange}
          {...register("gender")}
          error={errors.gender ? true : false}
          >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
          <FormHelperText>{
              errors.gender?.message
                ? errors.gender?.message
                : ""
            }</FormHelperText>
          </Select>
          </FormControl>
          <FormControl  sx={{ m: 1, minWidth: 140 }}>
         <InputLabel id="gender">Is Admin?</InputLabel>
         <Select
          labelId="admin"
          id="admin"
          label="Is Admin?"
          required
          defaultValue={'false'}
          onChange={handleAdminChange}
          {...register("admin")}
          >
          <MenuItem value={'true'}>Yes</MenuItem>
          <MenuItem value={'false'}>No</MenuItem>
          </Select>
          </FormControl>
              </div>
          <Button onClick={handleSubmit(onSubmit)}
          variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Staff
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
