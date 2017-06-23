import * as types from './actionTypes.js';

export function setShouldUpdateType() {
    return {type: types.SET_SHOULD_UPDATE}
}

export function removeShouldUpdateType() {
    return {type: types.REMOVE_SHOULD_UPDATE}
}

export function setShouldUpdate() {
    return function (dispatch) {
        return dispatch(setShouldUpdateType());
    }
}

export function removeShouldUpdate() {
    return function (dispatch) {
        dispatch(removeShouldUpdateType());
    }
}