import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation,  } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPost, getPostBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import useStyles from './styles'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery')
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTags = (tag) => setTags([...tags, tag])

  const handleDeleteTags = (tagToDelete) => setTags((tags).filter((tag) => tag !== tagToDelete))

  const searchPost = () => {
    if(search.trim() || tags) {
      // dispatch the search
      dispatch(getPostBySearch({search: search, tags: tags.join(',')}))
      history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history('/')
    }
  }

  const handleKeyPress = (event) => { 
    if (event.keyCode === 'Enter') {
      searchPost()
    }
  }
  
  // useEffect(() => {
  //   dispatch(getPost());
  // }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          className={classes.gridContainer}
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          

          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField 
                name='search'
                variant='outlined'
                label='Search Memories' 
                fullWidth
                value={search} 
                onKeyPress={handleKeyPress}
                onChange={(e) => { setSearch(e.target.value) }} 
              />
              <ChipInput 
                style={{ margin: '10px 0'}}
                value={tags}
                onAdd={handleAddTags} 
                onDelete={handleDeleteTags}
                label="Search Tags" 
                variant='outlined'
              />
              <Button variant='contained' onClick={searchPost} className={classes.searchButton} color='primary'>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={page}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
