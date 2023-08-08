import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  console.log(post)
  const classes = useStyles();
  const dispatch = useDispatch();
  const [COMMENTS, SETCOMMENTS] = useState(post?.comments);
  console.log('This is post?.comments', post?.comments)
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('Profile'));
  const commentRef = useRef()

  useEffect(() => {
    SETCOMMENTS(post.comments);
  }, [post])

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComment = dispatch(commentPost(finalComment, post._id));
    // newComment.then((comment) => console.log('This is Then: ',comment))
    console.log('This is the newComment', newComment);

    newComment.then((comment) => {
      console.log('This is the comment promise: ',comment);
      SETCOMMENTS(comment.comments)
      setComment('')

      commentRef.current.scrollIntoView({ behaviour: 'smooth' })
    })

    
  };

  console.log(post);
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant='h6'>
            Comments
          </Typography>
          {COMMENTS.map((comment, i) => (
            <Typography key={i} gutterBottom variant='subtitle1'>
              <strong> { comment.split(': ')[0] } </strong>
              { comment.split(':')[1] }
            </Typography>
          ))}

          <div ref={commentRef} />

        </div>
        {user?.result.name && (
          <div style={{ width: '70%' }}>
            <Typography gutterBottom variant='h6'>
              Write a comment!
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant='outlined'
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant='contained'
              color='primary'
              onClick={(e) => handleClick(e)}
            >
              Soro soke, Let's hear you
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
