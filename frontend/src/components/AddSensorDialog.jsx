import React from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const AddSensorDialog = ({ open, onClose, onAddSensor, newSensor, setNewSensor }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Sensor</DialogTitle>
      <Box p="1px"></Box>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={newSensor}
          onChange={(e) => setNewSensor(e.target.value)}
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddSensor} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSensorDialog;
