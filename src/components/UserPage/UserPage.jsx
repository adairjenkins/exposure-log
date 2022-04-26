import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Paper, TextField, Typography, Button, Box, Grid, Card, GridTextField, IconButton } from '@mui/material';
import { Check } from '@mui/icons-material';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {

  }, []);

  const user = useSelector((store) => store.user);
  
  const [weeklyGoal, setWeeklyGoal] = useState(user.weekly_goal ? user.weekly_goal : '');
  const [dailyGoal, setDailyGoal] = useState(user.daily_goal ? user.daily_goal : '');

  const updateGoals = () => {
    const goalsObj = {dailyGoal, weeklyGoal}
    console.log('updateGoals:', goalsObj);
    dispatch({type: 'EDIT_GOAL', payload: goalsObj});
    setDailyGoal('');
    setWeeklyGoal('');
    history.push('/home');
  }

  return (
    <Box>
      <Typography color="red">make inputs for daily and weekly goals</Typography>
      <form onSubmit={updateGoals}>
        <TextField
        label="Set daily goal"
          type="number"
          variant="outlined"
          value={dailyGoal}
          onChange={(event) => setDailyGoal(event.target.value)}
        />
        <br/>
        <TextField
          label="Set weekly goal"
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
