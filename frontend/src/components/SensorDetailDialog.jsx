import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import SensorType from '../utils/sensorType';
import { axiosPrivate } from '../hooks/axios';

const SensorDetailDialog = ({
  open,
  onClose,
  selectedSensor,
  sensorData,
  setSensorData,
  selectedModule,
  modules,
  setModules,
}) => {
  const setData = (e) => {
    setSensorData({ ...sensorData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setErrMsg("");
    setSensorData({
      name: selectedSensor?.name || "",
      description: selectedSensor?.description || "",
      type: selectedSensor?.type || "",
    });
  }, [selectedSensor, setSensorData]);

  const [errMsg, setErrMsg] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = {
      name: sensorData.name || selectedSensor.name,
      description: sensorData.description || selectedSensor.description,
      type: sensorData.type || selectedSensor.type,
    }
    axiosPrivate.patch(`/sensor/${selectedSensor.id}`, data).then((res) => {
      let updatedModules = modules.map((module) => {
        if (module.id === selectedModule.id) {
          let updatedSensors = module.sensor_lst.map((sensor) => {
            if (sensor.id === selectedSensor.id) {
              return res.data;
            }
            return sensor;
          });
          return { ...module, sensor_lst: updatedSensors };
        }
        return module;
      });
      setModules(updatedModules);
      onClose();
    }).catch((err) => {
      console.log(err);
      if (err.response) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Something went wrong");
      }
    }
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    axiosPrivate.delete(`/sensor/${selectedSensor.id}`).then((res) => {
      let updatedModules = modules.map((module) => {
        if (module.id === selectedModule.id) {
          let updatedSensors = module.sensor_lst.filter(
            (sensor) => sensor.id !== selectedSensor.id
          );
          return { ...module, sensor_lst: updatedSensors };
        }
        return module;
      });
      setModules(updatedModules);
      onClose();
    }).catch((err) => {
      console.log(err);
      if (err.response) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("Something went wrong");
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: "24px", fontWeight: "bold" }}>
        {selectedSensor?.name} - {selectedModule?.friendly_name}
      </DialogTitle>
      <Box mb={2}></Box>
      <form onSubmit={handleUpdate}>
      <DialogContent>
        <TextField
          label="Name"
          value={sensorData?.name || ""}
          name= "name"
          required={true}
          onChange={setData}
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
          value={sensorData?.description || ""}
          name = "description"
          onChange={setData}
          required={true}
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
            value={sensorData?.type || ""}
            onChange={setData}
            required={true}
            name="type"
            label="Type"
            margin="dense"
            sx={{ marginBottom: "24px", fontSize: "18px" }}
            InputProps={{
              sx: { fontSize: "18px" },
            }}
          >
            {Object.keys(SensorType).map((key) => (
              <MenuItem key={key} value={key}>
                {SensorType[key]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Last Active"
          type="datetime-local"
          disabled={true}
          value={selectedSensor?.last_active || ""}
          onChange={(e) =>
            setSensorData((prev) => ({
              ...prev,
              last_active: e.target.value,
            }))
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
          sx={{ marginBottom: "24px", fontSize: "18px" }}
        />

        {Object.keys(errMsg).length > 0 && (
          <Box mt={2}>
            <Typography
              color="error"
              sx={{ marginLeft: "5px", fontSize: "16px" }}
            >
              {errMsg}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type='submit' color="secondary">
          Save
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default SensorDetailDialog;
