import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Stack } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={{marginTop:"100px", marginLeft:"20px"}}>
      <RegisterForm />
    </Box>
  );
}

export default RegisterPage;
