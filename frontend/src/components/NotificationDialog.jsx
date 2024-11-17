import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const NotificationDialog = ({open, setOpen, message, dialogType}) => {

  const handleClose = () => {
    setOpen(false);
  };
  // TODO: css this dialog
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogType === 'success' ? 'Success' : 'Error'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default NotificationDialog;
