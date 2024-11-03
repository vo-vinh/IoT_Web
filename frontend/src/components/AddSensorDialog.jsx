import React from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddSensorDialog = ({ open, onClose, onAddSensor, newSensor, setNewSensor, newSensorDescription, setNewSensorDescription, newSensorType, setNewSensorType}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold'}}> Add New Sensor </DialogTitle>
      <Box p="1px"></Box>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={newSensor}
          onChange={(e) => setNewSensor(e.target.value)}
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
          variant="outlined"
          value={newSensorDescription}
          onChange={(e) => setNewSensorDescription(e.target.value)}
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
            value={newSensorType}
            onChange={(e) => setNewSensorType(e.target.value)}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddSensor} color="primary" disabled={!newSensor.trim() || !newSensorDescription.trim() || !newSensorType.trim()}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSensorDialog;
