import React, {useState, useEffect} from "react";
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import Aibot from '../AIBot/Aibot';

const Form = ({currentId, setcurrentId}) => {
    const [postData, setpostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
    const { posts } = useSelector((state) => state.posts);
    const post = currentId ? posts.find((p) => p._id === currentId) : null;
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) {
            setpostData({
                title: post.title,
                message: post.message,
                tags: post.tags.join(','),
                selectedFile: post.selectedFile
            });
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));    
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setcurrentId(null);
        setpostData({ title: '', message: '', tags: '', selectedFile: ''});
    }

    if(!user?.result?.name) {
        return (
           
            <div></div>
        )
    }
    
    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Correcting' : 'Crafting'} a Memory</Typography>
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
                    label="Tags (comma separated)" 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setpostData({...postData, tags: e.target.value})} 
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={false} 
                        onDone={({base64}) => setpostData({...postData, selectedFile: base64})} 
                    />
                </div>
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