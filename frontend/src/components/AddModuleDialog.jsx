import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box } from '@mui/material';

const AddModuleDialog = ({ open, onClose, onAddModule, newModule, setNewModule, newDescription, setNewDescription }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm Module</DialogTitle>
      <Box p="1px"></Box>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          value={newModule}
          onChange={(e) => setNewModule(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <Box p="1px"></Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddModule} color="primary" disabled={!newModule.trim() || !newDescription.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModuleDialog;
