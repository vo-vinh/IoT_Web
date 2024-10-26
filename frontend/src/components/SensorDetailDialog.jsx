import React, { useState, useEffect } from 'react';
import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SensorDetailDialog = ({ open, onClose, sensor, onSave, onDelete }) => {
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sensor Details</DialogTitle>
      <Box mb={2}></Box>
      <DialogContent>
        <Box mb={2}>
          <TextField
            label="Name"
            value={sensorDetail.name || ''}
            onChange={(e) => handleInputChange('name', e.target.value)}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            value={sensorDetail.description || ''}
            onChange={(e) => handleInputChange('description', e.target.value)}
            fullWidth
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Type"
            value={sensorDetail.type || ''}
            onChange={(e) => handleInputChange('type', e.target.value)}
            fullWidth
          />
        </Box>
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
