import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';
import { Home, ChangeHistory, Add, FormatListBulleted } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

function Footer() {
  const history = useHistory();
  
  return (
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
  )
}

export default Footer;
