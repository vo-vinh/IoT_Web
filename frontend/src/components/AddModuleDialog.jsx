import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, Typography } from '@mui/material';
import { axiosPrivate } from '../hooks/axios';

const AddModuleDialog = ({ open, onClose, moduleData, setModuleData, modules, setModules}) => {

  const setData = (e) => {
    setModuleData({...moduleData, [e.target.name]: e.target.value});
  }
  const [errMsg, setErrMsg] = useState({});

  const handleAddModule = (e) => {
    e.preventDefault();
    axiosPrivate.post("/module", moduleData, {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        onClose();
        setModules([...modules, res.data]);
        setModuleData({
          friendly_name: "",
          code_name: "",
          description: "",
          longitude: 0.0,
          latitude: 0.0,
        });
      })
      .catch(err => {
        if (err.response.status === 400) {
          setErrMsg(err.response.data);
        } else {
          console.log(err);
          alert("something went wrong");
        }
    });
  };


  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold', textAlign : 'center' }}> Add New Module </DialogTitle>

      <Box p="1px"></Box>
      <form onSubmit={handleAddModule}>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          name='friendly_name'
          required = {true}
          value={moduleData.friendly_name}
          error= {errMsg.friendly_name ? true : false}
          helperText={errMsg.friendly_name}
          onChange={setData}
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
          name='code_name'
          required = {true}
          value={moduleData.code_name}
          error= {errMsg.code_name ? true : false}
          helperText={errMsg.code_name}
          onChange={setData}
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
          required = {true}
          value={moduleData.description}
          name='description'
          onChange={setData}
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
          required = {true}
          value={moduleData.longitude}
          name='longitude'
          onChange={setData}
          fullWidth
          margin="dense"
          type='number'
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
          value={moduleData.latitude}
          name='latitude'
          required = {true}
          onChange={setData}
          fullWidth
          margin="dense"
          type='number'
          sx={{ marginBottom: '24px', fontSize: '18px' }}
          InputLabelProps={{
            sx: { fontSize: '18px' }, 
          }}
          InputProps={{
            sx: { fontSize: '18px' },
          }}
        />
        {Object.keys(errMsg).length > 0 && (
          <Box mt={2}>
            <Typography color="error" sx={{marginLeft : "5px", fontSize : "16px"}}>
              {Object.values(errMsg).join('')}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <Box p="1px"></Box>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit' color="primary"  >
          Add
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddModuleDialog;
