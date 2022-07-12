import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState , useRef, useEffect } from "react";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
// import { useAuthContext } from "../../../../../hooks/useAuthContext";
// import {useNavigate} from "react-router-dom"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormHelperText from '@mui/material/FormHelperText';
import { countries } from "../../../../../components/shared/countries";
import { cities } from "../../../../../components/shared/xkcities";
import { Autocomplete } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Notifybar from "../../../../../components/shared/Notifybar";

export default function AddPatient() {
  // const [gender, setGender] = useState("");
  // const { user } = useAuthContext();
  // const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const searchInput = useRef(null);
  const apiKey = 'AIzaSyCmq_w4Yo_NR8ZzoUOAB3G7kaEexaUTEXE';
  const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
  const today = new Date();
  const [address2, setAddress2] = useState({});
  const [bar, setBar] = useState(false);

  // const [town, setTown] = useState("");
  // const [country, setCountry] = useState("");
  const [age,setAge] = useState(0);
  function loadAsyncScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      Object.assign(script, {
        type: "text/javascript",
        async: true,
        src
      })
      script.addEventListener("load", () => resolve(script));
      document.head.appendChild(script);
    })
  }

  const initMapScript = () => {
    if(window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${apiKey}&libraries=places`;
    return loadAsyncScript(src);
  }

  const onChangeAddress = (autocomplete) => {
    const place = autocomplete.getPlace();
    setAddress2(extractAddress(place));
    console.log(extractAddress(place))
  }

  const initAutocomplete = () => {
    if (!searchInput.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => onChangeAddress(autocomplete));
  }

  const hideBar = () => {
    setBar(false);
  };
  
  const showBar = () => {
    setBar(true);
  };
  
  const extractAddress = (place) => {
    const address = {
      city: "",
      country: "",
    }
    place.address_components.forEach(component => {
      const types = component.types;
      const value = component.long_name;
      if (types.includes("locality")) {
        address.city = value;
        setValue('town',value);
        if(cities.includes(address.city)){
          address.country = 'Kosovo';
          setValue('country','Kosovo');
        }
      }
  
      if (types.includes("country")) {
        address.country = value;
        if(value === 'Serbia'){
          address.country = ''
        }
        setValue('country',address.country);
      }
  
    });
  
    return address;
  }
  

  useEffect(() => {
    initMapScript().then(() => initAutocomplete())
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid Email."),
    date: Yup.date()
      .required("Date is required")
      .nullable()
      .max(new Date(), "Please choose past date")
      .nullable().transform((curr, orig) => orig === '' ? null : curr)
      .default(undefined),
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
    town: Yup.string()
    .required("Town is required")
    .min(3, "Town must be at least 3 characters")
    .max(123, "Town must not exceed 123 characters"),
    country: Yup.string()
    .required("Country is required")
    .min(3, "Country must be at least 3 characters")
    .max(123, "Country must not exceed 123 characters")
    .typeError('Country must be specified')
  });

  const handleAge = async e => {
    let dob1 = new Date(getValues('date'));
    let age1 = today.getFullYear() - dob1.getFullYear();
    var m = today.getMonth() - dob1.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob1.getDate())) {
        age1--;
    }
    console.log(age1)
    setAge(age1);
    }

  const handleChange = async (event) => {
    // setGender(event.target.value);
    setValue('gender',event.target.value)
    await trigger(['gender']);
  };
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });


  const onSubmit = (data) => {
    data.age = age;
    console.log(data)
    try {
      api.post("/patient/register", data).then((userData) => {
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
          p: 4,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">New Patient</h2>
        <Box component="form" onSubmit={handleSubmit}  sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}>
            <div>
            <TextField
            label="Name"
            fullWidth
            multiline
            maxRows={5}
            helperText={errors.name?.message}
            required
            {...register("name")}
            error={errors.name ? true : false}
          />

           <TextField
            label="Email"
            fullWidth
            multiline
            maxRows={5}
            helperText={errors.email?.message}
            required
            {...register("email")}
            error={errors.email ? true : false}
          />
        <FormControl  sx={{ m: 0, minWidth: 140 }}>
        <TextField
        id="date"
        label="Date of birth"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        helperText={errors.date?.message}
        required
        {...register("date")}
        onChange={e => {
          setValue('date',e.target.value);
          handleAge(e);
        }}
        error={errors.date ? true : false}
      />
 
          </FormControl>
          
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
          <FormHelperText>{errors.gender?.message}</FormHelperText>
          </Select>
          </FormControl>
             <TextField
            label="Address"
            fullWidth
            multiline
            style = {{width: 205}} 
            helperText={errors.address?.message}
            required
            {...register("address")}
            error={errors.address ? true : false}
          />
           <FormControl  sx={{ m: 0, minWidth: 140 }}>
                <TextField
                  required
                  fullWidth
                  type="text"
                  id="town"
                  placeholder="Enter a location...."
                  label="Town"
                  name="town"
                  inputRef={searchInput} 
                  helperText={errors.town?.message}
                  {...register("town")}
                  error={errors.town ? true : false}
                  // onChange={e => setTown(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                </FormControl>
                {/* <FormControl  sx={{ m: 0, minWidth: 140 }}>
                  <Autocomplete
                disablePortal
                options={countries}
                renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Country"
                      {...register("country")}
                      helperText={errors.country?.message}
                      required
                      error={errors.country ? true : false}

                  />
              )}
              />
          </FormControl> */}

          <FormControl  sx={{ m: 0, minWidth: 80 }}>
      <Controller
        name="country"
        control={control}
        defaultValue=''
        render={({ field: { ref, ...field }, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            disablePortal
            filterSelectedOptions
            options={countries.map((option) => option.label)}
            onChange={(event, value) => {
              field.onChange(value);
            }}
            renderInput={(params) => (
              <TextField
                required
                error={!!error}
                helperText={error?.message}
                label="Country"
                inputRef={ref}
                {...params}
              />
            )}
          />
        )}
      /> 
      </FormControl>
          <TextField
            label="Phone"
            fullWidth
            multiline
            maxRows={5}
            helperText={errors.phone?.message}
            required
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
            helperText={errors.password?.message}
            {...register("password")}
            error={errors.password ? true : false}
          />
        
              </div>
          <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Patient
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
