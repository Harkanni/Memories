import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizonIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useLocation } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const [user, setUser] = useState(null);

// THIS IS THE QUICK UX FEATUES BRANCH
const [likes, setLikes] = useState(post?.likes);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('Profile')));
  }, [location]);

  const hasLikedPost = post.likes.find((like) => like === (user?.googleId || user?.result?._id))
  const userId = user?.result.googleId || user?.result?._id

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if(hasLikedPost) { 
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId]);
    }
}

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === (userId)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 3
            ? `You and ${likes.length} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
      </>
    );
  };

  const openPost = () => {
    history(`/posts/${post._id}`);
  }

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase 
        className={classes.cardAction} 
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        ></CardMedia>
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: 'white' }}
              size='small'
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizonIcon fontSize='medium'></MoreHorizonIcon>
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color='textSecondary'>
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant='h5' gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          disabled={!user?.result}
          color='primary'
          onClick={handleLike}
        >
          {/* <ThumbUpAltIcon fontSize='small' />
          &nbsp; Like &nbsp; {likes.length} */}
          <Likes />
        </Button>
        {(user?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='#fff'
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize='small' color='error' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
