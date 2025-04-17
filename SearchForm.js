import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

const SearchForm = ({ setUsers }) => {
  const [searchData, setSearchData] = useState({
    firstName: '', lastName: '', middleName: '', city: '',
    state: '', country: '', zip: '', ssn: '', phnNum: ''
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const searchParams = Object.fromEntries(
      Object.entries(searchData).filter(([_, value]) => value !== '')
    );

    try {
      const res = await axios.post('http://localhost:8080/users/search', searchParams);
      setUsers(res.data);
    } catch (err) {
      console.error('Search error:', err);
      alert('Search failed. Please try again.');
    }
  };

  const isSearchDisabled = Object.values(searchData).every(val => val === '');

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {Object.keys(searchData).map((key) => (
          <Grid item xs={12} sm={4} md={3} key={key}>
            <TextField
              label={key}
              name={key}
              value={searchData[key]}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={isSearchDisabled}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SearchForm;
