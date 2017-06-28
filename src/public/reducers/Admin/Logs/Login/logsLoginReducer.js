import * as types from '../../../../actions/actionTypes.js';

export default function logsLoginReducer(state = {
    fetched: null,
    fetching: null
}, action) {
    switch (action.type) {
        case types.ON_FETCH_LOGS_LOGIN_INITIATE:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.ON_FETCH_LOGS_LOGIN_SUCCESS:
            return {
                ...state,
                logs: action.logs,
                fetching: false,
                fetched: true
            };

        case types.ON_FETCH_LOGS_LOGIN_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        default:
            return state;
    }
}