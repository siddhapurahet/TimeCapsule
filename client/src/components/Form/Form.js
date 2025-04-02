import React, {useState, useEffect, useRef} from "react";
import useStyles from './styles';
import { TextField, Button, Typography, Paper, IconButton, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Aibot from '../AIBot/Aibot';

const Form = ({currentId, setcurrentId}) => {
    const [postData, setpostData] = useState({ 
        title: '', 
        message: '', 
        tags: '', 
        selectedFiles: [] 
    });
    const { posts } = useSelector((state) => state.posts);
    const post = currentId ? posts.find((p) => p._id === currentId) : null;
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const fileInputRef = useRef(null);

    useEffect(() => {
        if(post) {
            setpostData({
                title: post.title,
                message: post.message,
                tags: post.tags.join(','),
                selectedFiles: post.selectedFiles || []
            });
        }
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const tagsArray = postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
            const postDataWithFiles = {
                ...postData,
                tags: tagsArray,
                name: user?.result?.name,
                selectedFiles: postData.selectedFiles
            };

            if(currentId) {
                await dispatch(updatePost(currentId, postDataWithFiles));
                console.log('Updated Post Data:', postDataWithFiles);
            } else {
                await dispatch(createPost(postDataWithFiles));
                console.log('Created Post Data:', postDataWithFiles);
            }
            clear();
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    }

    const clear = () => {
        setcurrentId(null);
        setpostData({ title: '', message: '', tags: '', selectedFiles: [] });
    }

    const handleFileUpload = ({ base64 }) => {
        if (postData.selectedFiles.length < 5) {
            setpostData({ ...postData, selectedFiles: [...postData.selectedFiles, base64] });
        }
    };

    const handleRemoveFile = (index) => {
        const newFiles = postData.selectedFiles.filter((_, i) => i !== index);
        setpostData({ ...postData, selectedFiles: newFiles });
    };

    const handleAddFile = () => {
        fileInputRef.current.click();
    };

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please Sign In to create post.
                </Typography>
            </Paper>
        )
    }
    
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6" align="center" gutterBottom>
                    {currentId ? 'Correcting' : 'Crafting'} a Memory
                </Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth 
                    value={postData.title} 
                    onChange={(e) => setpostData({...postData, title: e.target.value})} 
                />
                <div style={{ position: 'relative', width: '100%' }}>
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth 
                        multiline 
                        rows={4}
                        value={postData.message} 
                        onChange={(e) => setpostData({...postData, message: e.target.value})} 
                    />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '8px', 
                        right: '8px',
                        zIndex: 1,
                        backgroundColor: 'transparent'
                    }}>
                        <Aibot 
                            message={postData.message}
                            onMessageUpdate={(enhancedMessage) => setpostData({...postData, message: enhancedMessage})}
                        />
                    </div>
                </div>
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags eg. Travelling,Paragliding,New journey etc" 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setpostData({...postData, tags: e.target.value})} 
                />
                <Box className={classes.fileInput}>
                    <Typography variant="subtitle1" gutterBottom>
                        Upload Images (Maximum - 5)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {postData.selectedFiles.map((file, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <img 
                                    src={file} 
                                    alt={`Upload ${index + 1}`} 
                                    style={{ 
                                        width: '100px', 
                                        height: '50px', 
                                        objectFit: 'cover',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd'
                                    }} 
                                />
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveFile(index)}
                                    sx={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        backgroundColor: 'white',
                                        '&:hover': {
                                            backgroundColor: 'white',
                                        }
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        ))}
                        {postData.selectedFiles.length < 5 && (
                            <Box 
                                sx={{ 
                                    width: '100px', 
                                    height: '50px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    border: '2px dashed #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: '#666',
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                                onClick={handleAddFile}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onloadend = () => {
                                                handleFileUpload({ base64: reader.result });
                                            };
                                        }
                                    }}
                                />
                                <AddIcon sx={{ fontSize: 40, color: '#666' }} />
                            </Box>
                        )}
                    </Box>
                </Box>
                <Button 
                    className={classes.buttonSubmit} 
                    style={{ marginBottom: '10px' }} 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    type="submit" 
                    fullWidth
                >
                    {currentId ? 'Update' : 'Submit'}
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    size="small" 
                    onClick={clear} 
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    )
};

export default Form;