import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

// Handle feedback onChange event
export function onFeedbackChange(feedback) {
    return function (dispatch) {
        dispatch({type: types.ON_FEEDBACK_CHANGE, feedback: feedback})
    }
}

// Initiated the Axios request
export function onSaveFeedbackInitiate() {
    return {type: types.ON_SAVE_FEEDBACK_INITIATE}
}

// Successfully saved the feedback
export function onSaveFeedbackSuccess() {
    return {type: types.ON_SAVE_FEEDBACK_SUCCESS, success: true}
}

// Failed to save the feedback
export function onSaveFeedbackFailure(errors) {
    return {type: types.ON_SAVE_FEEDBACK_FAILURE, errors: errors}
}

// Function for saving the feedback
export function onSaveFeedback(feedback) {
    return function (dispatch) {
        dispatch(onSaveFeedbackInitiate());
        return axios({
            method: 'post',
            url: '/home/contact',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'feedback': feedback
            })
        }).then(() => {
            dispatch(onSaveFeedbackSuccess())
        }).catch((err) => {
            dispatch(onSaveFeedbackFailure(err.response.data.errors))
        })
    }
}