import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';
import { IconButton, Tooltip, TextField, Button } from '@mui/material';
import useStyles from './styles';

const Aibot = () => {
    const classes = useStyles();
    const [prompt, setPrompt] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);

    const handlePromptSubmit = () => {
        // Handle the prompt submission here
        console.log('Prompt submitted:', prompt);
        setPrompt('');
        setShowPrompt(false);
    }

    const handleClick = (event) => {
        // Prevent closing if clicking inside the tooltip
        if (event.target.closest('.MuiTooltip-tooltip')) {
            return;
        }
        setShowPrompt(false);
    };

    return (
        <div className={classes.aibotContainer}>
            <Tooltip 
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
                            sx={{
                                '& .MuiInputBase-root': {
                                    wordWrap: 'break-word',
                                    whiteSpace: 'pre-wrap',
                                    overflowWrap: 'break-word',
                                    maxWidth: '100%',
                                },
                                '& .MuiInputBase-input': {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }
                            }}
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
                disableFocusListener
                disableHoverListener
                disableTouchListener
            >
                <IconButton 
                    className={classes.iconButton}
                    onClick={() => setShowPrompt(!showPrompt)}
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
    )
}

export default Aibot;