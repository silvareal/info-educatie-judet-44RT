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