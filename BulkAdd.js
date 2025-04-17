import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Box, Grid, Typography
} from '@mui/material';

const initialUser = {
  firstName: '', lastName: '', middleName: '', city: '',
  state: '', country: '', zip: '', ssn: '', phnNum: ''
};

const BulkAdd = ({ setUsers }) => {
  const [open, setOpen] = useState(false);
  const [users, setUsersLocal] = useState([{ ...initialUser }]);
  const [error, setError] = useState('');

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setUsersLocal([{ ...initialUser }]);
    setError('');
  };

  const handleUserChange = (index, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], [field]: value };
    setUsersLocal(updatedUsers);
  };

  const handleSubmit = async () => {
    const usersToAdd = users.filter(user =>
      Object.values(user).some(val => val !== '')
    );

    if (usersToAdd.length === 0) {
      setError('Please add at least one user');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8080/users/bulk', usersToAdd);
      setUsers(prev => [...prev, ...res.data]);
      handleClose();
    } catch (err) {
      console.error('Bulk add error:', err);
      setError(err.response?.data?.message || 'Failed to add users. Please try again.');
    }
  };

  const handleAddAnotherUser = () => {
    setUsersLocal([...users, { ...initialUser }]);
  };

  return (
    <>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Bulk Add
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Bulk Add Users</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" mb={2}>
            Fill in details for one or more users.
          </Typography>

          <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {users.map((user, index) => (
              <Box
                key={index}
                mb={3}
                p={2}
                sx={{
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  background: '#fefefe',
                  boxShadow: 1
                }}
              >
                <Typography variant="subtitle1" gutterBottom>User {index + 1}</Typography>
                <Grid container spacing={2}>
                  {Object.keys(initialUser).map((field) => (
                    <Grid item xs={12} sm={6} key={field}>
                      <TextField
                        label={field}
                        value={user[field]}
                        onChange={(e) => handleUserChange(index, field, e.target.value)}
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </Box>

          {error && <Typography color="error" mt={1}>{error}</Typography>}

          <Button
            onClick={handleAddAnotherUser}
            sx={{ mt: 2 }}
            variant="outlined"
          >
            Add Another User
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Add Users</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BulkAdd;
