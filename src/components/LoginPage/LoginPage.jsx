import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Box sx={{ marginTop: "100px", marginLeft: "20px" }}>
      <LoginForm />
      <Stack direction="row" sx={{marginLeft:3, marginTop:10}}>
        <Typography color="#666666" sx={{ fontSize: 20 }}>New user?</Typography>
        <Button sx={{fontSize:18, padding:0, marginLeft:2}}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </Stack>
    </Box>
  );
}

export default LoginPage;
