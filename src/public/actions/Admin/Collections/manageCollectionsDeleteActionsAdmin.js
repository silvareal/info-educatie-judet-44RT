import * as types from '../../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../../modules/Auth.js';

let socket = io.connect();

// Fetch requested collection

export function onDeleteInitiateType(collectionId) {
    return {type: types.ON_DELETE_INITIATE_ADMIN_COLLECTIONS, collectionId: collectionId}
}

export function onDeleteInitiateSuccess(message, response, collectionName, collectionDescriptionRaw, pictures, userId, userName, profilePictureLink) {
    return {
        type: types.ON_DELETE_INITIATE_SUCCESS_ADMIN_COLLECTIONS,
        message: message,
        response: response,
        collectionName: collectionName,
        collectionDescriptionRaw: collectionDescriptionRaw,
        pictures: pictures,
        userId: userId,
        userName: userName,
        profilePictureLink: profilePictureLink
    }
}

export function onDeleteInitiateFailure(response) {
    return {type: types.ON_DELETE_INITIATE_FAILURE_ADMIN_COLLECTIONS, response: response}
}

export function onDeleteInitiate(collectionId) {
    return function (dispatch) {
        dispatch(onDeleteInitiateType(collectionId));
        return axios({
            method: 'post',
            url: '/admin/deleteShowCollection',
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
                response.data.collection.picturesArray,
                response.data.collection.userId,
                response.data.collection.userName,
                response.data.collection.profilePictureLink
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
    return {type: types.ON_DELETE_EXECUTE_INITIATE_ADMIN_COLLECTIONS}
}

export function onDeleteExecuteSuccess(message) {
    return {type: types.ON_DELETE_EXECUTE_SUCCESS_ADMIN_COLLECTIONS, message: message}
}

export function onDeleteExecuteFailure() {
    return {type: types.ON_DELETE_EXECUTE_FAILURE_ADMIN_COLLECTIONS, message: "Error while deleting"}
}

export function onDeleteExecute(collectionId, ownerId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures){
    return function (dispatch) {
        dispatch(onDeleteExecuteInitiate());
        return axios({
            method: 'post',
            url: '/admin/deleteCollection',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId,
                'ownerId': ownerId,
                'userName': userName,
                'profilePictureLink': profilePictureLink,
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