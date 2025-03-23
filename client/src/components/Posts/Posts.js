import React from "react";
import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({setcurrentId}) => {
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    
    if(!posts?.length && !isLoading) return 'No posts';

    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid 
                className={classes.container} 
                container 
                alignItems="stretch" 
                spacing={3}
                sx={{ 
                    width: '100%',
                    margin: '0 auto',
                    padding: '20px',
                    '& > *': {
                        display: 'flex',
                        height: '100%'
                    }
                }}
            >
                {Array.isArray(posts) && posts.map((post) => (
                    <Grid 
                        key={post._id} 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3}
                        sx={{
                            display: 'flex',
                            height: '100%'
                        }}
                    >
                        <Post post={post} setcurrentId={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
};

export default Posts;