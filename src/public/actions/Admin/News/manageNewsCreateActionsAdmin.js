import * as types from '../../actionTypes.js';
import axios from 'axios';
import Auth from '../../../modules/Auth.js';
import qs from 'qs';

let socket = io.connect();

// Initial State - View
export function onCreateInitiate(newsDescription) {
    return function (dispatch) {
        dispatch({type: types.ON_CREATE_INITIATE_ADMIN_NEWS, newsDescription: newsDescription});
    }
}

// Slide Index change handler
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_CHANGE_ADMIN_NEWS, stepIndex: stepIndex})
    }
}

// Handle newstTitle change
export function onNewsTitleChange(newsTitle) {
    return function (dispatch) {
        dispatch({type: types.ON_NEWS_TITLE_CHANGE_ADMIN_NEWS, newsTitle: newsTitle})
    }
}

// Handle newsDescription change
export function onNewsDescriptionChange(newsDescription, __html) {
    return function (dispatch) {
        dispatch({
            type: types.ON_NEWS_DESCRIPTION_CHANGE_ADMIN_NEWS,
            newsDescription: newsDescription,
            __html: __html
        })
    }
}

// Handle newsCover change
export function onNewsCoverLinkChange(newsCoverLink) {
    return function (dispatch) {
        dispatch({type: types.ON_NEWS_COVER_LINK_CHANGE_ADMIN_NEWS, newsCoverLink: newsCoverLink})
    }
}

// Handle save news initiate
export function onSaveNewsInitiate(newsTitle, newsDescriptionRaw, newsCoverLink) {
    return {
        type: types.ON_SAVE_NEWS_INITIATE_ADMIN_NEWS,
        newsTitle: newsTitle,
        newsDescriptionRaw: newsDescriptionRaw,
        newsCoverLink: newsCoverLink,
        message: "Data sent"
    }
}

// Handle save news success
export function onSaveNewsSuccess(success) {

    // The Redux Store should update
    socket.emit("updateNewsStore");

    return {
        type: types.ON_SAVE_NEWS_SUCCESS_ADMIN_NEWS,
        successCreation: success
    }
}

// Handle save news failure
export function onSaveNewsFailure(success, errors, message) {
    return {
        type: types.ON_SAVE_NEWS_FAILURE_ADMIN_NEWS,
        successCreation: success,
        errors: errors,
        message: message
    }
}

// Handle onClick the save button
export function onSaveNews(newsTitle, newsDescriptionRaw, newsCoverLink) {
    return function (dispatch) {
        dispatch(onSaveNewsInitiate(newsTitle, newsDescriptionRaw, newsCoverLink));
        return axios({
            method: 'post',
            url: '/admin/create',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'newsTitle': newsTitle,
                'newsDescriptionRaw': newsDescriptionRaw,
                'newsCoverLink': newsCoverLink
            })
        }).then((response) => {
            dispatch(onSaveNewsSuccess(response.data.success))
        }).catch((err) => {
            const errPath = err.response.data;

            dispatch(onSaveNewsFailure(errPath.success, errPath.errors, errPath.message))
        })
    }
}