import React from 'react';
import { useHistory } from 'react-router-dom';
import './Footer.css';
import { HomeOutlined, ChangeHistory, Add, FormatListBulleted } from '@mui/icons-material';

function Footer() {
  const history = useHistory();
  
  return (
    <footer>
      <HomeOutlined onClick={() => { history.push('/home') }}/>
      <ChangeHistory onClick={() => { history.push('/hierarchy') }}/>
      <Add onClick={() => { history.push('/exposure-form') }}/>
      <FormatListBulleted onClick={() => { history.push('/history') }}/> 
    </footer>
  )
}

export default Footer;
