import * as types from '../../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../../modules/Auth.js';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';

let socket = io.connect();

// Initiated the Axios request
export function onMountUpdateInitiate() {
    return {type: types.ON_MOUNT_UPDATE_INITIATE_ADMIN_NEWS}
}

// Successfully fetched the news
export function onMountUpdateSuccess(news, textEditorState) {
    return {type: types.ON_MOUNT_UPDATE_SUCCESS_ADMIN_NEWS, news: news, textEditorState: textEditorState}
}

// Failed to fetch the news
export function onMountUpdateFailure(message) {
    return {type: types.ON_MOUNT_UPDATE_FAILURE_ADMIN_NEWS, message: message}
}

// Function for retrieving the news
export function onMountUpdate(newsId, textEditorState) {
    return function (dispatch) {
        dispatch(onMountUpdateInitiate());
        return axios({
            method: 'post',
            url: '/admin/updateShow',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId
            })
        }).then((response) => {

            // Initial state for collectionDescription
            let contentState = convertFromRaw(JSON.parse(response.data.news.newsDescriptionRaw));
            const html = stateToHTML(contentState);

            dispatch(onMountUpdateSuccess({
                ...response.data.news,
                newsDescription: textEditorState.setContentFromString(html, 'html')
            }, textEditorState))
        }).catch((err) => {
            dispatch(onMountUpdateFailure(err.response.data.message))
        })
    }
}

// Slide Index change handler
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_NEWS, stepIndex: stepIndex})
    }
}

// Handle newsTitle change
export function onNewsTitleChange(newsTitle) {
    return function (dispatch) {
        dispatch({type: types.ON_NEWS_TITLE_CHANGE_UPDATE_ADMIN_NEWS, newsTitle: newsTitle})
    }
}

// Handle newsDescription change
export function onNewsDescriptionChange(newsDescription, __html) {
    return function (dispatch) {
        dispatch({
            type: types.ON_NEWS_DESCRIPTION_CHANGE_UPDATE_ADMIN_NEWS,
            newsDescription: newsDescription,
            __html: __html
        })
    }
}

// Handle newsCoverLink change
export function onNewsCoverLinkChange(newsCoverLink) {
    return function (dispatch) {
        dispatch({type: types.ON_NEWS_COVER_LINK_CHANGE_UPDATE_ADMIN_NEWS, newsCoverLink: newsCoverLink})
    }
}

// Initiated the Axios request
export function onUpdateInitiate() {
    return {type: types.ON_UPDATE_NEWS_INITIATE_ADMIN_NEWS}
}

// Successfully updated the news
export function onUpdateSuccess(success) {

    // The Redux Store should update
    socket.emit("updateNewsStore");

    return {
        type: types.ON_UPDATE_NEWS_SUCCESS_ADMIN_NEWS,
        successUpdate: success
    }
}

// Failed to update the news
export function onUpdateFailure(success, errors, message) {
    return {
        type: types.ON_UPDATE_NEWS_FAILURE_ADMIN_NEWS,
        successUpdate: success,
        errors: errors,
        message: message
    }
}

// Function for updating the news
export function onUpdate(newsId, newsTitle, newsDescriptionRaw, newsCoverLink, newsTitleOld, newsDescriptionRawOld, newsCoverLinkOld) {
    return function (dispatch) {
        dispatch(onUpdateInitiate());
        return axios({
            method: 'post',
            url: '/admin/updateSave',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId,
                'newsTitle': newsTitle,
                'newsDescriptionRaw': newsDescriptionRaw,
                'newsCoverLink': newsCoverLink,
                'newsTitleOld': newsTitleOld,
                'newsDescriptionRawOld': newsDescriptionRawOld,
                'newsCoverLinkOld': newsCoverLinkOld
            })
        }).then((response) => {
            dispatch(onUpdateSuccess(response.data.success))
        }).catch((err) => {
            const errPath = err.response.data;

            dispatch(onUpdateFailure(errPath.success, errPath.errors, errPath.message));
        })
    }
}