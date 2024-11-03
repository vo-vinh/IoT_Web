import React, { useState } from 'react';
import { tokens } from "../theme";
import { Box, Typography, Button, useTheme } from '@mui/material';
import AddModuleDialog from '../components/AddModuleDialog';
import AddSensorDialog from '../components/AddSensorDialog';
import EditModuleDialog from '../components/EditModuleDialog';
import SensorDetailDialog from '../components/SensorDetailDialog';
import ModuleInfoPanel from '../components/ModuleInfoPanel';

import { mockModules } from "../services/mockData";


const Dashboard = () => {

  const theme  = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modules, setModules] = useState(mockModules);

  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openSensorDialog, setOpenSensorDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openSensorDetailDialog, setOpenSensorDetailDialog] = useState(false); 

  const [newModule, setNewModule] = useState("");
  const [newCodename, setNewCodename] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLongitude, setNewLongitude,] = useState("");
  const [newLatitude, setNewLatitude,] = useState("");
  const [newSensor, setNewSensor] = useState("");
  const [newSensorDescription, setNewSensorDescription] = useState("");
  const [newSensorType, setNewSensorType] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSensor, setSelectedSensor] = useState(""); 

  const handleAddModule = () => {
    if (newModule) {
      setModules(prevModules => [
        ...prevModules,
        { key: newModule.toLowerCase().replace(/\s+/g, ''), name: newModule, code_name: newCodename, description: newDescription, longitude: newLongitude, latitude: newLatitude, sensors: [], isOpen: false }
      ]);
      setNewModule("");
      setNewCodename("");
      setNewDescription("");
      setNewLongitude("");
      setNewLatitude()
      setOpenModuleDialog(false);
    }
  };

  const handleAddSensor = () => {
    if (newSensor && selectedModule) {
      setModules(prevModules =>
        prevModules.map(module =>
          module.key === selectedModule
            ? { 
                ...module, 
                sensors: [...module.sensors, { name: newSensor, description: newSensorDescription, type: newSensorType }]
              }
            : module
        )
      );
      
      setNewSensor("");
      setNewSensorDescription("");
      setNewSensorType("");
      setOpenSensorDialog(false);
    }
  };
  

  const handleToggleModule = (key) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.key === key
          ? { ...module, isOpen: !module.isOpen }
          : module
      )
    );
  };

  const handleEditModule = () => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.key === selectedModule.key
          ? { ...selectedModule }
          : module
      )
    );
    setOpenDetailDialog(false); 
  };

  const handleDeleteModule = (key) => {
    setModules(prevModules => prevModules.filter(module => module.key !== key));
    setOpenDetailDialog(false); 
  };
  

  const handleSensorClick = (moduleKey, sensorName) => {
    const module = modules.find(mod => mod.key === moduleKey);
    const sensor = module?.sensors.find(sen => sen.name === sensorName);
    setSelectedSensor(sensor); 
    setOpenSensorDetailDialog(true);
  };

  const handleSaveSensor = (updatedSensor) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        sensors: module.sensors.map((sensor) =>
          sensor.id === updatedSensor.id ? updatedSensor : sensor
        ),
      }))
    );
    setOpenSensorDetailDialog(false); 
  };

  const handleDeleteSensor = (sensorId) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        sensors: module.sensors.filter((sensor) => sensor.id !== sensorId),
      }))
    );
    setOpenSensorDetailDialog(false); 
  };

  const handleDownload = () => {
    // Logic to download data as CSV or JSON can be added here
    console.log("Download data");
  };
  
  const handleImport = () => {
    // Logic to import data can be added here
    console.log("Import data");
  };

  return (
    <Box m="40px">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" >
        <Box gridColumn={{ xs: "span 12", sm: "span 5", md: "span 5" }}>
          <Box display="flex" flexDirection="column" backgroundColor={colors.primary[400]} borderRadius={1} boxShadow={1} p={2}>
          < Typography variant="h2" gutterBottom>Modules List</Typography>
            {modules.map(({ key, name, sensors, isOpen }) => (
              <Box key={key} sx={{ marginBottom: "16px" }}>
                <Typography
                variant="h3"
                fontWeight="bold"
                onClick={() => { 
                  setSelectedModule(mockModules.find(mod => mod.key === key)); // Chọn module khi nhấp vào
                  handleToggleModule(key); 
                }}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              ><span style={{ marginRight: '10px' }}>{isOpen ? '-' : '+'}</span>
                  {name}
                </Typography>
                {isOpen && (
                  <Box sx={{ paddingLeft: "20px" }}>
                    {sensors.map((sensor, index) => (
                      <Typography 
                        key={index} 
                        variant="h4" 
                        sx={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleSensorClick(key, sensor.name)}
                      >
                        {sensor.name}
                      </Typography>
                    ))}
                    <Button onClick={() => { setOpenSensorDialog(true); setSelectedModule(key); }} sx={{ fontSize: "20px", color: "blue", marginTop: '1px' }}>+</Button>
                  </Box>
                )}
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={() => setOpenModuleDialog(true)} sx={{ fontSize: "20px", color: "white"}}>Add New Module</Button>
          </Box>
        </Box>


        <Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }} backgroundColor={colors.primary[400]} borderRadius={1} boxShadow={1} p={2}>
          <ModuleInfoPanel 
            selectedModule={selectedModule} 
            setSelectedModule={setSelectedModule} 
            onEditModule={handleEditModule} 
            onDeleteModule={handleDeleteModule}
          />
        </Box>


        <Box gridColumn={{ xs: "span 2", sm: "span 1", md: "span 1" }} display="flex" justifyContent="flex-end" mb={2}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Button 
              variant="contained" 
              color="error"
              onClick={handleDownload} 
              sx={{ 
                marginBottom: '20px',
                width: '150px',
                fontSize: '15px',
                color: 'white',
                fontWeight: "bold"
              }} 
            >
              Export All Data
            </Button>
            <Button 
              variant="contained" 
              color= "primary" 
              onClick={handleImport}
              sx={{ 
                width: '150px', 
                fontSize: '15px', 
                color: 'white',
                fontWeight: "bold"
              }}
            >
              Import All Data
            </Button>
          </Box>
        </Box>

      </Box>

      {/* Dialogs */}
      <AddModuleDialog 
        open={openModuleDialog} 
        onClose={() => setOpenModuleDialog(false)} 
        onAddModule={handleAddModule} 
        newModule={newModule} 
        setNewModule={setNewModule}
        newCodename={newCodename} 
        setNewCodename={setNewCodename}
        newDescription={newDescription} 
        setNewDescription={setNewDescription} 
        newLongitude={newLongitude}
        setNewLongitude={setNewLongitude}
        newLatitude={newLatitude}
        setNewLatitude={setNewLatitude}

      />
      <AddSensorDialog 
        open={openSensorDialog} 
        onClose={() => setOpenSensorDialog(false)} 
        onAddSensor={handleAddSensor} 
        newSensor={newSensor} 
        setNewSensor={setNewSensor}
        newSensorDescription={newDescription} 
        setNewSensorDescription={setNewDescription} 
        newSensorType={newSensorType}
        setNewSensorType={setNewSensorType}
      />
      <EditModuleDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        onEditModule={handleEditModule}
        onDeleteModule={handleDeleteModule}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
      />

      <SensorDetailDialog 
        open={openSensorDetailDialog} 
        onClose={() => setOpenSensorDetailDialog(false)} 
        sensor={selectedSensor} 
        onSave={handleSaveSensor}
        onDelete={handleDeleteSensor}
        modules={mockModules}
      />
    </Box>
  );
};

export default Dashboard;
