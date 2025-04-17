import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Stack
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import ViewPopup from './ViewPopup';
import EditPopup from './EditPopup';

const UserTable = ({ users, setUsers }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const handleDelete = async (ssn) => {
    try {
      await axios.delete(`http://localhost:8080/users/${ssn}`);
      setUsers(users.filter(u => u.ssn !== ssn));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ my: 2, boxShadow: 2, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><b>First Name</b></TableCell>
              <TableCell><b>City</b></TableCell>
              <TableCell><b>SSN</b></TableCell>
              <TableCell><b>Phone</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.ssn}
                sx={{
                  backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                  '&:hover': { backgroundColor: '#e3f2fd' }
                }}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>{user.ssn}</TableCell>
                <TableCell>{user.phnNum}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => setSelectedUser(user)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => setEditUser(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.ssn)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <ViewPopup user={selectedUser} closePopup={() => setSelectedUser(null)} />
      )}
      {editUser && (
        <EditPopup user={editUser} closePopup={() => setEditUser(null)} setUsers={setUsers} />
      )}
    </>
  );
};

export default UserTable;
