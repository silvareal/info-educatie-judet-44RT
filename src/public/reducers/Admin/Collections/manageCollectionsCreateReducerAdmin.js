import * as types from '../../../actions/actionTypes.js';

export default function manageCollectionsCreateReducerAdmin(state = {}, action) {
    switch (action.type) {
        case types.ON_CREATE_INITIATE_ADMIN_COLLECTIONS:
            return {
                userId: '',
                userName: '',
                profilePictureLink: '',
                collectionName: '',
                collectionsDescriptionRaw: '',
                pictures: [{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: action.pictureDescription,
                    pictureDescriptionRaw: ''
                }],
                successCreation: null,
                errorMessage: '',
                errors: {},
                errorsPicturesArray: {},
                pictureNameError: [],
                pictureDescriptionError: [],
                pictureLinkError: [],
                collectionDescription: action.collectionDescription,
                __html: '',
                stepIndex: 0
            };

        case types.ON_USER_ID_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                userId: action.userId
            };

        case types.ON_USER_NAME_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                userName: action.userName
            };

        case types.ON_PROFILE_PICTURE_LINK_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                profilePictureLink: action.profilePictureLink
            };

        case types.ON_COLLECTION_NAME_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state, collectionName: action.collectionName
            };

        case types.ON_COLLECTION_DESCRIPTION_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                collectionDescription: action.collectionDescription,
                __html: action.__html
            };

        case types.ON_PICTURES_ARRAY_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                pictures: action.pictures
            };

        case types.ON_ADD_INPUT_FIELDS_ADMIN_COLLECTIONS:
            return {
                ...state,
                pictures: action.pictures.concat([{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: action.pictureDescription,
                    pictureDescriptionRaw: ''
                }])
            };

        case types.ON_REMOVE_INPUT_FIELDS_ADMIN_COLLECTIONS:
            return {
                ...state,
                pictures: action.pictures.filter((s, j) => action.index !== j)
            };

        case types.ON_SAVE_COLLECTION_INITIATE_ADMIN_COLLECTIONS:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: {},
                pictureNameError: [],
                pictureLinkError: [],
                pictureDescriptionError: [],
                message: ''

            };

        case types.ON_SAVE_COLLECTION_FAILURE_ADMIN_COLLECTIONS:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: action.errors,
                pictureNameError: action.pictureNameError,
                pictureLinkError: action.pictureLinkError,
                pictureDescriptionError: action.pictureDescriptionError,
                message: action.message
            };

        case types.ON_SLIDE_INDEX_CHANGE_ADMIN_COLLECTIONS:
            return {
                ...state,
                stepIndex: action.stepIndex
            };

        default:
            return state;
    }
}