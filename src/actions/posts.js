import * as api from '../api';

import { CREATE, UPDATE, DELETE, FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

// ACTION CREATORS

// GET A SING POST
export const getPost = (page) => async (dispatch) => {
  console.log('getPost called');
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.fetchPost(page);
    dispatch({ type: FETCH_POST, payload: data });

    dispatch({ type: END_LOADING})    
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})


    const { data } = await api.fetchPosts(page);
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
    dispatch({ type: END_LOADING})    
  } catch (error) {
    console.log(error.message);
  }
};



export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
    
    const action = { type: FETCH_BY_SEARCH, payload: data };
    dispatch(action);
    
    console.log(data);
    dispatch({ type: END_LOADING})
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.createPost(post)

    history(`/posts/${data._id}`)
    dispatch({ type: CREATE, payload: data})

    dispatch({ type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.updatePost(id, post)

    dispatch({ type: UPDATE, payload: data })
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error.message)
  }
}

export const deletePost = (id) => async(dispatch) => {
  try {    dispatch({type: START_LOADING})
    await api.deletePost(id)

    dispatch({type: DELETE, payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id)

    dispatch({ type: LIKE, payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id)

    dispatch({ type: COMMENT, payload: data})


    return data.comment

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}