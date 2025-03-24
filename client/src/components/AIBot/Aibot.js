import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';
import { IconButton, Tooltip, Button } from '@mui/material';
import useStyles from './styles';

const Aibot = () => {
    const classes = useStyles();
    const [showSubmit, setShowSubmit] = useState(false);

    const handleSubmit = () => {
        // Handle the AI enhancement here
        console.log('AI enhancement submitted');
        setShowSubmit(false);
    };

    return (
        <div className={classes.aibotContainer}>
            <Tooltip 
                title="Add a pinch of AI and make your memory more professional"
                arrow
            >
                <div>
                    <Tooltip
                        title={
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={handleSubmit}
                                sx={{ 
                                    width: '100%',
                                    textTransform: 'none',
                                    fontSize: '0.9rem'
                                }}
                            >
                                SUBMIT
                            </Button>
                        }
                        open={showSubmit}
                        onClose={() => setShowSubmit(false)}
                        arrow
                        disableFocusListener
                        disableTouchListener
                    >
                        <IconButton 
                            className={classes.iconButton}
                            onClick={() => setShowSubmit(!showSubmit)}
                            sx={{ 
                                color: '#1976d2',
                                padding: '12px',
                                '&:hover': { 
                                    color: '#1565c0',
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                }
                            }}
                        >
                            <AutoAwesomeIcon sx={{ fontSize: 35 }} />
                        </IconButton>
                    </Tooltip>
                </div>
            </Tooltip>
        </div>
    )
}

export default Aibot;