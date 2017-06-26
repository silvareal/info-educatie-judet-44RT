import * as types from '../../actionTypes.js';
import axios from 'axios';
import Auth from '../../../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

// Initial State - View
export function onCreateInitiate(collectionDescription, pictureDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_CREATE_INITIATE_ADMIN_COLLECTIONS, collectionDescription: collectionDescription, pictureDescription: pictureDescription});
    }
}

// Slide Index change handler
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_CHANGE_ADMIN_COLLECTIONS, stepIndex: stepIndex})
    }
}

// Handle userId change
export function onUserIdChange(userId) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_ID_CHANGE_ADMIN_COLLECTIONS, userId: userId})
    }
}

// Handle userName change
export function onUserNameChange(userName) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_NAME_CHANGE_ADMIN_COLLECTIONS, userName: userName})
    }
}

// Handle profilePictureLink change
export function onProfilePictureLinkChange(profilePictureLink) {
    return function (dispatch) {
        dispatch({type: types.ON_PROFILE_PICTURE_LINK_CHANGE_ADMIN_COLLECTIONS, profilePictureLink: profilePictureLink})
    }
}

// Handle collectionName change
export function onCollectionNameChange(collectionName) {
    return function (dispatch) {
        dispatch({type: types.ON_COLLECTION_NAME_CHANGE_ADMIN_COLLECTIONS, collectionName: collectionName})
    }
}

// Handle collectionDescription change
export function onCollectionDescriptionChange(collectionDescription, __html) {
    return function (dispatch) {
        dispatch({
            type: types.ON_COLLECTION_DESCRIPTION_CHANGE_ADMIN_COLLECTIONS,
            collectionDescription: collectionDescription,
            __html: __html
        })
    }
}

// Handle changes in the pictures array
export function onPicturesArrayChange(pictures) {
    return function (dispatch) {
        dispatch({type: types.ON_PICTURES_ARRAY_CHANGE_ADMIN_COLLECTIONS, pictures: pictures})
    }
}

// Handle add input fields for pictures
export function onAddInputField(pictures, pictureDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_ADD_INPUT_FIELDS_ADMIN_COLLECTIONS, pictures: pictures, pictureDescription: pictureDescription})
    }
}

// Handle remove input field for pictures
export function onRemoveInputField(pictures, index) {
    return function (dispatch) {
        dispatch({type: types.ON_REMOVE_INPUT_FIELDS_ADMIN_COLLECTIONS, pictures: pictures, index: index})
    }
}

// Handle save collection initiate
export function onSaveCollectionInitiate(userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures) {
    return {
        type: types.ON_SAVE_COLLECTION_INITIATE_ADMIN_COLLECTIONS,
        userId: userId,
        userName: userName,
        profilePictureLink: profilePictureLink,
        collectionName: collectionName,
        collectionDescriptionRaw: collectionDescriptionRaw,
        pictures: pictures,
        message: "Data sent"
    }
}

// Handle save collection success
export function onSaveCollectionSuccess(success) {

    // The Redux Store should update
    socket.emit("updateCollectionsStore");

    return {
        type: types.ON_SAVE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS,
        successCreation: success
    }
}

// Handle save collection failure
export function onSaveCollectionFailure(success, errors, pictureNameError, pictureLinkError, pictureDescriptionError, message) {
    return {
        type: types.ON_SAVE_COLLECTION_FAILURE_ADMIN_COLLECTIONS,
        successCreation: success,
        errors: errors,
        pictureNameError: pictureNameError,
        pictureLinkError: pictureLinkError,
        pictureDescriptionError: pictureDescriptionError,
        message: message
    }
}

// Handle onClick the save button
export function onSaveCollection(userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures) {
    return function (dispatch) {
        dispatch(onSaveCollectionInitiate(userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures));
        return axios({
            method: 'post',
            url: '/admin/createCollection',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'userId': userId,
                'userNameToAdd': userName,
                'userProfilePictureLink': profilePictureLink,
                'collectionName': collectionName,
                'collectionDescriptionRaw': collectionDescriptionRaw,
                'picturesArray': pictures
            })
        }).then((response) => {
            dispatch(onSaveCollectionSuccess(response.data.success))
        }).catch((err) => {

            const errPath = err.response.data;
            let pictureNameError, pictureLinkError, pictureDescriptionError;

            if (errPath.errorsPicturesArray)
                pictureNameError = errPath.errorsPicturesArray.map((i) => {
                    return i.pictureName
                });

            if (errPath.errorsPicturesArray)
                pictureLinkError = errPath.errorsPicturesArray.map((i) => {
                    return i.pictureLink
                });

            if (errPath.errorsPicturesArray)
                pictureDescriptionError = errPath.errorsPicturesArray.map((i) => {
                    return i.pictureDescriptionRaw
                });

            dispatch(onSaveCollectionFailure(errPath.success, errPath.errors, pictureNameError, pictureLinkError, pictureDescriptionError, errPath.message))
        })
    }
}