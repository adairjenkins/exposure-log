import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Home, Login, Info, ChangeHistory, Add, FormatListBulleted } from '@mui/icons-material';
import { Paper, BottomNavigation, Box, BottomNavigationAction } from '@mui/material';

function BottomBar() {
  const history = useHistory();
  const user = useSelector(store => store.user);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      {user.id ?
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="HOME"
            icon={<Home />}
            onClick={() => { history.push('/home') }}
          />
          <BottomNavigationAction
            label="HIERARCHY"
            icon={<ChangeHistory />}
            onClick={() => { history.push('/hierarchy') }}
          />
          <BottomNavigationAction
            label="LOG EXPOSURE"
            icon={<Add />}
            onClick={() => { history.push('/exposure-form') }}
          />
          <BottomNavigationAction
            label="HISTORY"
            icon={<FormatListBulleted />}
            onClick={() => { history.push('/history') }}
          />
        </BottomNavigation>
        :
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="ABOUT"
            icon={<Info />}
            onClick={() => { history.push('/about') }}
          />
          <BottomNavigationAction
            label="LOGIN"
            icon={<Login />}
            onClick={() => { history.push('/login') }}
          />
        </BottomNavigation>
      }
    </Paper>
  )
}

export default BottomBar;
