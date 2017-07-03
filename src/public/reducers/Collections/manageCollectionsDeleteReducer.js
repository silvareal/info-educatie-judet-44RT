import * as types from '../../actions/actionTypes.js';

export default function manageCollectionsDeleteReducer(state = {}, action) {
    switch (action.type) {
        case types.ON_DELETE_INITIATE:
            return {
                ...state,
                collectionId: action.collectionId
            };

        case types.ON_DELETE_INITIATE_SUCCESS:
            return {
                ...state,
                message: action.message,
                response: action.response,
                collectionName: action.collectionName,
                collectionDescriptionRaw: action.collectionDescriptionRaw,
                pictures: action.pictures,
                tags: action.tags
            };

        case types.ON_DELETE_INITIATE_FAILURE:
            return {
                ...state,
                response: action.response
            };

        case types.ON_DELETE_EXECUTE_INITIATE:
            return {
                ...state,
                message: "Initiated deleting process"
            };

        case types.ON_DELETE_EXECUTE_SUCCESS:
            return {
                ...state,
                message: action.message
            };

        case types.ON_DELETE_EXECUTE_FAILURE:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
}