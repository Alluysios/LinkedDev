import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILES,
    GET_REPOS
} from './types';

// GET CURRENT USERS PROFILE
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get All Profiles
export const getProfiles = () => async dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get Profile By ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get Profile By ID
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
        
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Create or Update a profile
/*
    @params formData = data form values
    @params history = previous url
*/
export const  createProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Created','success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

export const  editProfile = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.patch('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Updated', 'success'));
        history.push('/dashboard')
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.patch('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });


        dispatch(setAlert('Profile Experience Added', 'success'));
        history.push('/dashboard')

    } catch (err) {
        // const errors = err.response.data.errors;

        // if(errors) {
        //     errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        // }
        
        // dispatch({
        //     type: PROFILE_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // })
    }
}

// ADD EXPERIENCE
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.patch('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Profile Education Added', 'success'));
        history.push('/dashboard')

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// DELETE EXPERIENCE
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch(setAlert('Experience Removed', 'success'));
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// DELETE EDUCATION
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch(setAlert('Education Removed', 'success'));
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// DELETE ACCOUNT AND PROFILE
export const deleteAccount = () => async dispatch => {
    if(window.confirm('This can NOT be undone! Please make sure if you want to delete your account.')) {
        try {
            await axios.delete(`/api/profile`);

            dispatch({ type: CLEAR_PROFILE})
            dispatch({ type: DELETE_ACCOUNT})
            dispatch(setAlert('Your account has been permanently deleted', 'danger'))
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}
