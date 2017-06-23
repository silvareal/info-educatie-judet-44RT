import * as types from '../actions/actionTypes.js'

export default function shouldUpdateCollectionsReducer(state = {shouldUpdate: false}, action) {
    switch (action.type) {
        case types.SET_SHOULD_UPDATE:
            return {shouldUpdate: true};

        case types.REMOVE_SHOULD_UPDATE:
            return {shouldUpdate: false};

        default:
            return state;
    }
}