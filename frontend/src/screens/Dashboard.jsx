import React, { useState } from 'react';
import { tokens } from "../theme";
import { Box, Typography, Button, useTheme } from '@mui/material';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Download, Upload, Visibility  } from '@mui/icons-material';
import AddModuleDialog from '../components/AddModuleDialog';
import AddSensorDialog from '../components/AddSensorDialog';
import EditModuleDialog from '../components/EditModuleDialog';
import SensorDetailDialog from '../components/SensorDetailDialog';
import { mockModules } from "../services/mockData";


const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [modules, setModules] = useState(mockModules);

  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openSensorDialog, setOpenSensorDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openSensorDetailDialog, setOpenSensorDetailDialog] = useState(false); 

  const [newModule, setNewModule] = useState("");
  const [newDescription, setNewDescription] = useState("")
  const [newSensor, setNewSensor] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSensor, setSelectedSensor] = useState(""); 

  const handleAddModule = () => {
    if (newModule) {
      setModules(prevModules => [
        ...prevModules,
        { key: newModule.toLowerCase().replace(/\s+/g, ''), label: newModule, description: newDescription, sensors: [], isOpen: false }
      ]);
      setNewModule("");
      setNewDescription("");
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
                sensors: [...module.sensors, { name: newSensor }]
              }
            : module
        )
      );
      
      setNewSensor("");
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

  const handleOpenDetailDialog = (module) => {
    setSelectedModule(module);
    setOpenDetailDialog(true);
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
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="50px" >
        <Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 4" }}>
          <Box display="flex" flexDirection="column" backgroundColor={colors.primary[400]} borderRadius={1} boxShadow={1} p={2}>
          < Typography variant="h2" gutterBottom>Modules List</Typography>
            {modules.map(({ key, label, sensors, isOpen }) => (
              <Box key={key} sx={{ marginBottom: "16px" }}>
                <Typography variant="h3" fontWeight="bold" onClick={() => handleToggleModule(key)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '10px' }}>{isOpen ? '-' : '+'}</span>
                  {label}
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
                    <Button onClick={() => handleOpenDetailDialog(modules.find(mod => mod.key === key))} sx={{ fontSize: "16px", color: "blue", marginTop: '10px' }}>
                      <Visibility/> 
                    </Button>
                  </Box>
                )}
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={() => setOpenModuleDialog(true)} sx={{ fontSize: "20px", color: "white"}}>Add New Module</Button>
          </Box>
        </Box>
            {/* Data Table */}
            <Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 8" }} backgroundColor={colors.primary[400]} p={2}>
              <Typography variant="h5" gutterBottom>Data Table</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Module Name</TableCell>
                      <TableCell>Sensor Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Sensor Value</TableCell>
                      <TableCell>Update Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {modules.map((module) =>
                      module.sensors.map((sensor, index) => (
                        <TableRow key={`${module.key}-${index}`}>
                          <TableCell>{module.label}</TableCell>
                          <TableCell>{sensor.name}</TableCell>
                          <TableCell>{sensor.description}</TableCell>
                          <TableCell>{sensor.value}</TableCell>
                          <TableCell>{sensor.updateTime}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="secondary" onClick={handleDownload}>
                  <Download />
                </Button>
                <Button variant="contained" color="secondary" onClick={handleImport}> 
                  <Upload />
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
        newDescription={newDescription} 
        setNewDescription={setNewDescription} 
      />
      <AddSensorDialog 
        open={openSensorDialog} 
        onClose={() => setOpenSensorDialog(false)} 
        onAddSensor={handleAddSensor} 
        newSensor={newSensor} 
        setNewSensor={setNewSensor}
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
      />
    </Box>
  );
};

export default Dashboard;
