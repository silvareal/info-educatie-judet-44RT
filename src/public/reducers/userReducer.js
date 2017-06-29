import * as types from '../actions/actionTypes.js';

export default function userReducer(state = {
    likeSystemError: null
}, action) {
    switch (action.type) {
        case types.GET_CREDENTIALS_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.GET_CREDENTIALS_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                data: action.user
            };

        case types.GET_CREDENTIALS_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching:false
            };

        case types.ON_LIKE_INITIATE:
            return {
                ...state,
                likeSystemError: null
            };

        case types.ON_LIKE_SUCCESS:
            return {
                ...state,
                likeSystemError: null,
                data: {
                    ...state.data,
                    liked: action.liked
                }
            };

        case types.ON_LIKE_FAILURE:
            return {
                ...state,
                likeSystemError: true
            };

        case types.ON_UNLIKE_INITIATE:
            return {
                ...state,
                likeSystemError: null
            };

        case types.ON_UNLIKE_SUCCESS:
            return {
                ...state,
                likeSystemError: null,
                data: {
                    ...state.data,
                    liked: action.liked
                }
            };

        case types.ON_UNLIKE_FAILURE:
            return {
                ...state,
                likeSystemError: true
            };

        default:
            return state;
    }
}