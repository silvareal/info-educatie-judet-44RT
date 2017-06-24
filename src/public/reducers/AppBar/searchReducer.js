import * as types from '../../actions/actionTypes.js';

export default function searchReducer(state = {searchQuery: ''}, action) {
    switch (action.type) {

        case types.ON_SEARCH_QUERY_CHANGE:
            return {
                ...state,
                searchQuery: action.searchQuery
            };

        case types.ON_SEARCH_ALL_INITIATE:
            return {
                ...state,
                message: "Searching"
            };

        case types.ON_SEARCH_ALL_SUCCESS:
            return {
                ...state,
                allCollections: action.collections,
                message: "Collections found"
            };

        case types.ON_SEARCH_ALL_FAILURE:
            return {
                ...state,
                message: "NoCollections"
            };

        default:
            return state;
    }
}