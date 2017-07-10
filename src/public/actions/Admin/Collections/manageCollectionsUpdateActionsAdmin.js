import * as types from '../../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../../modules/Auth.js';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';

let socket = io.connect();

// Initiated the Axios request
export function onMountUpdateInitiate() {
    return {type: types.ON_MOUNT_UPDATE_INITIATE_ADMIN_COLLECTIONS}
}

// Successfully fetched the collection
export function onMountUpdateSuccess(collection, textEditorState) {
    return {type: types.ON_MOUNT_UPDATE_SUCCESS_ADMIN_COLLECTIONS, collection: collection, textEditorState: textEditorState}
}

// Failed to fetch the collection
export function onMountUpdateFailure(message) {
    return {type: types.ON_MOUNT_UPDATE_FAILURE_ADMIN_COLLECTIONS, message: message}
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
            url: '/admin/updateShowCollections',
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
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_COLLECTIONS, stepIndex: stepIndex})
    }
}

// Handle userId change
export function onUserIdChange(userId) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_ID_CHANGE_UPDATE_ADMIN_COLLECTIONS, userId: userId})
    }
}

// Handle userName change
export function onUserNameChange(userName) {
    return function (dispatch) {
        dispatch({type: types.ON_USER_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS, userName: userName})
    }
}

// Handle profilePictureLink change
export function onProfilePictureLinkChange(profilePictureLink) {
    return function (dispatch) {
        dispatch({type: types.ON_PROFILE_PICTURE_LINK_CHANGE_UPDATE_ADMIN_COLLECTIONS, profilePictureLink: profilePictureLink})
    }
}

// Handle collectionName change
export function onCollectionNameChange(collectionName) {
    return function (dispatch) {
        dispatch({type: types.ON_COLLECTION_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS, collectionName: collectionName})
    }
}

// Handle collectionDescription change
export function onCollectionDescriptionChange(collectionDescription, __html) {
    return function (dispatch) {
        dispatch({
            type: types.ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE_ADMIN_COLLECTIONS,
            collectionDescription: collectionDescription,
            __html: __html
        })
    }
}

// Handle changes in the pictures array
export function onPicturesArrayChange(pictures) {
    return function (dispatch) {
        dispatch({type: types.ON_PICTURES_ARRAY_CHANGE_UPDATE_ADMIN_COLLECTIONS, pictures: pictures})
    }
}

// Handle add input fields for pictures
export function onAddInputField(pictures, pictureDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_ADD_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS, pictures: pictures, pictureDescription: pictureDescription})
    }
}

// Handle remove input field for pictures
export function onRemoveInputField(pictures, index) {
    return function (dispatch) {
        dispatch({type: types.ON_REMOVE_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS, pictures: pictures, index: index})
    }
}

// Initiated the Axios request
export function onUpdateInitiate() {
    return {type: types.ON_UPDATE_COLLECTION_INITIATE_ADMIN_COLLECTIONS}
}

// Successfully updated the collection
export function onUpdateSuccess(success) {

    // The Redux Store should update
    socket.emit("updateCollectionsStore");

    return {
        type: types.ON_UPDATE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS,
        successUpdate: success
    }
}

// Failed to update the collection
export function onUpdateFailure(success, errors, pictureNameError, pictureLinkError, pictureDescriptionError, message) {
    return {
        type: types.ON_UPDATE_COLLECTION_FAILURE_ADMIN_COLLECTIONS,
        successUpdate: success,
        errors: errors,
        pictureNameError: pictureNameError,
        pictureLinkError: pictureLinkError,
        pictureDescriptionError: pictureDescriptionError,
        message: message
    }
}

// Function for updating the collection
export function onUpdate(userId, userName, profilePictureLink, userIdOld, userNameOld, profilePictureLinkOld, collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld, tags, tagsOld) {
    return function (dispatch) {
        dispatch(onUpdateInitiate());
        return axios({
            method: 'post',
            url: '/admin/updateSaveCollections',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'userId': userId,
                'userNameToAdd': userName,
                'userProfilePictureLink': profilePictureLink,
                'userIdOld': userIdOld,
                'userNameToAddOld': userNameOld,
                'userProfilePictureLinkOld': profilePictureLinkOld,
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