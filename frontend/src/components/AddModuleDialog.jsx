import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const AddModuleDialog = ({ open, onClose, onAddModule, newModule, setNewModule, newCodename, setNewCodename, newDescription, setNewDescription, newLongitude, setNewLongitude, newLatitude, setNewLatitude}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}> Add New Module </DialogTitle>

      <Box p="1px"></Box>

      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={newModule}
          onChange={(e) => setNewModule(e.target.value)}
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
          label="Code name"
          variant="outlined"
          value={newCodename}
          onChange={(e) => setNewCodename(e.target.value)}
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
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
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
          label="Longitude"
          variant="outlined"
          value={newLongitude}
          onChange={(e) => setNewLongitude(e.target.value)}
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
          label="Latitude"
          variant="outlined"
          value={newLatitude}
          onChange={(e) => setNewLatitude(e.target.value)}
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
      </DialogContent>
      <Box p="1px"></Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddModule} color="primary" disabled={!newModule.trim() || !newCodename.trim() || !newDescription.trim() || !newLongitude.trim() || !newLatitude.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModuleDialog;
