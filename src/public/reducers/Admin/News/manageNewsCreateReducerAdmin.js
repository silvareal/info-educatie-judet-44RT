import * as types from '../../../actions/actionTypes.js';

export default function manageNewsCreateReducerAdmin(state = {}, action) {
    switch (action.type) {
        case types.ON_CREATE_INITIATE_ADMIN_NEWS:
            return {
                newsTitle: '',
                newsDescription: action.newsDescription,
                newsDescriptionRaw: '',
                newsCoverLink: '',
                errors: {},
                message: '',
                successCreation: null,
                __html: '',
                stepIndex: 0
            };

        case types.ON_NEWS_TITLE_CHANGE_ADMIN_NEWS:
            return {
                ...state,
                newsTitle: action.newsTitle
            };

        case types.ON_NEWS_DESCRIPTION_CHANGE_ADMIN_NEWS:
            return {
                ...state,
                newsDescription: action.newsDescription,
                __html: action.__html
            };

        case types.ON_NEWS_COVER_LINK_CHANGE_ADMIN_NEWS:
            return {
                ...state,
                newsCoverLink: action.newsCoverLink
            };

        case types.ON_SAVE_NEWS_INITIATE_ADMIN_NEWS:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_NEWS_SUCCESS_ADMIN_NEWS:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: {},
                message: ''
            };

        case types.ON_SAVE_NEWS_FAILURE_ADMIN_NEWS:
            return {
                ...state,
                successCreation: action.successCreation,
                errors: action.errors,
                message: action.message
            };

        case types.ON_SLIDE_INDEX_CHANGE_ADMIN_NEWS:
            return {
                ...state,
                stepIndex: action.stepIndex
            };

        default:
            return state;
    }
}