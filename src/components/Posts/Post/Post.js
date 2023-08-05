import React, { useEffect, useState, } from 'react'
import useStyles from './styles'
import { Card,CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useLocation } from 'react-router-dom';



const Post = ({ post, setCurrentId }) => {
  // console.log(post)
  const classes = useStyles();
  const dispatch = useDispatch()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('Profile')))
  }, [location])    

  
  const Likes = () => {
    if(post.likes.length > 0){
      return post.likes.find((like) => like === (user?.googleId || user?.result?._id))
        ? (
          <>
            <ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length > 3 ? `You and ${post.likes.length} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
          </>
        ) : (
          <>
            <ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length} {post.likes.length === 1  ? 'Like' : 'Likes'}
          </>
        )
    }
    
    return <><ThumbUpAltOutlined fontSize='small' /></>
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
            <MoreHorizonIcon fontSize='medium'></MoreHorizonIcon>
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' disabled={!user?.result} color='primary' onClick={() => { dispatch(likePost(post._id)) }}>
          {/* <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp; {post.likes.length} */}
          <Likes />
        </Button>
        {(user?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => {dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize='small' />
            Delete
        </Button>
        )}
        
      </CardActions>
      
    </Card>
  )
}

export default Post
