import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Stack, Typography, Input, Box, TextField, InputLabel } from '@mui/material';
import { useHistory } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      dispatch({ type: 'GET_EXPOSURE'});
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    history.push('/home');
  }; // end login

  const secretButtonLogin = () => {
    console.log('secret button');
    setUsername('adairjenkins');
    setPassword('1234');
  }

  return (
    <Box sx={{ margin: 3 }}>
      <form className="formPanel" onSubmit={login}>
        <Typography variant="h5">Login</Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Stack direction="row" sx={{ mt: 3 }}>
          <InputLabel htmlFor="username" sx={{paddingTop:1, marginRight:2, fontSize:18}} onClick={secretButtonLogin}>Username:</InputLabel>
            <TextField
              type="text"
              name="username"
              size="small"
              variant="outlined"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
        </Stack>
        <Stack direction="row" sx={{ mt: 2 }}>
          <InputLabel htmlFor="password" sx={{paddingTop:1, marginRight:2, fontSize:18}}>Password:</InputLabel>
          <TextField
            size="small"
            variant="outlined"
            type="password"
            name="password"
            // label="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>
          <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight:3 }}>
        <Button variant="contained" type="submit" sx={{ mt: 3}}>SUBMIT</Button>
        </Box>
        {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}
      </form>
    </Box>
  );
}

export default LoginForm;
