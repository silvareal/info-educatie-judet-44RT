import * as types from './actionTypes.js';
import axios from 'axios';
import Auth from '../modules/Auth.js';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.READ_COLLECTIONS_HOME_INITIATED}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.READ_COLLECTIONS_HOME_SUCCESS, collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.READ_COLLECTIONS_HOME_FAILURE}
}

// Function for retrieving the collections
export function getCollectionsHomeView() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/home/collections',
            headers: {'Authorization': `bearer ${Auth.getToken()}`}
        })
            .then((response) => {
                dispatch(getCollectionsSuccess(response));
            }).catch(() => {
                dispatch(getCollectionsFailure());
            });
    }
}