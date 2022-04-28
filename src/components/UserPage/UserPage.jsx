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
    <Box sx={{margin:2}}>
      <Typography variant="h5" sx={{mt:4, ml:3}}>
        Exposure Goals
      </Typography>
      <form onSubmit={updateGoals}>
        <TextField
        label="Set daily goal"
          type="number"
          variant="outlined"
          value={dailyGoal}
          onChange={(event) => setDailyGoal(event.target.value)}
          sx={{marginTop:6, marginLeft:3}}
        />
        <br/>
        <TextField
          label="Set weekly goal"
          type="number"
          variant="outlined"
          value={weeklyGoal}
          onChange={(event) => setWeeklyGoal(event.target.value)}
          sx={{marginTop:4, marginLeft:3}}
        />
        <br/>
        <Button type="submit" variant="contained" sx={{marginTop:4, marginLeft:3}}>Submit</Button>
      </form>
    </Box>
  );
}

export default UserPage;
