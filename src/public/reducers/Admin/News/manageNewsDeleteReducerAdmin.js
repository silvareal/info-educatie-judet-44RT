import * as types from '../../../actions/actionTypes.js';

export default function manageNewsDeleteReducerAdmin(state = {}, action) {
    switch (action.type) {
        case types.ON_DELETE_INITIATE_ADMIN_NEWS:
            return {
                ...state,
                newsId: action.newsId
            };

        case types.ON_DELETE_INITIATE_SUCCESS_ADMIN_NEWS:
            return {
                ...state,
                message: action.message,
                response: action.response,
                newsTitle: action.newsTitle,
                newsDescriptionRaw: action.newsDescriptionRaw,
                newsCoverLink: action.newsCoverLink
            };

        case types.ON_DELETE_INITIATE_FAILURE_ADMIN_NEWS:
            return {
                ...state,
                response: action.response
            };

        case types.ON_DELETE_EXECUTE_INITIATE_ADMIN_NEWS:
            return {
                ...state,
                message: "Initiated deleting process"
            };

        case types.ON_DELETE_EXECUTE_SUCCESS_ADMIN_NEWS:
            return {
                ...state,
                message: action.message
            };

        case types.ON_DELETE_EXECUTE_FAILURE_ADMIN_NEWS:
            return {
                ...state,
                message: action.message
            };

        default:
            return state;
    }
}