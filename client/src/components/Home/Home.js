import React, { useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Grid2 } from "@mui/material";
import useStyles from './styles';

const Home = () => {
    const [currentId, setcurrentId] = useState(0);
    const classes = useStyles();
    
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid2 container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid2 item xs={12} sm={6} md={9}>
                        <Posts setcurrentId={setcurrentId}/>
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3}>
                        <Form currentId={currentId} setcurrentId={setcurrentId}/>
                    </Grid2>
                </Grid2>
            </Container>
        </Grow>
    )
}

export default Home;