import React, { useEffect, useRef, useState } from "react";
import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector, useDispatch } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import { getPosts } from "../../actions/posts";
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Posts = ({ setcurrentId }) => {
    const { posts, isLoading, numberOfPages } = useSelector((state) => state.posts);
    const [page, setPage] = useState(1);
    const observer = useRef();
    const lastPostRef = useRef();
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts(1));
    }, [dispatch]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 0.5
        };

        observer.current = new IntersectionObserver((entries) => {
            const [target] = entries;
            if (target.isIntersecting && page < numberOfPages && !isLoading) {
                setPage((prevPage) => prevPage + 1);
                dispatch(getPosts(page + 1));
            }
        }, options);

        if (lastPostRef.current) {
            observer.current.observe(lastPostRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [dispatch, page, numberOfPages, isLoading]);

    if (!posts?.length && !isLoading) return 'No posts';

    return (
        <div style={{ width: '100%', position: 'relative' }}>
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
                {Array.isArray(posts) && posts.map((post, index) => (
                    <Grid 
                        key={post._id} 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3}
                        ref={index === posts.length - 1 ? lastPostRef : null}
                        sx={{
                            display: 'flex',
                            height: '100%'
                        }}
                    >
                        <Post post={post} setcurrentId={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
            {isLoading && (
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    padding: '20px',
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    width: '100%'
                }}>
                    <CircularProgress />
                </div>
            )}
            <ScrollToTop />
        </div>
    );
};

export default Posts;