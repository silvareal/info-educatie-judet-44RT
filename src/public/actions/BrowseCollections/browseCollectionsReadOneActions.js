import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

export function getCollection(collectionId) {
    return function (dispatch) {
        dispatch({type: types.READ_ONE_COLLECTION_BROWSE, collectionId: collectionId})
    }
}

// Initiated the Axios request
export function getCommentsInitiated() {
    return {type: types.GET_COMMENTS_BROWSE_INITIATED}
}

// Successfully retrieved the comments
export function getCommentsSuccess(comments) {
    return {type: types.GET_COMMENTS_BROWSE_SUCCESS, comments: comments}
}

// Failed to retrieve the comments
export function getCommentsFailure() {
    return {type: types.GET_COMMENTS_BROWSE_FAILURE}
}

// Function for retrieving comments
export function getComments(collectionId) {
    return function (dispatch) {
        dispatch(getCommentsInitiated());
        return axios({
            method: 'post',
            url: '/comment/retrieveCollectionsComments',
            headers: {
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
    return {type: types.ON_LOAD_MORE_COMMENTS_BROWSE_INITIATE, loadAfter: loadAfter, collectionId: collectionId}
}

// Successfully loaded more comments
export function onLoadMoreCommentsSuccess(comments) {
    return {type: types.ON_LOAD_MORE_COMMENTS_BROWSE_SUCCESS, comments: comments}
}

// Failed to load more comments
export function onLoadMoreCommentsFailure(message) {
    return {type: types.ON_LOAD_MORE_COMMENTS_BROWSE_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more comments
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_COMMENTS_LOAD_AFTER_BROWSE, loadAfter}
}

// Function for x comments after the first y
export function onLoadMoreComments(loadAfter, collectionId) {
    return function (dispatch) {
        dispatch(onLoadMoreCommentsInitiate(loadAfter, collectionId));
        return axios({
            method: 'post',
            url: '/comment/loadMoreCommentsCollections',
            headers: {
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
export function onChangeCommentInput(comment) {
    return function (dispatch) {
        dispatch({type: types.ON_CHANGE_COMMENT_INPUT_BROWSE, comment: comment})
    }
}

// Initiated the Axios request
export function onSaveCommentInitiate() {
    return {type: types.ON_SAVE_COMMENT_BROWSE_INITIATE}
}

// Successfully saved the comment
export function onSaveCommentSuccess() {
    return {type: types.ON_SAVE_COMMENT_BROWSE_SUCCESS}
}

// Failed to save the comment
export function onSaveCommentFailure() {
    return {type: types.ON_SAVE_COMMENT_BROWSE_FAILURE}
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
            dispatch({type: types.GET_COMMENTS_COUNT_BROWSE, count: response.data.commentsCount})
        })
    }
}

export function onResetReducer() {
    return function (dispatch) {
        dispatch({type: types.ON_RESET_REDUCER_BROWSE_COLLECTIONS})
    }
}