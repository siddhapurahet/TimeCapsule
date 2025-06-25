import React from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Sidebar = () => {
    return (
        <div style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            padding: '15px 10px',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
            <IconButton 
                sx={{ 
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }
                }}
            >
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default Sidebar;