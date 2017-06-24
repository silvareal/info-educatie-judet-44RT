import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../modules/Auth.js';

let socket = io.connect();

// Fetch requested collection

export function onDeleteInitiateType(collectionId) {
    return {type: types.ON_DELETE_INITIATE, collectionId: collectionId}
}

export function onDeleteInitiateSuccess(message, response, collectionName, collectionDescriptionRaw, pictures) {
    return {
        type: types.ON_DELETE_INITIATE_SUCCESS,
        message: message,
        response: response,
        collectionName: collectionName,
        collectionDescriptionRaw: collectionDescriptionRaw,
        pictures: pictures
    }
}

export function onDeleteInitiateFailure(response) {
    return {type: types.ON_DELETE_INITIATE_FAILURE, response: response}
}

export function onDeleteInitiate(collectionId) {
    return function (dispatch) {
        dispatch(onDeleteInitiateType(collectionId));
        return axios({
            method: 'post',
            url: '/crud/deleteShow',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId
            })
        }).then((response) => {
            dispatch(onDeleteInitiateSuccess(
                response.data.message,
                true,
                response.data.collection.collectionName,
                response.data.collection.collectionDescriptionRaw,
                response.data.collection.picturesArray
            ))
        }).catch((err) => {
            const errPath = err.response.data;
            dispatch(onDeleteInitiateFailure(errPath.response))
        })
    }
}
// ---

// Handle delete collection

export function onDeleteExecuteInitiate() {
    return {type: types.ON_DELETE_EXECUTE_INITIATE}
}

export function onDeleteExecuteSuccess(message) {
    return {type: types.ON_DELETE_EXECUTE_SUCCESS, message: message}
}

export function onDeleteExecuteFailure() {
    return {type: types.ON_DELETE_EXECUTE_FAILURE, message: "Error while deleting"}
}

export function onDeleteExecute(collectionId, collectionName, collectionDescriptionRaw, pictures){
    return function (dispatch) {
        dispatch(onDeleteExecuteInitiate());
        return axios({
            method: 'post',
            url: '/crud/deleteExecute',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId,
                'collectionName': collectionName,
                'collectionDescriptionRaw': collectionDescriptionRaw,
                'picturesArray': JSON.stringify(pictures)
            })
        }).then((response) => {
            // The Redux Store should update
            socket.emit("updateCollectionsStore");
            dispatch(onDeleteExecuteSuccess(response.data.message));
        }).catch(() => {
            dispatch(onDeleteExecuteFailure())
        })
    }
}
// ---