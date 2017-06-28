import * as types from '../actions/actionTypes.js';

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case types.GET_CREDENTIALS_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.GET_CREDENTIALS_SUCCESS:
            return action.user;

        case types.GET_CREDENTIALS_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching:false
            };

        default:
            return state;
    }
}