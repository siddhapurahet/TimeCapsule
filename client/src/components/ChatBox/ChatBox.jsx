import React, { useState, useEffect, useRef } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useStyles from './styles';

const ChatBox = ({ postId, otherUserId, otherUserName, currentUserId, currentUserName }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages (placeholder - you'll need to implement API call)
  useEffect(() => {
    // TODO: Fetch messages from backend
    // For now, initialize with empty array
    setMessages([]);
  }, [postId, otherUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      text: newMessage,
      senderId: currentUserId,
      senderName: currentUserName,
      receiverId: otherUserId,
      receiverName: otherUserName,
      postId: postId,
      timestamp: new Date().toISOString()
    };

    // Add message to local state immediately (optimistic update)
    setMessages([...messages, message]);
    setNewMessage('');

    try {
      // TODO: Send message to backend API
      // await sendMessageAPI(message);
      console.log('Message sent:', message);
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove message from state if send failed
      setMessages(messages);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper className={classes.chatBox} elevation={3}>
      <Box className={classes.chatHeader}>
        <Typography variant="h6" className={classes.chatTitle}>
          Chat with {otherUserName}
        </Typography>
      </Box>
      <Divider />
      
      <Box className={classes.messagesContainer}>
        <List className={classes.messagesList}>
          {messages.length === 0 ? (
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body2" color="textSecondary" className={classes.noMessages}>
                    No messages yet. Start the conversation!
                  </Typography>
                }
              />
            </ListItem>
          ) : (
            messages.map((msg, index) => (
              <ListItem
                key={index}
                className={msg.senderId === currentUserId ? classes.messageSent : classes.messageReceived}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      className={msg.senderId === currentUserId ? classes.sentMessageText : classes.receivedMessageText}
                    >
                      {msg.text}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  }
                />
              </ListItem>
            ))
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Divider />
      <Box className={classes.inputContainer}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className={classes.messageInput}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          className={classes.sendButton}
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBox;
