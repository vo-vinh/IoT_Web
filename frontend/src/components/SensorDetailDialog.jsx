import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SensorDetailDialog = ({ open, onClose, sensor, onSave, onDelete, modules }) => {
  const [sensorDetail, setSensorDetail] = useState(sensor);

  useEffect(() => {
    setSensorDetail(sensor);
  }, [sensor]);

  const handleInputChange = (field, value) => {
    setSensorDetail((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!sensorDetail) return null;

  const module = modules.find(mod => mod.sensors.some(s => s.id === sensorDetail.id));
  const moduleName = module ? module.name : 'Unknown Module'; 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>
        {sensorDetail.name} - {moduleName} 
      </DialogTitle>
      <Box mb={2}></Box>
      <DialogContent>
        <TextField
          label="Name"
          value={sensorDetail.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          fullWidth
          margin="dense"
          sx={{ marginBottom: '24px', fontSize: '18px' }}
          InputLabelProps={{
            sx: { fontSize: '18px' }, 
          }}
          InputProps={{
            sx: { fontSize: '18px' },
          }}
        />
        <TextField
          label="Description"
          value={sensorDetail.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          fullWidth
          margin="dense"
          sx={{ marginBottom: '24px', fontSize: '18px' }}
          InputLabelProps={{
            sx: { fontSize: '18px' }, 
          }}
          InputProps={{
            sx: { fontSize: '18px' },
          }}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel sx={{ fontSize: '18px' }}>Type</InputLabel>
          <Select
            value={sensorDetail.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            label="Type"
            margin="dense"
            sx={{ marginBottom: '24px', fontSize: '18px' }}
            InputProps={{
              sx: { fontSize: '18px' },
            }}
          >
            <MenuItem value="Temperature">Temperature</MenuItem>
            <MenuItem value="Humidity">Humidity</MenuItem>
            <MenuItem value="Light">Light</MenuItem>
            <MenuItem value="Soil">Soil</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Last Active"
          type="datetime-local"
          value={sensorDetail.last_active || ''}
          onChange={(e) =>
            setSensorDetail((prev) => ({
              ...prev,
              last_active: e.target.value,
            }))
          }
          fullWidth
          InputLabelProps={{
            shrink: true,
            sx: { fontSize: '18px' },
          }}
          InputProps={{
            sx: { fontSize: '18px' },
          }}
          sx={{ marginBottom: '24px', fontSize: '18px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => onSave(sensorDetail)} color="secondary">
          Save
        </Button>
        <Button onClick={() => onDelete(sensorDetail.id)} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SensorDetailDialog;
