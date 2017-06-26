import * as types from '../../../actions/actionTypes.js';

export default function manageCollectionsDeleteReducerAdmin(state = {}, action) {
    switch (action.type) {
        case types.ON_DELETE_INITIATE_ADMIN_COLLECTIONS:
            return {
                ...state,
                collectionId: action.collectionId
            };

        case types.ON_DELETE_INITIATE_SUCCESS_ADMIN_COLLECTIONS:
            return {
                ...state,
                message: action.message,
                response: action.response,
                collectionName: action.collectionName,
                collectionDescriptionRaw: action.collectionDescriptionRaw,
                pictures: action.pictures,
                userId: action.userId,
                userName: action.userName,
                profilePictureLink: action.profilePictureLink
            };

        case types.ON_DELETE_INITIATE_FAILURE_ADMIN_COLLECTIONS:
            return {
                ...state,
                response: action.response
            };

        case types.ON_DELETE_EXECUTE_INITIATE_ADMIN_COLLECTIONS:
            return {
                ...state,
                message: "Initiated deleting process"
            };

        case types.ON_DELETE_EXECUTE_SUCCESS_ADMIN_COLLECTIONS:
            return {
                ...state,
                message: action.message
            };

        case types.ON_DELETE_EXECUTE_FAILURE_ADMIN_COLLECTIONS:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
}