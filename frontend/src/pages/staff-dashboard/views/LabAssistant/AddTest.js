import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import api from "../../../../api/axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import Autocomplete from '@mui/material/Autocomplete';

export default function AddTest() {

  const [test, setTest] = useState("");
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState("");
  const [normal, setNormal] = useState("");
  const { user } = useAuthContext();
  // const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  // const id = user.id;
  const fetchData = async () => {
    await api.get(`/patient/all`).then(userData => {
      setRecords(userData.data);
    })
  }

  useEffect(() => {
    fetchData()
      .catch(console.error);
  }, [])

  const [testRecords, setTestRecords] = useState([]);
  const fetchTestData = async () => {
    await api.get(`/labassistant/testtypes/all`).then(testTypeData => {
      setTestRecords(testTypeData.data);
    })
  }

  useEffect(() => {
    fetchTestData()
      .catch(console.error);
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();
    const data = { test, patient, description, result, id: user.id };
    try {
      await api.post("/labassistant/addtest", data).then(testsData => {
        setTest("");
        setPatient("");
        setDescription("");
        setResult("");
        setNormal("");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleAutocomplete = (event, newValue) => {
    if (newValue != null) {
      setPatient(newValue);
      }
  }
  const handleAutocomplete2 = (event, newValue) => {
    if (newValue != null) {
      setTest(newValue);
      console.log(newValue);
      setNormal(newValue.normalValues);
      console.log(normal);
      }
  }

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
        <h2 className="dashboard-title">Add Test</h2>
        <Box component="form" onSubmit={handleSubmit} sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={test}
                options={testRecords}
                getOptionLabel={ testRecords => (testRecords.testName) || ""}
                onChange={handleAutocomplete2}
                sx={{ width: '300' }}
                renderInput={(params) => <TextField {...params} 
                label="Test"
                />}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={patient}
                options={records}
                getOptionLabel={ records => (records.name) || ""}
                onChange={handleAutocomplete}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} 
                label="Patient"
                />}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={5}
              label="Notes"
              style={{ width: "100.7vh" }}
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
              helperText=" "
              required
            />
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Result"
                fullWidth
                multiline
                value={result}
                onChange={e => setResult(e.target.value)}
                helperText=" "
                maxRows={5}
                required
              />
              <TextField
                disabled
                id="outlined-disabled"
                label="Normal"
                InputLabelProps={{ shrink: true }}
                value={normal}
              />
            </div>
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Test
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
