import React, { useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import GoogleAuthLogin from './GoogleAuth';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const Navigate = useHistory();
    
    const handleShowPassword = () => {
      setShowPassword((prevPassword) => !prevPassword);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(formData);
      if(isSignUp) {
        dispatch(signup(formData, Navigate));
      } else {
          dispatch(signin(formData, Navigate));
      }
    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    }

    const switchMode = () => {
      setIsSignUp((prevState) => !prevState);
      setShowPassword(false);
    }

    const googleSuccess = async(res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        // console.log(result);
        console.log(res);
        dispatch({type: 'AUTH', data: {result, token}});
      } catch(error) {
        console.log(error);
      }
    }

    const googleFailure = (error) => {
      console.log(error);
      console.log("Google Sign In was unsuccessfull. Try again later");
    }
    
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <> 
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleAuthLogin />
          {/* <GoogleLogin 
            clientId='CLIENT_ID'
            render={(renderProps) => (
              <Button 
                className={classes.googleButton} 
                color='primary'   
                fullWidth 
                onClick={renderProps.onClick} 
                disabled={renderProps.disabled} 
                startIcon={<Icon />}  
                variant="contained">
                  Google Sign In...
                </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          /> */}
          <Grid item>
            <Button onClick={switchMode}>
              {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;