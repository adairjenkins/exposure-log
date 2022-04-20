import React from 'react';
import { useHistory } from 'react-router-dom';
import { Home, ChangeHistory, Add, FormatListBulleted } from '@mui/icons-material';
import { Paper, BottomNavigation, Box, BottomNavigationAction } from '@mui/material';

function BottomBar() {
  const history = useHistory();
  
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="HOME"
          icon={<Home/>}
          onClick={() => { history.push('/home') }}
        />
        <BottomNavigationAction 
          label="HIERARCHY" 
          icon={<ChangeHistory/>}
          onClick={() => { history.push('/hierarchy') }}
        />
        <BottomNavigationAction
          label="LOG EXPOSURE"
          icon={<Add/>}
          onClick={() => { history.push('/exposure-form') }}
        />
        <BottomNavigationAction
          label="HISTORY"
          icon={<FormatListBulleted/>}
          onClick={() => { history.push('/history') }}
        />
      </BottomNavigation>
    </Paper>  
  )
}

export default BottomBar;
