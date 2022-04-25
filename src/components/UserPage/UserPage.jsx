import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Typography, Button, Box, Grid, Card, GridTextField, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';

function UserPage() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');

  const updateGoals = () => {
    const goalsObj = {dailyGoal, weeklyGoal}
    console.log('updateGoals:', goalsObj);
    dispatch({type: 'EDIT_GOAL', payload: goalsObj});
    setDailyGoal('');
    setWeeklyGoal('');
  }

  return (
    <Box>
      <Typography color="red">make inputs for daily and weekly goals</Typography>
      <form onSubmit={updateGoals}>
        <TextField
        label="Daily Goal"
          type="number"
          variant="outlined"
          value={dailyGoal}
          onChange={(event) => setDailyGoal(event.target.value)}
        />
        <br/>
        <TextField
          label="Weekly Goal"
          type="number"
          variant="outlined"
          value={weeklyGoal}
          onChange={(event) => setWeeklyGoal(event.target.value)}
        />
        <br/>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}

export default UserPage;
