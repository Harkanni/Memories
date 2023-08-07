import React from 'react'
import Post from './Post/Post.js'
import useStyles from './styles'
import { Grid, CircularProgress } from '@material-ui/core'

import { useSelector } from 'react-redux'




const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts)

  console.log(posts)

  if(!posts.length && !isLoading) return 'No posts found'

  return (
    isLoading ? <CircularProgress></CircularProgress> : (
      <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        { posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
            <Post post={post} setCurrentId={setCurrentId}></Post>
          </Grid>
        )) }
      </Grid>
    )
  )
}

export default Posts
