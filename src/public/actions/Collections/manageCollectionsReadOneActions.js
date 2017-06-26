import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

export function getCollection(collectionId) {
    return function (dispatch) {
        dispatch({type: types.READ_ONE_COLLECTION, collectionId: collectionId})
    }
}

// Initiated the Axios request
export function getCommentsInitiated() {
    return {type: types.GET_COMMENTS_INITIATED}
}

// Successfully retrieved the comments
export function getCommentsSuccess(comments) {
    return {type: types.GET_COMMENTS_SUCCESS, comments: comments}
}

// Failed to retrieve the comments
export function getCommentsFailure() {
    return {type: types.GET_COMMENTS_FAILURE}
}

// Function for retrieving comments
export function getComments(collectionId) {
    return function (dispatch) {
        dispatch(getCommentsInitiated());
        return axios({
            method: 'post',
            url: '/comment/retrieveCollectionsComments',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId
            })
        }).then((response) => {
            dispatch(getCommentsSuccess(response))
        }).catch(() => {
            dispatch(getCommentsFailure())
        })
    }
}

// Initiated the Axios request
export function onLoadMoreCommentsInitiate(loadAfter, collectionId) {
    return {type: types.ON_LOAD_MORE_COMMENTS_INITIATE, loadAfter: loadAfter, collectionId: collectionId}
}

// Successfully loaded more comments
export function onLoadMoreCommentsSuccess(comments) {
    return {type: types.ON_LOAD_MORE_COMMENTS_SUCCESS, comments: comments}
}

// Failed to load more comments
export function onLoadMoreCommentsFailure(message) {
    return {type: types.ON_LOAD_MORE_COMMENTS_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more comments
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_COMMENTS_LOAD_AFTER, loadAfter}
}

// Function for x comments after the first y
export function onLoadMoreComments(loadAfter, collectionId) {
    return function (dispatch) {
        dispatch(onLoadMoreCommentsInitiate(loadAfter, collectionId));
        return axios({
            method: 'post',
            url: '/comment/loadMoreCommentsCollections',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'loadAfter': loadAfter,
                'collectionId': collectionId
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
export function onChangeCommentInputType(comment) {
    return {type: types.ON_CHANGE_COMMENT_INPUT, comment: comment}
}

export function onChangeCommentInput(comment) {
    return function (dispatch) {
        dispatch(onChangeCommentInputType(comment))
    }
}
// ---

// Initiated the Axios request
export function onSaveCommentInitiate() {
    return {type: types.ON_SAVE_COMMENT_INITIATE}
}

// Successfully saved the comment
export function onSaveCommentSuccess() {
    return {type: types.ON_SAVE_COMMENT_SUCCESS}
}

// Failed to save the comment
export function onSaveCommentFailure() {
    return {type: types.ON_SAVE_COMMENT_FAILURE}
}

// Function for saving the comment
export function onSaveComment(collectionId, comment) {
    return function (dispatch) {
        dispatch(onSaveCommentInitiate());
        return axios({
            method: 'post',
            url: '/comment/postCommentCollections',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId,
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
export function getCommentsCount(collectionId) {
    return function (dispatch){
        return axios({
            method: 'post',
            url: '/comment/commentsCount',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId
            })
        }).then((response) => {
            dispatch({type: types.GET_COMMENTS_COUNT, count: response.data.commentsCount})
        })
    }
}

export function resetReducer() {
    return function (dispatch) {
        dispatch({type: types.RESET_READ_ONE_REDUCER_COLLECTIONS})
    }
}