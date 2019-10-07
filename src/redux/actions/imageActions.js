import {
  LOADING_UI,
  STOP_LOADING_UI,
  SET_IMAGES,
  SET_IMAGE,
  LIKE_IMAGE,
  UNLIKE_IMAGE,
  SET_ERRORS,
  CLEAR_ERRORS,
  COMMENT_TO_IMAGE
} from '../types';
import axios from 'axios';
// get user images
export const getUserImages = userHandle => dispatch => {
  axios
    .get(`/user/${userHandle}/images`)
    .then(res => {
      dispatch({
        type: SET_IMAGES,
        payload: res.data
      });
    })
    .catch(() => {
      dispatch({
        type: SET_IMAGES,
        payload: null
      });
    });
};
// Get a image
export const getImage = imageId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/image/${imageId}`)
    .then(res => {
      dispatch({
        type: SET_IMAGE,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Like a image
export const likeImage = imageId => dispatch => {
  axios
    .get(`/image/${imageId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_IMAGE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a image
export const unlikeImage = imageId => dispatch => {
  axios
    .get(`/image/${imageId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_IMAGE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Submit a comment to image
export const commentToImage = (imageId, commentData) => dispatch => {
  axios
    .post(`/image/${imageId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: COMMENT_TO_IMAGE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
