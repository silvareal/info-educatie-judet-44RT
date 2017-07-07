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

        case types.ON_LIKE_ACTION_FOR_ALL_USERS: {
            if (state.allCollections) {
                const newCollections = state.allCollections.map((collection, i) => {
                    if (state.allCollections[i]._id !== action.likedId) return collection;

                    const currentLikes = state.allCollections[i].likes;

                    return {...collection, likes: currentLikes + 1}
                });
                return {
                    ...state,
                    allCollections: newCollections
                };
            }
            return state;
        }

        case types.ON_UNLIKE_ACTION_FOR_ALL_USERS: {
            if (state.allCollections) {
                const newCollections = state.allCollections.map((collection, i) => {
                    if (state.allCollections[i]._id !== action.likedId) return collection;

                    const currentLikes = state.allCollections[i].likes;

                    return {...collection, likes: currentLikes - 1}
                });
                return {
                    ...state,
                    allCollections: newCollections
                };
            }
            return state;
        }

        default:
            return state;
    }
}