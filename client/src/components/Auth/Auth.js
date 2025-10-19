import React, { useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import GoogleAuthLogin from './GoogleAuth';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import PasswordChecklist from './PasswordChecklist';
import { validatePassword } from '../../utils/passwordValidation';

const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

const Auth = () => {
    const classes = useStyles();
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        maxLength: false,
        hasOneSpecialChar: false,
        noSpaces: false,
        canContainNumbers: true,
        isValid: false
    });
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialState);
    const Navigate = useHistory();
    
    const handleShowPassword = () => {
      setShowPassword((prevPassword) => !prevPassword);
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      setError(''); // Clear any previous errors
      
      // Validate password for signup
      if(isSignUp && !passwordValidation.isValid) {
        setError('Password not properly set. Please check the requirements below.');
        return;
      }
      
      // console.log(formData);
      if(isSignUp) {
        dispatch(signup(formData, Navigate, setError));
      } else {
          dispatch(signin(formData, Navigate, setError));
      }
    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
      
      // Validate password in real-time for signup
      if(e.target.name === 'password' && isSignUp) {
        const validation = validatePassword(e.target.value);
        setPasswordValidation(validation);
      }
    }

    const switchMode = () => {
      setIsSignUp((prevState) => !prevState);
      setShowPassword(false);
      setError(''); // Clear errors when switching modes
      setPasswordValidation({
        minLength: false,
        maxLength: false,
        hasOneSpecialChar: false,
        noSpaces: false,
        canContainNumbers: true,
        isValid: false
      }); // Reset password validation
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
        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: 10, textAlign: 'center' }}>
            {error}
          </Typography>
        )}
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
            {isSignUp && formData.password && (
              <Grid item xs={12}>
                <PasswordChecklist password={formData.password} validations={passwordValidation} />
              </Grid>
            )}
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