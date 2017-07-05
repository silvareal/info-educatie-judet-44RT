import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

export function getNews(newsId) {
    return function (dispatch) {
        dispatch({type: types.READ_ONE_NEWS_BROWSE_INITIATE});
        return axios({
            method: 'post',
            url: '/admin/readOne',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId
            })
        }).then((response) => {
            dispatch({type: types.READ_ONE_NEWS_BROWSE_SUCCESS, news: response.data.news})
        }).catch((err) => {
            dispatch({type: types.READ_ONE_NEWS_BROWSE_FAILURE})
        })
    }
}

// Initiated the Axios request
export function getCommentsInitiated() {
    return {type: types.GET_COMMENTS_NEWS_BROWSE_INITIATED}
}

// Successfully retrieved the comments
export function getCommentsSuccess(comments) {
    return {type: types.GET_COMMENTS_NEWS_BROWSE_SUCCESS, comments: comments}
}

// Failed to retrieve the comments
export function getCommentsFailure() {
    return {type: types.GET_COMMENTS_NEWS_BROWSE_FAILURE}
}

// Function for retrieving comments
export function getComments(newsId) {
    return function (dispatch) {
        dispatch(getCommentsInitiated());
        return axios({
            method: 'post',
            url: '/comment/retrieveNewsComments',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId
            })
        }).then((response) => {
            dispatch(getCommentsSuccess(response))
        }).catch((err) => {
            dispatch(getCommentsFailure())
        })
    }
}

// Initiated the Axios request
export function onLoadMoreCommentsInitiate(loadAfter, newsId) {
    return {type: types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_INITIATE, loadAfter: loadAfter, newsId: newsId}
}

// Successfully loaded more comments
export function onLoadMoreCommentsSuccess(comments) {
    return {type: types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_SUCCESS, comments: comments}
}

// Failed to load more comments
export function onLoadMoreCommentsFailure(message) {
    return {type: types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more comments
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_COMMENTS_LOAD_AFTER_NEWS_BROWSE, loadAfter}
}

// Function for x comments after the first y
export function onLoadMoreComments(loadAfter, newsId) {
    return function (dispatch) {
        dispatch(onLoadMoreCommentsInitiate(loadAfter, newsId));
        return axios({
            method: 'post',
            url: '/comment/loadMoreCommentsNews',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'loadAfter': loadAfter,
                'newsId': newsId
            })
        }).then((response) => {
            dispatch(onLoadMoreCommentsSuccess(response.data.comments));
            dispatch(iterateLoadAfter(loadAfter))
        }).catch((err) => {
            dispatch(onLoadMoreCommentsFailure(err.response.data.message))
        })
    }
}

// Handle onChange event for the comment form
export function onChangeCommentInput(comment) {
    return function (dispatch) {
        dispatch({type: types.ON_CHANGE_COMMENT_INPUT_NEWS_BROWSE, comment: comment})
    }
}

// Initiated the Axios request
export function onSaveCommentInitiate() {
    return {type: types.ON_SAVE_COMMENT_NEWS_BROWSE_INITIATE}
}

// Successfully saved the comment
export function onSaveCommentSuccess() {
    return {type: types.ON_SAVE_COMMENT_NEWS_BROWSE_SUCCESS}
}

// Failed to save the comment
export function onSaveCommentFailure() {
    return {type: types.ON_SAVE_COMMENT_NEWS_BROWSE_FAILURE}
}

// Function for saving the comment
export function onSaveComment(newsId, comment) {
    return function (dispatch) {
        dispatch(onSaveCommentInitiate());
        return axios({
            method: 'post',
            url: '/comment/postCommentNews',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId,
                'comment': comment
            })
        }).then(() => {
            dispatch(onSaveCommentSuccess())
        }).catch(() => {
            dispatch(onSaveCommentFailure())
        })
    }
}

// Retrieve the comment count for the specific collection
export function getCommentsCount(newsId) {
    return function (dispatch){
        return axios({
            method: 'post',
            url: '/comment/commentsCountNews',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId
            })
        }).then((response) => {
            dispatch({type: types.GET_COMMENTS_COUNT_NEWS_BROWSE, count: response.data.commentsCount})
        })
    }
}

export function onDeleteCommentInitiate() {
    return {type: types.ON_DELETE_COMMENT_NEWS_INITIATE}
}

export function onDeleteCommentSuccess() {
    return {type: types.ON_DELETE_COMMENT_NEWS_SUCCESS}
}

export function onDeleteCommentFailure() {
    return {type: types.ON_DELETE_COMMENT_NEWS_FAILURE}
}

export function onDeleteComment(commentId) {
    return function (dispatch) {
        dispatch(onDeleteCommentInitiate());
        return axios({
            method: 'post',
            url: '/comment/deleteCommentNews',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'commentId': commentId
            })
        }).then(() => {
            socket.emit("send:commentNews");
            dispatch(onDeleteCommentSuccess());
        }).catch((err) => {
            console.log(err);
            dispatch(onDeleteCommentFailure());
        })
    }
}