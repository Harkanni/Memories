import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import Icon from './Icon';
// import { GoogleLogin } from 'react-google-login';
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

import useStyles from './styles';
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import axios from 'axios';

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPasword) => !prevShowPasword);
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleSuccess(codeResponse),
    onError: (error) => console.log(error),
    onNonOAuthError: (error) => console.log(error),
    flow: 'implicit'
  });

  const googleSuccess = async (codeResponse) => {
    const token = codeResponse.access_token
    const result = await getUserInfo(token)
    
    try {
      dispatch({type: "AUTH", data: {result, token}})
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const getUserInfo = async (access_token) =>{
    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, Headers = {
      Authorization: `Bearer ${access_token}`
    })
    return data
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutLinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={() => handleSubmit()}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              type='email'
              name='email'
              label='Email Address'
              handleChange={handleChange}
            />
            <Input
              type={showPassword ? 'text' : 'password'}
              name='password'
              label='Password'
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                type='password'
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button
            className={classes.googleButton}
            color='primary'
            fullWidth
            onClick={() => login()}
            startIcon={<Icon />}
            variant='contained'
          > Google Sign In </Button>

          {/* <GoogleLogin
            clientId='454950466383-6ijsqpnd0i0el2fnrptkqfm7hba4dokb.apps.googleusercontent.com'
            // render={(renderProps) => (
            //   <Button
            //     className={classes.googleButton}
            //     color='primary'
            //     fullWidth
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //     startIcon={<Icon />}
            //     variant='contained'
            //   >Google Sign In</Button>
            // )}
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy='single_host_origin'
          /> */}

          <Grid container justifyContent='center'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account ? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
