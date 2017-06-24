import * as types from '../../actions/actionTypes.js';

export default function collectionNamesReducer(state = {}, action) {
    switch (action.type) {

        case types.GET_ALL_COLLECTION_NAMES_INITIATE:
            return {
                fetching: true,
                fetched: null
            };

        case types.GET_ALL_COLLECTION_NAMES_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                collections: action.collections
            };

        case types.GET_ALL_COLLECTION_NAMES_FAILURE:
            return {
                ...state,
                fetched: false
            };

        default:
            return state;
    }
}