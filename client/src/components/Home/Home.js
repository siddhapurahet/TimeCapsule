import React, { useState, useEffect } from 'react'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import PaginationComponent from '../Pagination/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setcurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    const searchPost = () => {
        if(search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        } else {
            navigate('/');
        }
    }

    const handleKeyUp = (e) => {
        if(e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (singleTag) => {setTags([...tags, singleTag])};

    const handleDelete = (singleTagToDelete) => setTags(tags.filter((tag) => tag !== singleTagToDelete));

    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setcurrentId={setcurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField 
                                    name='search' 
                                    variant='outlined'
                                    label='Search your TimeCapsule'
                                    onKeyUp={handleKeyUp}
                                    fullWidth
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <ChipInput 
                                    style={{margin: '10px 0'}}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label='Search Tags'
                                    variant='outlined'
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant='contained' color="primary">Search</Button>
                            </AppBar>
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