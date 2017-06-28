import * as types from '../../../actionTypes.js';
import axios from 'axios';
import Auth from '../../../../modules/Auth.js';

// Initiated the Axios request
export function onGetLogsInitiate() {
    return {type: types.ON_FETCH_LOGS_LOGIN_INITIATE}
}

// Successfully retrieved the logs
export function onGetLogsSuccess(logs) {
    return {type: types.ON_FETCH_LOGS_LOGIN_SUCCESS, logs: logs}
}

// Failed to retrieve the logs
export function onGetLogsFailure() {
    return {type: types.ON_FETCH_LOGS_LOGIN_FAILURE}
}

// Function for retrieving the logs
export function onGetLogs() {
    return function (dispatch) {
        dispatch(onGetLogsInitiate());
        return axios({
            method: 'get',
            url: '/admin/logsLogin',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            dispatch(onGetLogsSuccess(response.data.logs))
        }).catch(() => {
            dispatch(onGetLogsFailure())
        })
    }
}