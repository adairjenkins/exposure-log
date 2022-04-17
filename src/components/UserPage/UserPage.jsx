import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({type: 'GET_TARGET'})
  }, []);

  const user = useSelector((store) => store.user);

  const targetList = useSelector(store => store.target);
  console.log('targetList from store:', targetList);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
