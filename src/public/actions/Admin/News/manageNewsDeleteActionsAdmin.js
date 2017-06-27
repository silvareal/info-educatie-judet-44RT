import * as types from '../../actionTypes.js';
import axios from 'axios';
import qs from 'qs';
import Auth from '../../../modules/Auth.js';

let socket = io.connect();

// Fetch requested collection

export function onDeleteInitiateType(newsId) {
    return {type: types.ON_DELETE_INITIATE_ADMIN_NEWS, newsId: newsId}
}

export function onDeleteInitiateSuccess(message, response, newsTitle, newsDescriptionRaw, newsCoverLink) {
    return {
        type: types.ON_DELETE_INITIATE_SUCCESS_ADMIN_NEWS,
        message: message,
        response: response,
        newsTitle: newsTitle,
        newsDescriptionRaw: newsDescriptionRaw,
        newsCoverLink: newsCoverLink
    }
}

export function onDeleteInitiateFailure(response) {
    return {type: types.ON_DELETE_INITIATE_FAILURE_ADMIN_NEWS, response: response}
}

export function onDeleteInitiate(newsId) {
    return function (dispatch) {
        dispatch(onDeleteInitiateType(newsId));
        return axios({
            method: 'post',
            url: '/admin/deleteShow',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId
            })
        }).then((response) => {
            dispatch(onDeleteInitiateSuccess(
                response.data.message,
                true,
                response.data.news.newsTitle,
                response.data.news.newsDescriptionRaw,
                response.data.news.newsCoverLink,
            ))
        }).catch((err) => {
            const errPath = err.response.data;
            dispatch(onDeleteInitiateFailure(errPath.response))
        })
    }
}
// ---

// Handle delete collection

export function onDeleteExecuteInitiate() {
    return {type: types.ON_DELETE_EXECUTE_INITIATE_ADMIN_NEWS}
}

export function onDeleteExecuteSuccess(message) {
    return {type: types.ON_DELETE_EXECUTE_SUCCESS_ADMIN_NEWS, message: message}
}

export function onDeleteExecuteFailure() {
    return {type: types.ON_DELETE_EXECUTE_FAILURE_ADMIN_NEWS, message: "Error while deleting"}
}

export function onDeleteExecute(newsId, newsTitle, newsDescriptionRaw, newsCoverLink){
    return function (dispatch) {
        dispatch(onDeleteExecuteInitiate());
        return axios({
            method: 'post',
            url: '/admin/delete',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'newsId': newsId,
                'newsTitle': newsTitle,
                'newsDescriptionRaw': newsDescriptionRaw,
                'newsCoverLink': newsCoverLink
            })
        }).then((response) => {
            // The Redux Store should update
            socket.emit("updateNewsStore");
            dispatch(onDeleteExecuteSuccess(response.data.message));
        }).catch(() => {
            dispatch(onDeleteExecuteFailure())
        })
    }
}
// ---