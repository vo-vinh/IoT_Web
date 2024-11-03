import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { mockModules } from "../services/mockData";

const ModuleInfoPanel = ({ onEditModule, onDeleteModule, selectedModule, setSelectedModule }) => {
  // Hiển thị Module 1 nếu chưa có module nào được chọn
  const moduleToDisplay = selectedModule || mockModules[0];
  const handleSave = () => {
    onEditModule(moduleToDisplay);
  };

  return (
    <Box>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ fontSize: '24px', marginBottom: '24px' }}
      >
        Information of {moduleToDisplay.name}
      </Typography>

      <TextField
        label="Module Name"
        variant="outlined"
        value={moduleToDisplay.name || ''}
        onChange={(e) =>
          setSelectedModule((prev) => (prev ? {
            ...prev,
            name: e.target.value,
          } : { name: e.target.value }))
        }
        fullWidth
        sx={{ marginBottom: '24px', fontSize: '18px' }}
        InputLabelProps={{
          sx: { fontSize: '18px' }, 
        }}
        InputProps={{
          sx: { fontSize: '18px' },
        }}
      />

      <TextField
        label="Code Name"
        variant="outlined"
        value={moduleToDisplay.code_name || 'N/A'}
        InputProps={{
          readOnly: true,
          sx: { fontSize: '18px' },
        }}
        fullWidth
        sx={{ marginBottom: '24px', fontSize: '18px' }}
        InputLabelProps={{
          sx: { fontSize: '18px' }, 
        }}
      />

      <TextField
        label="Description"
        variant="outlined"
        value={moduleToDisplay.description || ''}
        onChange={(e) =>
          setSelectedModule((prev) => (prev ? {
            ...prev,
            description: e.target.value,
          } : { description: e.target.value }))
        }
        fullWidth
        sx={{ marginBottom: '24px', fontSize: '18px' }}
        InputLabelProps={{
          sx: { fontSize: '18px' }, 
        }}
        InputProps={{
          sx: { fontSize: '18px' }, 
        }}
      />

      <TextField
        label="Longitude"
        variant="outlined"
        type="number"
        value={moduleToDisplay.longitude || ''}
        onChange={(e) =>
          setSelectedModule((prev) => (prev ? {
            ...prev,
            longitude: parseFloat(e.target.value),
          } : { longitude: parseFloat(e.target.value) }))
        }
        fullWidth
        sx={{ marginBottom: '24px', fontSize: '18px' }}
        InputLabelProps={{
          sx: { fontSize: '18px' }, 
        }}
        InputProps={{
          sx: { fontSize: '18px' }, 
        }}
      />

      <TextField
        label="Latitude"
        variant="outlined"
        type="number"
        value={moduleToDisplay.latitude || ''}
        onChange={(e) =>
          setSelectedModule((prev) => (prev ? {
            ...prev,
            latitude: parseFloat(e.target.value),
          } : { latitude: parseFloat(e.target.value) }))
        }
        fullWidth
        sx={{ marginBottom: '24px', fontSize: '18px' }}
        InputLabelProps={{
          sx: { fontSize: '18px' }, 
        }}
        InputProps={{
          sx: { fontSize: '18px' }, 
        }}
      />
      <TextField
        label="Last Active"
        type="datetime-local"
        value={moduleToDisplay.last_active || ''}
        onChange={(e) =>
          setSelectedModule((prev) => ({
            ...prev,
            last_active: e.target.value,
          }))
        }
        fullWidth
        InputLabelProps={{
          shrink: true, // Để label không che mất placeholder
          sx: { fontSize: '18px' },
        }}
        InputProps={{
          sx: { fontSize: '18px' },
        }}
        sx={{ marginBottom: '24px', fontSize: '18px' }}
      />
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ fontSize: '20px', marginTop: '16px' }}
      >
        Sensors List
      </Typography>
      {moduleToDisplay.sensors && moduleToDisplay.sensors.length > 0 ? (
        moduleToDisplay.sensors.map((sensor, index) => (
          <Typography 
            key={index} 
            variant="body1" 
            sx={{ ml: 2, fontSize: '18px', lineHeight: '1.6', marginBottom: '8px' }}
          >
            • {sensor.name}
          </Typography>
        ))
      ) : (
        <Typography 
          variant="body2" 
          color="textSecondary" 
          sx={{ fontSize: '16px' }}
        >
          No sensors available.
        </Typography>
      )}

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button 
          onClick={() => onDeleteModule(moduleToDisplay.key)} 
          color="error" 
          variant="contained"
          sx={{ fontSize: '16px', padding: '8px 16px' }}
        >
          Delete Module
        </Button>
        <Button 
          onClick={handleSave} 
          color="primary" 
          variant="contained"
          sx={{ fontSize: '16px', padding: '8px 16px' }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ModuleInfoPanel;
