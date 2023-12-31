import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('Profile')));
  const dispatch = useDispatch()
  const history = useNavigate()
  const location = useLocation()
  console.log(user);

  const logout = () => {
    dispatch({type: "LOGOUT",})
    history('/')
    setUser(null)
  }

  useEffect(() => {
    const token = user?.token;

    // JWT checking for expired token to log user out
    if(token) {
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) logout()
    }


    setUser(JSON.parse(localStorage.getItem('Profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        <img src={memoriesText} alt='icon' height='45px'/>
        <img
          className={classes.image}
          src={memoriesLogo}
          alt='memories'
          height='40px'
        ></img>
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture ?? user.result.name.charAt(0)}
            />
            <Typography className={classes.userName} variant='h6'>
              {user.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
