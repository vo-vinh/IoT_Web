import React, { useEffect, useState } from 'react';
import { tokens } from "../theme";
import { Box, Typography, Button, useTheme } from '@mui/material';
import AddModuleDialog from '../components/AddModuleDialog';
import AddSensorDialog from '../components/AddSensorDialog';
import EditModuleDialog from '../components/EditModuleDialog';
import SensorDetailDialog from '../components/SensorDetailDialog';
import ModuleInfoPanel from '../components/ModuleInfoPanel';

import { axiosPrivate } from '../hooks/axios';


const Dashboard = () => {

  const theme  = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/module")
      .then(res => {
        var result = res.data.map((mod) => ({...mod, isOpen: false, }));
        setModules(result);
        if (res.data?.length > 0) {
          setSelectedModule(result[0]);
        }
      })
      .catch(err => {
        alert("something went wrong");
      });
  }, [])

  const [openModuleDialog, setOpenModuleDialog] = useState(false);
  const [openSensorDialog, setOpenSensorDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openSensorDetailDialog, setOpenSensorDetailDialog] = useState(false); 

  const [moduleData, setModuleData] = useState({
    friendly_name: "",
    code_name: "",
    description: "",
    longitude: 0.0, 
    latitude: 0.0,
  });

  const [sensorData, setSensorData] = useState({
    name: "",
    description: "",
    type: "",
  });

  const [selectedModule, setSelectedModule] = useState({});
  const [selectedSensor, setSelectedSensor] = useState(""); 

  const handleAddSensor = (module) => {
    setOpenSensorDialog(true);
    setSelectedModule(module);
  };
  
  const handleSensorClick = (module, sensor) => {
    setSelectedModule(module);
    setSelectedSensor(sensor);
    setOpenSensorDetailDialog(true);
  };

  const handleDownload = () => {
    // Logic to download data as CSV or JSON can be added here
    console.log("Download data");
  };

  const handleClickModule = (module) => {
    module.isOpen = !module.isOpen;
    var tempModules = modules.map((mod) => {
      if (mod.id === module.id) {
        return module;
      }
      return mod;
    })
    setModules(tempModules);
    setSelectedModule(module);
  }

  return (
    <Box m="40px">
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" >
        <Box gridColumn={{ xs: "span 12", sm: "span 5", md: "span 5" }}>
          <Box display="flex" flexDirection="column" backgroundColor={colors.primary[400]} borderRadius={1} boxShadow={1} p={2}>
          < Typography variant="h2" gutterBottom>Modules List</Typography>
            {modules.map((module) => (
              <Box key={module.id} sx={{ marginBottom: "16px" }}>
                <Typography
                variant="h3"
                fontWeight="bold"
                onClick={e => {handleClickModule(module)}}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              ><span style={{ marginRight: '10px' }}>{module?.isOpen ? '-' : '+'}</span>
                  {module.friendly_name}
                </Typography>
                {module?.isOpen && (
                  <Box sx={{ paddingLeft: "20px" }}>
                    {module.sensor_lst?.map((sensor, index) => (
                      <Typography 
                        key={index} 
                        variant="h4" 
                        sx={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleSensorClick(module, sensor)}
                      >
                        {sensor.name}
                      </Typography>
                    ))}
                    <Button onClick={(e) => { handleAddSensor(module) }} sx={{ fontSize: "20px", color: "blue", marginTop: '1px' }}>+</Button>
                  </Box>
                )}
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={() => setOpenModuleDialog(true)} sx={{ fontSize: "20px", color: "white"}}>Add New Module</Button>
          </Box>
        </Box>


        <Box gridColumn={{ xs: "span 12", sm: "span 6", md: "span 6" }} backgroundColor={colors.primary[400]} borderRadius={1} boxShadow={1} p={2}>
          <ModuleInfoPanel 
            selectedModule = {selectedModule} 
            setSelectedModule = {setSelectedModule}
            modules = {modules}
            setModules = {setModules}
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

          </Box>
        </Box>

      </Box>

      {/* Dialogs */}
      <AddModuleDialog 
        open={openModuleDialog} 
        onClose={() => setOpenModuleDialog(false)} 
        moduleData= {moduleData}
        setModuleData={setModuleData}
        modules={modules}
        setModules={setModules}
      />
      <AddSensorDialog 
        open={openSensorDialog} 
        onClose={() => setOpenSensorDialog(false)} 
        sensorData={sensorData}
        setSensorData={setSensorData}
        selectedModule={selectedModule}
        setSelectedModule={setSelectedModule}
        modules={modules}
        setModules={setModules}
      />
      <EditModuleDialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        selectedSensor = {selectedSensor}
        sensorData = {sensorData}
        setSensorData = {setSensorData}
        selectedModule = {selectedModule}
        modules = {modules}
        setModules = {setModules}
      />

      <SensorDetailDialog 
        open={openSensorDetailDialog} 
        onClose={() => setOpenSensorDetailDialog(false)} 
        selectedSensor={selectedSensor}
        sensorData={sensorData}
        setSensorData={setSensorData}
        selectedModule={selectedModule}
        modules={modules}
        setModules={setModules}
      />

    </Box>
  );
};

export default Dashboard;
