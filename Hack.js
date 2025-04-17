import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import UserTable from './components/UserTable';
import AddUserPopup from './components/AddUserPopup';
import BulkAdd from './components/BulkAdd';
import { Button, Box, Typography } from '@mui/material';

function Hack() {
  const [users, setUsers] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#f3f6f9', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        User Management
      </Typography>
      <SearchForm setUsers={setUsers} />

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <UserTable users={users} setUsers={setUsers} />
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" color="primary" onClick={() => setShowAddPopup(true)}>
              Add User
            </Button>
            <BulkAdd setUsers={setUsers} />
          </Box>
        </>
      )}

      {showAddPopup && (
        <AddUserPopup closePopup={() => setShowAddPopup(false)} setUsers={setUsers} />
      )}
    </Box>
  );
}

export default Hack;
