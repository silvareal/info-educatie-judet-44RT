import * as types from '../actionTypes.js';
import axios from 'axios';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.GET_ALL_COLLECTION_NAMES_INITIATE}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.GET_ALL_COLLECTION_NAMES_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.GET_ALL_COLLECTION_NAMES_FAILURE}
}

// Function for retrieving all the collections
export function getAllCollections() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/browse/getCollectionsForSearch'
        }).then((response) => {
            dispatch(getCollectionsSuccess(response))
        }).catch(() => {
            dispatch(getCollectionsFailure())
        })
    }
}