import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Box sx={{marginTop:"100px", marginLeft:"20px"}}>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>
    </Box>
  );
}

export default RegisterPage;
