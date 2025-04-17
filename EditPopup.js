import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog, DialogTitle, DialogContent, TextField, Button,
  Grid, Typography, DialogActions
} from '@mui/material';

const EditPopup = ({ user, closePopup, setUsers }) => {
  const [formData, setFormData] = useState(user);
  const originalSSN = user.ssn; // Save old SSN for tracking

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/users/${originalSSN}`, formData);
      setUsers(prev =>
        prev.map(u => u.ssn === originalSSN ? res.data : u)
      );
      closePopup();
    } catch (err) {
      console.error('Edit error:', err);
    }
  };

  return (
    <Dialog open={true} onClose={closePopup} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Update user information below.
        </Typography>
        <Grid container spacing={2} mt={1}>
          {Object.entries(formData).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <TextField
                fullWidth
                name={key}
                label={key}
                value={value}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} color="secondary" variant="outlined">Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPopup;
