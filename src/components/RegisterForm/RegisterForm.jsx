import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Stack, InputLabel, TextField, Button } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        firstName: firstName
      },
    });
  }; // end registerUser

  return (
    <Box sx={{ margin: 3 }}>
      <form className="formPanel" onSubmit={registerUser}>
        <Typography variant="h5">Register User</Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <Stack direction="row" sx={{ mt: 3 }}>
          <InputLabel htmlFor="firstName" sx={{ paddingTop: 1, marginRight: 1, fontSize: 18 }}>First Name:</InputLabel>
          <TextField
            size="small"
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 3 }}>
          <InputLabel htmlFor="username" sx={{ paddingTop: 1, marginRight: 2, fontSize: 18 }}>Username:</InputLabel>
          <TextField
            size="small"
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
          <InputLabel htmlFor="password" sx={{ paddingTop: 1, marginRight: 2, fontSize: 18 }}>Password:</InputLabel>
          <TextField
            size="small"
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: 3 }}>
          <Button variant="contained" type="submit" sx={{ mt: 3 }}>
            REGISTER
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default RegisterForm;
