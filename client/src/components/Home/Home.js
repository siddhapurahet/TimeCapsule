import React, { useState } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import { Container, Grow, Grid2, Box } from "@mui/material";
import useStyles from './styles';

const Home = () => {
    const [currentId, setcurrentId] = useState(0);
    const classes = useStyles();
    
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Box className={classes.mainContainer}>
                    {/* Online Users Sidebar */}
                    <Box className={classes.sidebar}>
                        <OnlineUsers />
                    </Box>
                    
                    {/* Main Content */}
                    <Box className={classes.content}>
                        <Grid2 container direction="column" spacing={3} className={classes.gridContainer}>
                            <Grid2 item xs={12}>
                                <Posts setcurrentId={setcurrentId}/>
                            </Grid2>

                            <Grid2 item xs={12}>
                                <Form currentId={currentId} setcurrentId={setcurrentId}/>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Box>
            </Container>
        </Grow>
    )
}

export default Home;