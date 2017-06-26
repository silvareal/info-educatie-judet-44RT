import * as types from '../../actions/actionTypes.js';

export default function manageCollectionsUpdateReducer(state = {}, action) {
    switch (action.type) {
        case types.ON_MOUNT_UPDATE_INITIATE:
            return {
                fetching: true,
                fetched: null,
                successUpdate: null,
                errorMessage: '',
                errors: {},
                errorsPicturesArray: {},
                pictureNameError: [],
                pictureDescriptionError: [],
                pictureLinkError: [],
                __html: '',
                stepIndex: 0
            };

        case types.ON_MOUNT_UPDATE_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                collection: action.collection,
                textEditorState: action.textEditorState,
                collectionNameOld: action.collection.collectionName,
                collectionDescriptionRawOld: action.collection.collectionDescriptionRaw,
                picturesArrayOld: action.collection.picturesArray
            };

        case types.ON_MOUNT_UPDATE_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_COLLECTION_NAME_CHANGE_UPDATE:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    collectionName: action.collectionName
                }
            };

        case types.ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    collectionDescription: action.collectionDescription
                },
                __html: action.__html
            };

        case types.ON_PICTURES_ARRAY_CHANGE_UPDATE:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    picturesArray: action.pictures
                }

            };

        case types.ON_ADD_INPUT_FIELDS_UPDATE:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    picturesArray: action.pictures.concat([{
                        pictureName: '',
                        pictureLink: '',
                        pictureDescription: action.pictureDescription,
                        pictureDescriptionRaw: ''
                    }])
                }

            };

        case types.ON_REMOVE_INPUT_FIELDS_UPDATE:
            return {
                ...state,
                collection: {
                    ...state.collection,
                    picturesArray: action.pictures.filter((s, j) => action.index !== j)
                }
            };

        case types.ON_UPDATE_COLLECTION_INITIATE:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_UPDATE_COLLECTION_SUCCESS:
            return {
                ...state,
                successUpdate: action.successUpdate,
                errors: {},
                pictureNameError: [],
                pictureLinkError: [],
                pictureDescriptionError: [],
                message: ''
            };

        case types.ON_UPDATE_COLLECTION_FAILURE:
            return {
                ...state,
                successUpdate: action.successUpdate,
                errors: action.errors,
                pictureNameError: action.pictureNameError,
                pictureLinkError: action.pictureLinkError,
                pictureDescriptionError: action.pictureDescriptionError,
                message: action.message
            };

        case types.ON_SLIDE_INDEX_CHANGE_UPDATE:
            return {
                ...state,
                stepIndex: action.stepIndex
            };

        default:
            return state;
    }
}