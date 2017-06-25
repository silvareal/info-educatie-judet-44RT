import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';

// Handle the onChange event for all properties with a single function
export function onUserInfoChange(fieldName, user, value) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_INFO_CHANGE, fieldName: fieldName, user: user, value: value})
    }
}

// Initiated the Axios request
export function onSaveUserInitiate() {
    return {type: types.ON_SAVE_USER_INITIATE}
}

// Successfully saved the user and will replace context
export function onSaveUserSuccess() {
    return {type: types.ON_SAVE_USER_SUCCESS, success: true}
}

// Failed to save the user and will display errors
export function onSaveUserFailure(errors, message) {
    return {type: types.ON_SAVE_USER_FAILURE, errors: errors, message: message}
}

// Function for saving the user
export function onSaveUser(user) {
    return function (dispatch) {
        dispatch(onSaveUserInitiate());
        return axios({
            method: 'post',
            url: '/authentication/signup',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'name': user.name,
                'email': user.email,
                'password': user.password,
                'confirmPassword': user.confirmPassword
            })
        }).then(() => {
            dispatch(onSaveUserSuccess());
        }).catch((err) => {
            dispatch(onSaveUserFailure(err.response.data.errors, err.response.data.message))
        })
    }
}