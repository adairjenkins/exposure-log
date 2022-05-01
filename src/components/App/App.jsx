import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import BottomBar from '../BottomBar/BottomBar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Hierarchy from '../Hierarchy/Hierarchy';
import History from '../History/History';
import TargetForm from '../TargetForm/TargetForm';
import TopBar from '../TopBar/TopBar';
import ExposureForm from '../Exposure/ExposureForm';
import Home from '../HomeView/Home';
import './App.css';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#247ebf',
    },
    secondary: {
      main: '#98A991',
    },
    background: {
      default: '#f5f9fc',
      //paper: '#FFFFF',
    },
  },
});

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'GET_USER' });
  }, [dispatch]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        < CssBaseline/>
        < Route path="/:url">
          < TopBar />
        </Route>
        {/* <Nav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route exact path="/about" >
            {/* shows AboutPage at all times (logged in or not) */}
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute exact path="/user" >
            {/* logged in shows UserPage else shows LoginPage */}
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info" >
            {/* logged in shows InfoPage else shows LoginPage */}
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login" >
            {/* If the user is already logged in, redirect to the /user page;
                Otherwise, show the login page*/}
            {user.id ? <Redirect to="/home" /> : <LoginPage />}
          </Route>

          <Route exact path="/registration" >
            {/*If the user is already logged in, redirect them to the /user page;
               Otherwise, show the registration page*/}
            {user.id ? <Redirect to="/user" /> : <RegisterPage />}
          </Route>

          <ProtectedRoute exact path="/home">
            {/*If the user is already logged in, redirect them to the /user page; 
               Otherwise, show the Landing page */}
            {/* { user.id ? <Redirect to="/user"/> : <LandingPage/> } */}
            < Home />
          </ProtectedRoute>

          <ProtectedRoute exact path="/exposure-form/:id">
            < ExposureForm
              isEdit={false}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/exposure-form">
            < ExposureForm
              isEdit={false}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/exposure-edit/:id">
            < ExposureForm
              isEdit={true}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/target-form">
            < TargetForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/hierarchy">
            < Hierarchy />
          </ProtectedRoute>

          {/* <ProtectedRoute exact path="edit/hierarchy/:id">
            < EditHierarchy/>
          </ProtectedRoute> */}

          <ProtectedRoute exact path="/history">
            < History />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <BottomBar />
      </ThemeProvider>
    </Router>
  );
}

export default App;
