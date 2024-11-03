import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box } from '@mui/material';

const DeleteModuleDialog = ({ open, onClose, onDeleteModule, selectedModule}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '18px'}}> Confirm to delete {selectedModule?.friendly_name} ?</DialogTitle> 
      <Box p="1px"></Box>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onDeleteModule} color="error">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModuleDialog;