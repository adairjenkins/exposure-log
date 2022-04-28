import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button, Typography, Box } from '@mui/material';
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
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    history.push('/home');
  }; // end login

  return (
    <Box sx={{margin:3}}>
      <form className="formPanel" onSubmit={login}>
        <Typography variant="h5">Login</Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <Box sx={{ mt: 3 }}>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </Box>
        <Box sx={{mt:2}}>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </Box>
        <Button variant="contained" type="submit" sx={{mt:3}}>SUBMIT</Button>
        {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}
      </form>
    </Box>
  );
}

export default LoginForm;
