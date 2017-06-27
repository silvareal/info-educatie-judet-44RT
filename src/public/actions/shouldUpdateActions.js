import * as types from './actionTypes.js';

export function setShouldUpdate() {
    return function (dispatch) {
        return dispatch({type: types.SET_SHOULD_UPDATE});
    }
}

export function removeShouldUpdate() {
    return function (dispatch) {
        dispatch({type: types.REMOVE_SHOULD_UPDATE});
    }
}

export function setShouldUpdateNews() {
    return function (dispatch) {
        dispatch({type: types.SET_SHOULD_UPDATE_NEWS});
    }
}

export function removeShouldUpdateNews() {
    return function (dispatch) {
        dispatch({type: types.REMOVE_SHOULD_UPDATE_NEWS});
    }
}