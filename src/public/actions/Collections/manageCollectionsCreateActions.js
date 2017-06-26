import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

// Initial State - View
export function onCreateInitiate(collectionDescription, pictureDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_CREATE_INITIATE, collectionDescription: collectionDescription, pictureDescription: pictureDescription});
    }
}

// Slide Index change handler
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_CHANGE, stepIndex: stepIndex})
    }
}

// Handle collectionName change
export function onCollectionNameChange(collectionName) {
    return function (dispatch) {
        dispatch({type: types.ON_COLLECTION_NAME_CHANGE, collectionName: collectionName})
    }
}

// Handle collectionDescription change
export function onCollectionDescriptionChange(collectionDescription, __html) {
    return function (dispatch) {
        dispatch({
            type: types.ON_COLLECTION_DESCRIPTION_CHANGE,
            collectionDescription: collectionDescription,
            __html: __html
        })
    }
}

// Handle changes in the pictures array
export function onPicturesArrayChange(pictures) {
    return function (dispatch) {
        dispatch({type: types.ON_PICTURES_ARRAY_CHANGE, pictures: pictures})
    }
}

// Handle add input fields for pictures
export function onAddInputField(pictures, pictureDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_ADD_INPUT_FIELDS, pictures: pictures, pictureDescription: pictureDescription})
    }
}

// Handle remove input field for pictures
export function onRemoveInputField(pictures, index) {
    return function (dispatch) {
        dispatch({type: types.ON_REMOVE_INPUT_FIELDS, pictures: pictures, index: index})
    }
}

// Handle save collection initiate
export function onSaveCollectionInitiate(collectionName, collectionDescriptionRaw, pictures) {
    return {
        type: types.ON_SAVE_COLLECTION_INITIATE,
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
        type: types.ON_SAVE_COLLECTION_SUCCESS,
        successCreation: success
    }
}

// Handle save collection failure
export function onSaveCollectionFailure(success, errors, pictureNameError, pictureLinkError, pictureDescriptionError, message) {
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

// Handle onClick the save button
export function onSaveCollection(collectionName, collectionDescriptionRaw, pictures) {
    return function (dispatch) {
        dispatch(onSaveCollectionInitiate(collectionName, collectionDescriptionRaw, pictures));
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
// ---