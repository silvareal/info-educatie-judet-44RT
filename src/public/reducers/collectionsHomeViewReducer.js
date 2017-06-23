import * as types from '../actions/actionTypes.js';

export default function collectionsHomeViewReducer(state = {}, action) {
    switch (action.type) {
        case types.READ_COLLECTIONS_HOME_INITIATED:
            return {fetching: true};

        case types.READ_COLLECTIONS_HOME_SUCCESS:
            return action.collections;

        case types.READ_COLLECTIONS_HOME_FAILURE:
            return {fetched: false};

        default:
            return state;
    }
}