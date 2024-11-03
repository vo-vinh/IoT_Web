import React from 'react';
import { Box, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { tokens } from "../theme";

const EditModuleDialog = ({ open, onClose, onEditModule, onDeleteModule, selectedModule, setSelectedModule }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={open} onClose={onClose} color={colors.grey[100]}> 
      <DialogTitle>Informatinon Of Module</DialogTitle>
      <Box p="2px"></Box>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={selectedModule?.name || ''}
          onChange={(e) =>
            setSelectedModule((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          fullWidth
          sx={{ marginBottom: '20px' }}
        />
        <Box p="2px"></Box>
        <TextField
          label="Description"
          variant="outlined"
          value={selectedModule.description || ''}
          onChange={(e) =>
            setSelectedModule((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
        <Box p="2px"></Box>
        <Typography variant="h6" gutterBottom>
          Sensors List
        </Typography>
        {selectedModule.sensors && selectedModule.sensors.length > 0 ? (
          selectedModule.sensors.map((sensor, index) => (
            <Typography key={index} variant="body1">
              {sensor.name}
            </Typography>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No Sensor.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onDeleteModule(selectedModule.key)} color="secondary">
          Delete Module
        </Button>
        <Button onClick={onClose} color="secondary" >Cancel</Button>
        <Button onClick={onEditModule} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModuleDialog;
