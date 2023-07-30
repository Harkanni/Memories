import * as api from '../api';

// ACTION CREATORS

export const getPost = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: 'FETCH_ALL', payload: [] };

    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch({ type: 'CREATE', payload: data})
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = (id, post) => async(dispatch) => {
  try {
    const { data } = await api.updatePost(id, post)

    dispatch({ type: "UPDATE", payload: data })
  } catch (error) {
    console.log(error.message)
  }
}