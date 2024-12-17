import React, { useState, useEffect } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import PaginationComponent from '../Pagination/Pagination';

const Home = () => {
    const [currentId, setcurrentId] = useState(null);
    // const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setcurrentId={setcurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setcurrentId={setcurrentId}/>
                            <Paper elevation={6}>
                                <PaginationComponent />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;