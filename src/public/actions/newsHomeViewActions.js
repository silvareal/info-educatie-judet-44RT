import * as types from './actionTypes.js';
import axios from 'axios';
import Auth from '../modules/Auth.js';
import qs from 'qs';

// Initiated the Axios request
export function getNewsInitiated() {
    return {type: types.READ_NEWS_HOME_INITIATED}
}

// Successfully retrieved the news
export function getNewsSuccess(news) {
    return {type: types.READ_NEWS_HOME_SUCCESS, news: news}
}

// Failed to retrieve the news
export function getNewsFailure() {
    return {type: types.READ_NEWS_HOME_FAILURE}
}

// Function for retrieving the news
export function getNews() {
    return function (dispatch) {
        dispatch(getNewsInitiated());
        return axios ({
            method: 'get',
            url: '/home/news',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            dispatch(getNewsSuccess(response.data.news))
        }).catch(() => {
            dispatch(getNewsFailure())
        })
    }
}

// Handle comment change
export function onCommentChange(comment, newsId, key) {
    return function (dispatch) {
        dispatch({type: types.ON_COMMENT_CHANGE_NEWS_HOME, comment: comment, newsId: newsId, key: key})
    }
}

// Initiated the Axios request
export function onSaveCommentInitiate() {
    return {type: types.ON_SAVE_COMMENT_NEWS_HOME_INITIATE}
}

// Successfully saved the comment
export function onSaveCommentSuccess() {
    return {type: types.ON_SAVE_COMMENT_NEWS_HOME_SUCCESS}
}

// Failed to save the comment
export function onSaveCommentFailure() {
    return {type: types.ON_SAVE_COMMENT_NEWS_HOME_FAILURE}
}


// Handle open SnackBar
export function onOpenSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_OPEN_SNACK_BAR_HOME_VIEW});
        setTimeout(() => {
            dispatch({type: types.ON_CLOSE_SNACK_BAR_HOME_VIEW})
        }, 4000)
    }
}

// Handle close SnackBar
export function onCloseSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_SNACK_BAR_HOME_VIEW})
    }
}

// Function for saving the comment
export function onSave(comment, newsId, key) {
    return function (dispatch) {
        dispatch(onSaveCommentInitiate());
        return axios({
            method: 'post',
            url: '/comment/postCommentNews',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'newsId': newsId,
                'comment': comment
            })
        }).then(() => {
            dispatch(onCommentChange("", "", key));
            dispatch(onSaveCommentSuccess());
            dispatch(onOpenSnackBar());

        }).catch(() => {
            dispatch(onSaveCommentFailure())
        })
    }
}