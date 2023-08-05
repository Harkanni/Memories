import * as api from '../api';

import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

// ACTION CREATORS

export const getPost = (page) => async (dispatch) => {
  try {
    console.log("this: is the page: ", page);
    dispatch({ type: START_LOADING})


    const { data } = await api.fetchPosts(page);
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
    console.log(data)

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

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING})
    const { data } = await api.createPost(post)
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
  try {
    dispatch({type: START_LOADING})
    await api.deletePost(id)

    dispatch({type: DELETE, payload: id})
    dispatch({type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({type: START_LOADING})
    const { data } = await api.likePost(id)

    dispatch({ type: LIKE, payload: data})
    dispatch({ type: END_LOADING})
  } catch (error) {
    console.log(error)
  }
}