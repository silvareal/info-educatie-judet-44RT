import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../modules/Auth.js';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';

let socket = io.connect();

// Initiated the Axios request
export function onMountUpdateInitiate() {
    return {type: types.ON_MOUNT_UPDATE_INITIATE}
}

// Successfully fetched the collection
export function onMountUpdateSuccess(collection, textEditorState) {
    return {type: types.ON_MOUNT_UPDATE_SUCCESS, collection: collection, textEditorState: textEditorState}
}

// Failed to fetch the collection
export function onMountUpdateFailure(message) {
    return {type: types.ON_MOUNT_UPDATE_FAILURE, message: message}
}

// Functions for setting initial state of the text editor
const setRawValue = (pictures, textEditorState) => {
    return {...pictures, pictureDescription: textEditorState};
};

const setHTMLValue = (pictures) => {
    const contentState = convertFromRaw(JSON.parse(pictures.pictureDescriptionRaw));
    const html = stateToHTML(contentState);

    return {...pictures, pictureDescription: pictures.pictureDescription.setContentFromString(html, 'html')}
};
// ---

// Function for retrieving the collection
export function onMountUpdate(collectionId, textEditorState) {
    return function (dispatch) {
        dispatch(onMountUpdateInitiate());
        return axios({
            method: 'post',
            url: '/crud/updateShow',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId
            })
        }).then((response) => {

            // Initial state for collectionDescription
            let contentState = convertFromRaw(JSON.parse(response.data.collection.collectionDescriptionRaw));
            const html = stateToHTML(contentState);

            const pictures = response.data.collection.picturesArray;

            for (let i = 0; i < pictures.length; i++) {
                pictures[i] = setRawValue(pictures[i], textEditorState);
                pictures[i] = setHTMLValue(pictures[i]);
            }

            dispatch(onMountUpdateSuccess({
                ...response.data.collection,
                collectionDescription: textEditorState.setContentFromString(html, 'html')
            }, textEditorState))
        }).catch((err) => {
            dispatch(onMountUpdateFailure(err.response.data.message))
        })
    }
}

// Slide Index change handler
export function onSlideIndexChangeType(stepIndex) {
    return {type: types.ON_SLIDE_INDEX_CHANGE_UPDATE, stepIndex: stepIndex}
}

export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch(onSlideIndexChangeType(stepIndex))
    }
}

// Handle collectionName change
export function onCollectionNameChangeType(collectionName) {
    return {type: types.ON_COLLECTION_NAME_CHANGE_UPDATE, collectionName: collectionName}
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
        type: types.ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE,
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
    return {type: types.ON_PICTURES_ARRAY_CHANGE_UPDATE, pictures: pictures}
}

export function onPicturesArrayChange(pictures) {
    return function (dispatch) {
        dispatch(onPicturesArrayChangeType(pictures))
    }
}
// ---

// Handle add input fields for pictures
export function onAddInputFieldType(pictures, pictureDescription) {
    return {type: types.ON_ADD_INPUT_FIELDS_UPDATE, pictures: pictures, pictureDescription: pictureDescription}
}

export function onAddInputField(pictures, pictureDescription) {
    return function (dispatch) {
        dispatch(onAddInputFieldType(pictures, pictureDescription))
    }
}
// ---

// Handle remove input field for pictures
export function onRemoveInputFieldType(pictures, index) {
    return {type: types.ON_REMOVE_INPUT_FIELDS_UPDATE, pictures: pictures, index: index}
}

export function onRemoveInputField(pictures, index) {
    return function (dispatch) {
        dispatch(onRemoveInputFieldType(pictures, index))
    }
}
// ---

// Handle update collection initiate
export function onUpdateInitiate() {
    return {type: types.ON_UPDATE_COLLECTION_INITIATE}
}
// ---

// Handle update collection success
export function onUpdateSuccess(success) {

    // The Redux Store should update
    socket.emit("updateCollectionsStore");

    return {
        type: types.ON_UPDATE_COLLECTION_SUCCESS,
        successUpdate: success
    }
}
// ---

// Handle save collection failure
export function onUpdateFailure(success, errors, pictureNameError, pictureLinkError, pictureDescriptionError, message) {
    return {
        type: types.ON_UPDATE_COLLECTION_FAILURE,
        successUpdate: success,
        errors: errors,
        pictureNameError: pictureNameError,
        pictureLinkError: pictureLinkError,
        pictureDescriptionError: pictureDescriptionError,
        message: message
    }
}
// ---

// Handle onClick the update button
export function onUpdate(collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld, tags, tagsOld) {
    return function (dispatch) {
        dispatch(onUpdateInitiate());
        return axios({
            method: 'post',
            url: '/crud/updateSave',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'collectionId': collectionId,
                'collectionName': collectionName,
                'collectionDescriptionRaw': collectionDescriptionRaw,
                'picturesArray': pictures,
                'collectionNameOld': collectionNameOld,
                'collectionDescriptionRawOld': collectionDescriptionRawOld,
                'picturesArrayOld': picturesOld,
                'tags': tags,
                'tagsOld': tagsOld
            })
        }).then((response) => {
            dispatch(onUpdateSuccess(response.data.success))
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
            dispatch(onUpdateFailure(errPath.success, errPath.errors, pictureNameError, pictureLinkError, pictureDescriptionError, errPath.message));
        })
    }
}