import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent, TextField, Button, Grid, Typography, DialogActions
} from '@mui/material';

const initialForm = {
  firstName: '', lastName: '', middleName: '', city: '',
  state: '', country: '', zip: '', ssn: '', phnNum: ''
};

const AddUserPopup = ({ closePopup, setUsers }) => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleAdd = async () => {
    if (!formData.firstName || !formData.ssn) {
      setError('First Name and SSN are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/users', formData);
      setUsers(prev => [...prev, res.data]);
      closePopup();
    } catch (err) {
      console.error('Add user error:', err);
      setError('Failed to add user. Please try again.');
    }
  };

  return (
    <Dialog open={true} onClose={closePopup} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Please fill in the user details.
        </Typography>
        <Grid container spacing={2} mt={1}>
          {Object.keys(initialForm).map((key) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                name={key}
                label={key}
                value={formData[key]}
                onChange={handleChange}
                required={key === 'firstName' || key === 'ssn'}
              />
            </Grid>
          ))}
        </Grid>
        {error && <Typography color="error" mt={2}>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} color="secondary" variant="outlined">Cancel</Button>
        <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserPopup;
