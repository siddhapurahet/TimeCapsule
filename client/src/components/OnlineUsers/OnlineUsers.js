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
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { 
  getOnlineUsers as getOnlineUsersFromAPI,
  updateUserActivity as updateUserActivityAPI
} from '../../api/index';
import { getPostsBySearch } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../api';

const OnlineUsers = () => {
  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useHistory();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

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

  const handleChat = async (userId, userName) => {
    try {
      console.log('Chat with user:', userId, userName);
      
      // Search for posts by this user
      const searchQuery = {
        search: userName, // Search by user name
        tags: 'none'
      };
      
      // Dispatch search and wait a bit for Redux to update
      await dispatch(getPostsBySearch(searchQuery));
      
      // Use a small timeout to allow Redux state to update
      setTimeout(() => {
        // Get posts from Redux store (they should be updated by now)
        const userPosts = posts || [];
        
        // Find the most recent post by this user
        const userPost = userPosts.find(p => p.name === userName || p.creator === userId);
        
        if (userPost && userPost._id) {
          // Navigate to the user's post with chat mode enabled
          navigate.push(`/posts/${userPost._id}?chat=true&userId=${userId}`);
        } else {
          // Try direct API call as fallback
          api.fetchPostBySearch(searchQuery).then((response) => {
            const apiPosts = response.data?.data || [];
            const foundPost = apiPosts.find(p => p.name === userName || p.creator === userId);
            
            if (foundPost && foundPost._id) {
              navigate.push(`/posts/${foundPost._id}?chat=true&userId=${userId}`);
            } else {
              alert(`No posts found for ${userName}. They may need to create a post first.`);
            }
          }).catch(() => {
            alert(`No posts found for ${userName}. They may need to create a post first.`);
          });
        }
      }, 100);
    } catch (error) {
      console.error('Error finding user post:', error);
      alert('Error finding user post. Please try again.');
    }
  };

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
                className={classes.listItemText}
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
              {currentUserId && user.id !== currentUserId && (
                <Chip 
                  label="Chat" 
                  color="success" 
                  size="small"
                  className={classes.chatChip}
                  onClick={() => handleChat(user.id, user.name || 'Unknown User')}
                  clickable
                />
              )}
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
