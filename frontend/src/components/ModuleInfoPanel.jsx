import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { axiosPrivate } from '../hooks/axios';
import DeleteModuleDialog from './DeleteModuleDialog';
import NotificationDialog from './NotificationDialog';

const ModuleInfoPanel = ({ selectedModule, setSelectedModule, modules, setModules }) => {

  const [sensorData, setSensorData] = useState({
    friendly_name: selectedModule?.friendly_name || "",
    code_name: selectedModule?.code_name || "",
    description: selectedModule?.description || "",
    longitude: selectedModule?.longitude || 0.0,  
    latitude: selectedModule?.latitude || 0.0,
  });

  const [open, setOpen] = useState(false);
  const inputFile = useRef(null);

  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    setSensorData({
      friendly_name: selectedModule?.friendly_name || "",
      code_name: selectedModule?.code_name || "",
      description: selectedModule?.description || "",
      longitude: selectedModule?.longitude || 0.0,
      latitude: selectedModule?.latitude || 0.0,
      last_active: selectedModule?.last_active || "",
      sensor_lst: selectedModule?.sensor_lst || [],
    });
  }, [selectedModule]);

  const handleUpdateModule = (e) => {
    e.preventDefault();
    axiosPrivate.patch(`/module/${selectedModule.code_name}`, sensorData).then((res) => {
      let updatedModules = modules.map((module) => {
        if (module.code_name === selectedModule.code_name) {
          return res.data;
        }
        return module;
      });
      setModules(updatedModules);
    }
    ).catch((err) => {
      console.log(err);
      alert("Something went wrong");
    }
    );
  };

  const handleDeleteModule = () => {
    axiosPrivate.delete(`/module/${selectedModule.code_name}`).then((res) => {
      let updatedModules = modules.filter((module) => module.code_name !== selectedModule.code_name);
      setModules(updatedModules);
      if (updatedModules.length > 0) setSelectedModule(updatedModules[0]);
      else setSelectedModule({});
      setOpen(false);
    }).catch((err) => {
      console.log(err);
      alert("Something went wrong");
    });
  }

  const deleteBtnClick = () => {
    setOpen(true);
  };

  const setData = (e) => {
    setSensorData({ ...sensorData, [e.target.name]: e.target.value });
  };

  const handleImport = () => {
    inputFile.current.click();
    
    inputFile.current.onchange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        axiosPrivate.post(`/sensor-data/import/${selectedModule.code_name}`, formData)
        .then((res) => {
          setNotificationMessage("Import data successfully");
          setNotificationType("success");
          setOpenNotification(true);
        }).catch((err) => {
          console.log(err);
          setNotificationMessage(err.response.data.message);
          setNotificationType("error");
          setOpenNotification(true);
        }
        );
      }
    }

  }

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontSize: "24px", marginBottom: "24px" }}
      >
        Information of {sensorData?.friendly_name}
      </Typography>
      <form onSubmit={handleUpdateModule}>
        <TextField
          label="Module Name"
          required={true}
          variant="outlined"
          name="friendly_name"
          value={sensorData?.friendly_name || ""}
          onChange={setData}
          fullWidth
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />

        <TextField
          label="Code Name"
          variant="outlined"
          value={sensorData.code_name || "N/A"}
          desabled={true}
          name="code_name"
          InputProps={{
            readOnly: true,
            sx: { fontSize: "18px" },
          }}
          fullWidth
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
        />

        <TextField
          label="Description"
          variant="outlined"
          value={sensorData.description || ""}
          onChange={setData}
          name="description"
          required={true}
          fullWidth
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />

        <TextField
          label="Longitude"
          variant="outlined"
          name="longitude"
          required={true}
          type="number"
          value={sensorData?.longitude}
          onChange={setData}
          fullWidth
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />

        <TextField
          label="Latitude"
          variant="outlined"
          name="latitude"
          required={true}
          type="number"
          value={sensorData?.latitude}
          onChange={setData}
          fullWidth
          sx={{ marginBottom: "24px", fontSize: "18px" }}
          InputLabelProps={{
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
        />
        <TextField
          label="Last Active"
          type="datetime-local"
          value={sensorData.last_active || ""}
          disabled={true}
          fullWidth
          InputLabelProps={{
            shrink: true, // Để label không che mất placeholder
            sx: { fontSize: "18px" },
          }}
          InputProps={{
            sx: { fontSize: "18px" },
          }}
          sx={{ marginBottom: "24px", fontSize: "18px" }}
        />
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: "20px", marginTop: "16px" }}
        >
          Sensors List
        </Typography>
        {sensorData.sensor_lst && sensorData.sensor_lst.length > 0 ? (
          sensorData.sensor_lst.map((sensor, index) => (
            <Typography
              key={index}
              variant="body1"
              sx={{
                ml: 2,
                fontSize: "18px",
                lineHeight: "1.6",
                marginBottom: "8px",
              }}
            >
              • {sensor.name}
            </Typography>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontSize: "16px" }}
          >
            No sensors available.
          </Typography>
        )}

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button
            onClick={(e) => deleteBtnClick()}
            color="error"
            variant="contained"
            sx={{ fontSize: "16px", padding: "8px 16px" }}
          >
            Delete Module
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            sx={{ fontSize: "16px", padding: "8px 16px" }}
          >
            Save Changes
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleImport}
            sx={{ fontSize: "16px", padding: "8px 16px" }}
          >
            Import data
          </Button>
        </Box>
      </form>

      <DeleteModuleDialog
        open={open}
        onClose={() => setOpen(false)}
        onDeleteModule={handleDeleteModule}
        selectedModule={selectedModule}
      />

    <input type='file' id='importFile' ref={inputFile} style={{display: 'none'}}/>

    <NotificationDialog
      open={openNotification}
      setOpen={setOpenNotification}
      message={notificationMessage}
      dialogType={notificationType}
    />
    </Box>
  );
};

export default ModuleInfoPanel;
