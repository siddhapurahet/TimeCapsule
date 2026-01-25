import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Avatar,
  Box,
  Chip
} from '@mui/material';
import { green } from '@mui/material/colors';
import useStyles from './styles';
import { 
  getOnlineUsers as getOnlineUsersFromAPI,
  updateUserActivity as updateUserActivityAPI
} from '../../api/index';

const OnlineUsers = () => {
  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    // Get current user ID from localStorage
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    if (currentUser && currentUser.result) {
      setCurrentUserId(currentUser.result._id || currentUser.result.id);
    }

    const fetchOnlineUsers = async () => {
    
      try {
        console.log('Fetching online users...');
        
        // Update current user's activity
        console.log('Current user:', currentUser);        
        if (currentUser && currentUser.result) {
          console.log('Updating user activity for:', currentUser.result._id || currentUser.result.id);
          await updateUserActivityAPI(currentUser.result._id || currentUser.result.id);
        }
        
        // Fetch online users from backend
        console.log('Calling getOnlineUsersFromAPI...');
        const response = await getOnlineUsersFromAPI();
        console.log('API response:', response);
        console.log('Online users from API:', response.data.users);
        setOnlineUsers(response.data.users || []);
      } catch (error) {
        console.error('Error fetching online users:', error);
        setOnlineUsers([]);
      }
    };

    // Initial fetch
    fetchOnlineUsers();
    
    // Set up interval to update online users every 10 seconds
    const interval = setInterval(fetchOnlineUsers, 10000);
    
    // Also update on page visibility change (when user comes back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchOnlineUsers();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Paper className={classes.paper} elevation={3}>
      <Box className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          Online Users
        </Typography>
        <Chip 
          label={`${onlineUsers.length} online`} 
          color="success" 
          size="small"
          className={classes.countChip}
        />
      </Box>
      
      <List className={classes.userList}>
        {onlineUsers.length > 0 ? (
          onlineUsers.map((user) => (
            <ListItem key={user.id} className={classes.userItem}>
              <ListItemIcon>
                <Avatar 
                  className={classes.avatar}
                  sx={{ 
                    bgcolor: green[500],
                    width: 10, 
                    height: 10,
                    border: '1px solid white',
                    boxShadow: '0 0 0 1px #4caf50'
                  }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" className={classes.userName}>
                    {user.id === currentUserId ? 'You' : (user.name || 'Unknown User')}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="textSecondary">
                    {user.email || 'No email'}
                  </Typography>
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText 
              primary={
                <Typography variant="body2" color="textSecondary" className={classes.noUsers}>
                  No users online
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default OnlineUsers;
