import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import timeCapsule from './images/timeCapsule.jpg'
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from './styles';
import { useDispatch } from "react-redux";
import {getPosts} from './actions/posts';

const App = () => {
    const [currentId, setcurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container maxwidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">TimeCapsule</Typography>
                <img className={classes.image} src={timeCapsule} alt="TimeCapsule" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setcurrentId={setcurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setcurrentId={setcurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;