import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const PasswordChecklist = ({ password, validations }) => {
  const checklistItems = [
    {
      text: 'Password length: 5-10 characters',
      isValid: validations.minLength && validations.maxLength
    },
    {
      text: 'Contains exactly 1 special character',
      isValid: validations.hasOneSpecialChar
    },
    {
      text: 'No spaces allowed',
      isValid: validations.noSpaces
    },
    {
      text: 'Numbers are allowed',
      isValid: validations.canContainNumbers
    }
  ];

  return (
    <Box sx={{ mt: 1, mb: 1 }}>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
        Password Requirements:
      </Typography>
      <List dense sx={{ py: 0 }}>
        {checklistItems.map((item, index) => (
          <ListItem key={index} sx={{ py: 0, px: 0 }}>
            <ListItemIcon sx={{ minWidth: 24 }}>
              {item.isValid ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <CancelIcon color="error" fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText 
              primary={
                <Typography 
                  variant="body2" 
                  color={item.isValid ? 'success.main' : 'error.main'}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {item.text}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PasswordChecklist;
