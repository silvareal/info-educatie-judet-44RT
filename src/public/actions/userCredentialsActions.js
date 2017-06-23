import * as types from './actionTypes.js';
import axios from 'axios';
import Auth from '../modules/Auth.js';

// Initiated the Axios request
export function getCredentialsInitiated() {
    return {type: types.GET_CREDENTIALS_INITIATED}
}

// Successfully retrieved the credentials
export function getCredentialsSuccess(user) {
    return {type: types.GET_CREDENTIALS_SUCCESS, user}
}

// Failed to retrieve the credentials
export function getCredentialsFailure() {
    return {type: types.GET_CREDENTIALS_FAILURE}
}

// Function for retrieving the credentials
export function getCredentials() {
    return function (dispatch) {
        dispatch(getCredentialsInitiated());
        return axios({
            method: 'get',
            url: '/home/credentials',
            headers: {'Authorization': `bearer ${Auth.getToken()}`}
        })
            .then((response) => {
                dispatch(getCredentialsSuccess(response));
            }).catch((err) => {
                dispatch(getCredentialsFailure());
            });
    }
}