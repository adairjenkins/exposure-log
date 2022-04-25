import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, TextField, Box, Grid, Card, GridTextField, IconButton } from '@mui/material';


function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');


  return (
    <Box>
      make inputs for daily and weekly goals
      <form>
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
      </form>
    </Box>
  );
}

export default UserPage;
