import * as types from '../../actions/actionTypes.js';

export default function manageCollectionsCreateReducer(state = {}, action) {
    switch (action.type) {
        case types.ON_CREATE_INITIATE:
            return {
                collectionName: '',
                collectionsDescriptionRaw: '',
                pictures: [{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: action.pictureDescription,
                    pictureDescriptionRaw: ''
                }],
                successCreation: '',
                errorMessage: '',
                errors: {},
                errorsPicturesArray: {},
                pictureNameError: [],
                pictureDescriptionError: [],
                pictureLinkError: [],
                collectionDescription: action.collectionDescription,
                __html: ''
            };

        case types.ON_COLLECTION_NAME_CHANGE:
            return {
                ...state, collectionName: action.collectionName
            };

        case types.ON_COLLECTION_DESCRIPTION_CHANGE:
            return {
                ...state,
                collectionDescription: action.collectionDescription,
                __html: action.__html
            };

        case types.ON_PICTURES_ARRAY_CHANGE:
            return {
                ...state,
                pictures: action.pictures
            };

        case types.ON_ADD_INPUT_FIELDS:
            return {
                ...state,
                pictures: action.pictures.concat([{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: action.pictureDescription,
                    pictureDescriptionRaw: ''
                }])
            };

        case types.ON_REMOVE_INPUT_FIELDS:
            return {
                ...state,
                pictures: action.pictures.filter((s, j) => action.index !== j)
            };

        case types.ON_SAVE_COLLECTION_INITIATE:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_COLLECTION_SUCCESS:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: {},
                pictureNameError: [],
                pictureLinkError: [],
                pictureDescriptionError: [],
                message: ''

            };

        case types.ON_SAVE_COLLECTION_FAILURE:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: action.errors,
                pictureNameError: action.pictureNameError,
                pictureLinkError: action.pictureLinkError,
                pictureDescriptionError: action.pictureDescriptionError,
                message: action.message
            };

        default:
            return state;
    }
}