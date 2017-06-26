import * as types from '../../actionTypes.js';
import axios from 'axios';
import Auth from '../../../modules/Auth.js';
import qs from 'qs';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.READ_ALL_COLLECTIONS_INITIATED_ADMIN_COLLECTIONS}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.READ_ALL_COLLECTIONS_SUCCESS_ADMIN_COLLECTIONS, collections: collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.READ_ALL_COLLECTIONS_FAILURE_ADMIN_COLLECTIONS}
}

// Function for retrieving the collections
export function getAllCollections() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/admin/readAllCollections',
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
    return {type: types.ON_LOAD_MORE_INITIATE_ADMIN_COLLECTIONS, loadAfter: loadAfter}
}

// Successfully retrieved the collections
export function onLoadMoreSuccess(collections) {
    return {type: types.ON_LOAD_MORE_SUCCESS_ADMIN_COLLECTIONS, collections: collections}
}

// Failed to retrieve the collections
export function onLoadMoreFailure(message) {
    return {type: types.ON_LOAD_MORE_FAILURE_ADMIN_COLLECTIONS, message: message}
}

// Iterate loadAfter if we successfully loaded more collections
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_LOAD_AFTER_ADMIN_COLLECTIONS, loadAfter}
}

// Function for x collections after the first y
export function onLoadMore(loadAfter) {
    return function (dispatch) {
        dispatch(onLoadMoreInitiate());
        return axios({
            method: 'post',
            url: '/admin/loadMoreCollections',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
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