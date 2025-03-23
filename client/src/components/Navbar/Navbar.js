import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Typography, Toolbar, IconButton, Tooltip, TextField } from '@mui/material';
import useStyles from './styles';
import timeCapsule from '../../images/timeCapsule.jpg';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Aibot from '../AIBot/Aibot';
// import authReducer from '../../reducers/auth';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useHistory();
    const location = useLocation();
    // const [prompt, setPrompt] = useState('');
    // const [showPrompt, setShowPrompt] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); // Start with null

    useEffect(() => {
        const token = user?.token;
        if(token) {
            const decodeToken = jwtDecode(token);
            if(decodeToken.exp * 1000 < new Date().getTime()) {
                logOut();
            }
        }
        const profile = JSON.parse(localStorage.getItem('profile'));
        setUser(profile);
    }, [location]); // Runs once on component mount

    // console.log('User in Navbar:', user);
    // const userProfile = localStorage.getItem('profile');
    // console.log('Profile from localStorage:', user);

    const logOut = () => {
        dispatch({type: LOGOUT});
        navigate.push('/');
        setUser(null);
    }

    // const handlePromptSubmit = () => {
    //     // Handle the prompt submission here
    //     console.log('Prompt submitted:', prompt);
    //     setPrompt('');
    //     setShowPrompt(false);
    // }
    
    return (
        <span>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">TimeCapsule</Typography>
                    <img className={classes.image} src={timeCapsule} alt="TimeCapsule" height="60"/>
                </div>
                <Toolbar className={classes.toolbar}>
                    
                    {/* <Tooltip 
                        title={
                            <div className={classes.promptContainer}>
                                <TextField
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    placeholder="Enter your prompt here..."
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    fullWidth
                                    size="small"
                                />
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={handlePromptSubmit}
                                    sx={{ mt: 1 }}
                                >
                                    Submit
                                </Button>
                            </div>
                        }
                        open={showPrompt}
                        onClose={() => setShowPrompt(false)}
                        arrow
                    >
                        <IconButton 
                            onClick={() => setShowPrompt(!showPrompt)}
                            sx={{ color: '#1976d2', '&:hover': { color: '#1565c0' } }}
                        >
                            <AutoAwesomeIcon />
                        </IconButton>
                    </Tooltip> */}
                    {user ? (
                        <div className={classes.profile}> 
                            <Avatar className={classes.purple} alt={user.givenName} src={user.imageUrl}>user.givenName.charAt(0)</Avatar>
                            <Typography className={classes.userName} variant='h6'>{user.givenName}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                        </div>) : (
                            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>

            <Aibot />

        </span>
    )
}

export default Navbar; 