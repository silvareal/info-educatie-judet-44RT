import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

// Handle searchQuery change
export function onSearchQueryChangeType(searchQuery) {
    return {type: types.ON_SEARCH_QUERY_CHANGE, searchQuery: searchQuery}
}

export function onSearchQueryChange(searchQuery) {
    return function (dispatch) {
        dispatch(onSearchQueryChangeType(searchQuery))
    }
}
// ---

// All Collections

// Initiated the Axios request
export function onSearchAllInitiate() {
    return {type: types.ON_SEARCH_ALL_INITIATE}
}

// Successfully retrieved the searched collections
export function onSearchAllSuccess(collections) {
    return {type: types.ON_SEARCH_ALL_SUCCESS, collections: collections}
}

// Failed to retrieve the searched collections
export function onSearchAllFailure(message) {
    return {type: types.ON_SEARCH_ALL_FAILURE, message: message}
}

// The onSearch event handler

export function onSearchAll(searchQuery) {
    return function (dispatch) {
        dispatch(onSearchAllInitiate());
        return axios({
            method: 'post',
            url: '/browse/searchCollections',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'searchQuery': searchQuery
            })
        }).then((response) => {
            if (response.data.errorMessage)
                dispatch(onSearchAllFailure(response.data.errorMessage));
            else
                dispatch(onSearchAllSuccess(response.data.collections))
        })
    }
}