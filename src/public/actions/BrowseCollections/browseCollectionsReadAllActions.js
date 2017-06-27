import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.READ_ALL_COLLECTIONS_BROWSE_INITIATED}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.READ_ALL_COLLECTIONS_BROWSE_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.READ_ALL_COLLECTIONS_BROWSE_FAILURE}
}

export function getAllCollections() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/browse/readAllCollections',
        }).then((response) => {
            dispatch(getCollectionsSuccess(response))
        }).catch(() => {
            dispatch(getCollectionsFailure())
        })
    }
}

// Initiated the Axios request
export function onLoadMoreInitiate(loadAfter) {
    return {type: types.ON_LOAD_MORE_BROWSE_INITIATE, loadAfter: loadAfter}
}

// Successfully retrieved the collections
export function onLoadMoreSuccess(collections) {
    return {type: types.ON_LOAD_MORE_BROWSE_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function onLoadMoreFailure(message) {
    return {type: types.ON_LOAD_MORE_BROWSE_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more collections
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_LOAD_AFTER_BROWSE, loadAfter}
}

// Function for x collections after the first y
export function onLoadMore(loadAfter) {
    return function (dispatch) {
        dispatch(onLoadMoreInitiate());
        return axios({
            method: 'post',
            url: '/browse/loadMoreCollections',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'loadAfter': loadAfter
            })
        }).then((response) => {
            dispatch(onLoadMoreSuccess(response.data.collections));
            dispatch(iterateLoadAfter(loadAfter))
        }).catch((err) => {
            dispatch(onLoadMoreFailure(err.response.data.message))
        })
    }
}