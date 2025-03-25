import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';
import { IconButton, Tooltip, Button, Snackbar, Alert } from '@mui/material';
import useStyles from './styles';
import OpenAI from "openai";

const Aibot = ({ message, onMessageUpdate }) => {
    const classes = useStyles();
    const [showSubmit, setShowSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            console.log('Starting AI enhancement...');
            console.log('Current message:', message);
            console.log('API Key available:', !!process.env.REACT_APP_OPENAI_API_KEY);
            
            if (!message) {
                console.log('No message to enhance');
                return;
            }

            if (!process.env.REACT_APP_OPENAI_API_KEY) {
                setError('OpenAI API key is not configured');
                return;
            }

            setIsLoading(true);
            const client = new OpenAI({
                apiKey: process.env.REACT_APP_OPENAI_API_KEY
            });
            
            console.log('Making API call to OpenAI...');
            const completion = await client.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant that enhances text to make it more professional and engaging while maintaining its core message."
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
            });

            console.log('Received response from OpenAI:', completion);
            const enhancedMessage = completion.choices[0].message.content;
            console.log('Enhanced message:', enhancedMessage);
            
            onMessageUpdate(enhancedMessage);
            setShowSubmit(false);
        } catch (error) {
            console.error('Error enhancing message:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            
            if (error.message.includes('429')) {
                setError('API quota exceeded. Please try again later or contact support.');
            } else {
                setError('Failed to enhance message. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseError = () => {
        setError(null);
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
                                disabled={isLoading || !message}
                                sx={{ 
                                    width: '100%',
                                    textTransform: 'none',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {isLoading ? 'Enhancing...' : 'Enhance with AI'}
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
            <Snackbar 
                open={!!error} 
                autoHideDuration={6000} 
                onClose={handleCloseError}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Aibot;