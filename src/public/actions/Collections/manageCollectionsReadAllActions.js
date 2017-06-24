import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.READ_ALL_COLLECTIONS_INTIATED}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.READ_ALL_COLLECTIONS_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.READ_ALL_COLLECTIONS_FAILURE}
}

// Function for retrieving the collections
export function getAllCollections() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/crud/readAll',
            headers: {'Authorization': `bearer ${Auth.getToken()}`}
        }).then((response) => {
            dispatch(getCollectionsSuccess(response))
        }).catch(() => {
            dispatch(getCollectionsFailure())
        })
    }
}

// ---

// Initiated the Axios request
export function onLoadMoreInitiate(loadAfter) {
    return {type: types.ON_LOAD_MORE_INITIATE, loadAfter: loadAfter}
}

// Successfully retrieved the collections
export function onLoadMoreSuccess(collections) {
    return {type: types.ON_LOAD_MORE_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function onLoadMoreFailure(message) {
    return {type: types.ON_LOAD_MORE_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more collections
export function iterateLoadMore(loadAfter) {
    return {type: types.ITERATE_LOAD_AFTER, loadAfter}
}

// Function for x collections after the first y
export function onLoadMore(loadAfter) {
    return function (dispatch) {
        dispatch(onLoadMoreInitiate());
        return axios({
            method: 'post',
            url: '/crud/loadMore',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'loadAfter': loadAfter
            })
        }).then((response) => {
            dispatch(onLoadMoreSuccess(response.data.collections));
            dispatch(iterateLoadMore(loadAfter))
        }).catch((err) => {
            dispatch(onLoadMoreFailure(err.response.data.message))
        })
    }
}