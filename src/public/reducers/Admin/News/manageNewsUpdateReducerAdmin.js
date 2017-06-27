import * as types from '../../../actions/actionTypes.js';

export default function manageNewsUpdateReducerAdmin(state = {}, action) {
    switch (action.type) {

        case types.ON_MOUNT_UPDATE_INITIATE_ADMIN_NEWS:
            return {
                fetching: true,
                fetched: null,
                successUpdate: null,
                message: '',
                errors: {},
                __html: '',
                stepIndex: 0
            };

        case types.ON_MOUNT_UPDATE_SUCCESS_ADMIN_NEWS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                news: action.news,
                textEditorState: action.textEditorState,
                newsTitleOld: action.news.newsTitle,
                newsDescriptionRawOld: action.news.newsDescriptionRaw,
                newsCoverLinkOld: action.news.newsCoverLink
            };

        case types.ON_MOUNT_UPDATE_FAILURE_ADMIN_NEWS:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_NEWS_TITLE_CHANGE_UPDATE_ADMIN_NEWS:
            return {
                ...state,
                news: {
                    ...state.news,
                    newsTitle: action.newsTitle
                }
            };

        case types.ON_NEWS_DESCRIPTION_CHANGE_UPDATE_ADMIN_NEWS:
            return {
                ...state,
                news: {
                    ...state.news,
                    newsDescription: action.newsDescription
                },
                __html: action.__html
            };

        case types.ON_NEWS_COVER_LINK_CHANGE_UPDATE_ADMIN_NEWS:
            return {
                ...state,
                news: {
                    ...state.news,
                    newsCoverLink: action.newsCoverLink
                }
            };

        case types.ON_UPDATE_NEWS_INITIATE_ADMIN_NEWS:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_UPDATE_NEWS_SUCCESS_ADMIN_NEWS:
            return {
                ...state,
                successUpdate: action.successUpdate,
                errors: {},
                message: ''
            };

        case types.ON_UPDATE_NEWS_FAILURE_ADMIN_NEWS:
            return {
                ...state,
                successUpdate: action.successUpdate,
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