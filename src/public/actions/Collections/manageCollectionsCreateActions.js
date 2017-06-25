import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../modules/Auth.js';

let socket = io.connect();

// Initial State - View
export function onCreateInitiateType(collectionDescription, pictureDescription) {
    return {type: types.ON_CREATE_INITIATE, collectionDescription: collectionDescription, pictureDescription: pictureDescription}
}

export function onCreateInitiate(collectionDescription, pictureDescription) {
    return function (dispatch) {
        dispatch(onCreateInitiateType(collectionDescription, pictureDescription));
    }
}
// ---

// Slide Index change handler
export function onSlideIndexChangeType(stepIndex) {
    return {type: types.ON_SLIDE_INDEX_CHANGE, stepIndex: stepIndex}
}

export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch(onSlideIndexChangeType(stepIndex))
    }
}
// ---

// Handle collectionName change
export function onCollectionNameChangeType(collectionName) {
    return {type: types.ON_COLLECTION_NAME_CHANGE, collectionName: collectionName}
}

export function onCollectionNameChange(collectionName) {
    return function (dispatch) {
        dispatch(onCollectionNameChangeType(collectionName))
    }
}
// ---

// Handle collectionDescription change
export function onCollectionDescriptionChangeType(collectionDescription, __html) {
    return {
        type: types.ON_COLLECTION_DESCRIPTION_CHANGE,
        collectionDescription: collectionDescription,
        __html: __html
    }
}

export function onCollectionDescriptionChange(collectionDescription, __html) {
    return function (dispatch) {
        dispatch(onCollectionDescriptionChangeType(collectionDescription, __html))
    }
}
// ---

// Handle changes in the pictures array
export function onPicturesArrayChangeType(pictures) {
    return {type: types.ON_PICTURES_ARRAY_CHANGE, pictures: pictures}
}

export function onPicturesArrayChange(pictures) {
    return function (dispatch) {
        dispatch(onPicturesArrayChangeType(pictures))
    }
}
// ---

// Handle add input fields for pictures
export function onAddInputFieldType(pictures, pictureDescription) {
    return {type: types.ON_ADD_INPUT_FIELDS, pictures: pictures, pictureDescription: pictureDescription}
}

export function onAddInputField(pictures, pictureDescription) {
    return function (dispatch) {
        dispatch(onAddInputFieldType(pictures, pictureDescription))
    }
}
// ---

// Handle remove input field for pictures
export function onRemoveInputFieldType(pictures, index) {
    return {type: types.ON_REMOVE_INPUT_FIELDS, pictures: pictures, index: index}
}

export function onRemoveInputField(pictures, index) {
    return function (dispatch) {
        dispatch(onRemoveInputFieldType(pictures, index))
    }
}
// ---

// Handle save collection initiate
export function onSaveCollectionInitiateType(collectionName, collectionDescriptionRaw, pictures) {
    return {
        type: types.ON_SAVE_COLLECTION_INITIATE,
        collectionName: collectionName,
        collectionDescriptionRaw: collectionDescriptionRaw,
        pictures: pictures,
        message: "Data sent"
    }
}
// ---

// Handle save collection success
export function onSaveCollectionSuccessType(success) {

    // The Redux Store should update
    socket.emit("updateCollectionsStore");

    return {
        type: types.ON_SAVE_COLLECTION_SUCCESS,
        successCreation: success
    }
}
// ---

// Handle save collection failure
export function onSaveCollectionFailureType(success, errors, pictureNameError, pictureLinkError, pictureDescriptionError, message) {
    return {
        type: types.ON_SAVE_COLLECTION_FAILURE,
        successCreation: success,
        errors: errors,
        pictureNameError: pictureNameError,
        pictureLinkError: pictureLinkError,
        pictureDescriptionError: pictureDescriptionError,
        message: message
    }
}
// ---

// Handle onClick the save button
export function onSaveCollection(collectionName, collectionDescriptionRaw, pictures) {
    return function (dispatch) {
        dispatch(onSaveCollectionInitiateType(collectionName, collectionDescriptionRaw, pictures));
        return axios({
            method: 'post',
            url: '/crud/create',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionName': collectionName,
                'collectionDescriptionRaw': collectionDescriptionRaw,
                'picturesArray': pictures
            })
        }).then((response) => {
            dispatch(onSaveCollectionSuccessType(response.data.success))
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

            dispatch(onSaveCollectionFailureType(errPath.success, errPath.errors, pictureNameError, pictureLinkError, pictureDescriptionError, errPath.message))
        })
    }
}
// ---