import React, { useState } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, 
  Button, FormControl, InputLabel, Select, MenuItem, Typography  } from '@mui/material';
import { axiosPrivate } from '../hooks/axios';

import SensorType from '../utils/sensorType';


const AddSensorDialog = ({
  open,
  onClose,
  sensorData,
  setSensorData,
  selectedModule,
  setSelectedModule,
  modules,
  setModules,
}) => {

  const setData = (e) => {
    setSensorData({...sensorData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPrivate.post(`module/${selectedModule.code_name}`, sensorData, {headers : {'Content-Type' : 'application/json'}})
      .then(res => {
        onClose();
        setModules(modules.map(mod => {
          if (mod.code_name === selectedModule.code_name) {
            if (!mod.sensor_lst) {
              return {...mod, sensor_lst: [res.data]};
            }
            return {...mod, sensor_lst: [...mod.sensor_lst, res.data]};
          }
          return mod;
        }));
        setSensorData({
          name: "",
          description: "",
          
        }) 
      })
      .catch(err => {
        console.log(err);
        if (err.response?.status === 400) {
          setErrMsg(err.response.data.message);
        }
        else {
          alert("something went wrong");
        }
        console.log(err);
      }); 
  }
  const [errMsg, setErrMsg] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {" "}
        Add New Sensor{" "}
      </DialogTitle>
      <Box p="1px"></Box>

      <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={sensorData.name}
          name="name"
          onChange={setData}
          required= {true}
          fullWidth
          margin="dense"
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          name="description"
          value={sensorData.description}
          onChange={setData}
          required= {true}
          fullWidth
          margin="dense"
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontSize: "18px" }}>Type</InputLabel>
          <Select
            value={sensorData.type || SensorType.temperature}
            onChange={setData}
            name="type"
            required= {true}
            label="Type"
            margin="dense"
            sx={{ marginBottom: "24px", fontSize: "18px" }}
            InputProps={{
              sx: { fontSize: "18px" },
            }}
            defaultValue={SensorType.temperature}
          >
            {Object.keys(SensorType).map((key) => (
              <MenuItem key={key} value={key}>
                {SensorType[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {Object.keys(errMsg).length > 0 && (
          <Box mt={2}>
            <Typography color="error" sx={{marginLeft : "5px", fontSize : "16px"}}>
              {errMsg}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          color="primary"
          type='submit'
        >
          Add
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSensorDialog;
