import React from "react";
import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({setcurrentId}) => {

    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    
    if(!posts.length && !isLoading) return 'No posts';

    return (
        !posts?.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setcurrentId={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
        )
    )
};

export default Posts;