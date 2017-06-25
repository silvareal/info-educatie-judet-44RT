import * as types from '../actionTypes.js'
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

// Handle the onChange event for all properties with a single function
export function onUserInfoChange(fieldName, user, value) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_INFO_CHANGE_LOGIN, fieldName: fieldName, user: user, value: value})
    }
}

// Initiated the Axios request
export function onLoginInitiate() {
    return {type: types.ON_LOGIN_INITIATE}
}

// Successfully logged in
export function onLoginSuccess() {
    return {type: types.ON_LOGIN_SUCCESS, success: true}
}

// Failed to log in
export function onLoginFailure(errors, message) {
    return {type: types.ON_LOGIN_FAILURE, errors: errors, message: message}
}

// Function for logging in
export function onLogin(user) {
    return function (dispatch) {
        dispatch(onLoginInitiate());
        return axios({
            method: 'post',
            url: '/authentication/login',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'email': user.email,
                'password': user.password
            })
        }).then((response) => {
            Auth.authenticateUser(response.data.token);
            socket.emit("getCredentials");
            dispatch(onLoginSuccess())
        }).catch((err) => {
            dispatch(onLoginFailure(err.response.data.errors, err.response.data.message))
        })
    }
}