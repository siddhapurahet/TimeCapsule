import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useStyles from './styles';

const ScrollToTop = () => {
    const classes = useStyles();
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && 
                <Tooltip title="Scroll to top" arrow>
                    <IconButton
                        onClick={scrollToTop}
                        className={classes.scrollButton}
                        sx={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#1565c0'
                            }
                        }}
                    >
                        <KeyboardArrowUpIcon />
                    </IconButton>
                </Tooltip>
            }
        </>
    );
};

export default ScrollToTop; 