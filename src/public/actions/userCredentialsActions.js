import * as types from './actionTypes.js';
import axios from 'axios';
import Auth from '../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

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
                dispatch(getCredentialsSuccess(response.data));
            }).catch(() => {
                dispatch(getCredentialsFailure());
            });
    }
}

export function onLikeInitiate() {
    return {type: types.ON_LIKE_INITIATE}
}

export function onLikeFailure() {
    return {type: types.ON_LIKE_FAILURE}
}

export function onLikeSuccess() {
    return function (dispatch) {
        return axios({
            method: 'get',
            url: '/comment/getLikes',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            dispatch({type: types.ON_LIKE_SUCCESS, liked: response.data.liked})
        }).catch(() => {
            dispatch(onLikeFailure());
            dispatch({type: types.ON_OPEN_SNACK_BAR_LIKES});
        })
    }
}

export function onLike(likedId) {
    return function (dispatch) {
        dispatch(onLikeInitiate());
        return axios({
            method: 'post',
            url: '/comment/like',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'likedId': likedId
            })
        }).then(() => {
            socket.emit("onLike", {likedId: likedId})
        }).catch(() => {
            dispatch(onLikeFailure())
        })
    }
}

export function onUnlikeInitiate() {
    return {type: types.ON_UNLIKE_INITIATE}
}

export function onUnlikeFailure() {
    return {type: types.ON_UNLIKE_FAILURE}
}

export function onUnlikeSuccess() {
    return function (dispatch) {
        return axios({
            method: 'get',
            url: '/comment/getLikes',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            dispatch({type: types.ON_UNLIKE_SUCCESS, liked: response.data.liked})
        }).catch(() => {
            dispatch(onUnlikeFailure());
            dispatch({type: types.ON_OPEN_SNACK_BAR_LIKES});
        })
    }
}

export function onUnlike(likedId) {
    return function (dispatch) {
        dispatch(onUnlikeInitiate());
        return axios({
            method: 'post',
            url: '/comment/unlike',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'likedId': likedId
            })
        }).then(() => {
            socket.emit("onUnlike", {likedId: likedId})
        }).catch(() => {
            dispatch(onUnlikeFailure())
        })
    }
}

// Actions that update the like counter for all users in real time
export function onLikeAllUsers(likedId) {
    return function (dispatch) {
        dispatch({type: types.ON_LIKE_ACTION_FOR_ALL_USERS, likedId: likedId})
    }
}

export function onUnlikeAllUsers(likedId) {
    return function (dispatch) {
        dispatch({type: types.ON_UNLIKE_ACTION_FOR_ALL_USERS, likedId: likedId})
    }
}

export function onCloseSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_SNACK_BAR_LIKES})
    }
}