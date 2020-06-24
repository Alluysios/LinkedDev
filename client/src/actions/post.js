import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// GET POST

export const getPosts = () => async dispatch => {

    try {
        const res = await axios.get('/api/posts/all');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}

// Like Post
export const likePost = postId => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}

// Unlike Post
export const unlikePost = postId => async dispatch => {

    try {
        const res = await axios.delete(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}

// Unlike Post
export const deletePost = postId => async dispatch => {

    try {
        await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        });

        dispatch(setAlert('Post removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}

// Add Post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}


export const getPost = id => async dispatch => {

    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}

// ADD Comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment created', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}


// ADD Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment removed', 'danger'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
}