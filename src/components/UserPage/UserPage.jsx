import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, TextField, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

function UserPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_TARGET' })
  }, []);

  const user = useSelector((store) => store.user);
  const [formValue, setFormValue] = useState('');
  const targetList = useSelector(store => store.target);
  console.log('targetList from store:', targetList);

  const submitTargetForm = () => {
    console.log('submitTargetForm value:', formValue);
    dispatch({ type: 'ADD_TARGET', payload: {fear: formValue}});
    setFormValue('');
  }

  return (
    <Box>
      <form onSubmit={submitTargetForm}>
        <TextField
          label="Add new target fear"
          variant="outlined"
          value={formValue}
          sx={{ minWidth: 320 }}
          onChange={(event) => setFormValue(event.target.value)}
        />
        <IconButton type='submit'>
          <Add />
        </IconButton>
      </form>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
