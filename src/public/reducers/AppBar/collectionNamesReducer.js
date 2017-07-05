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

        case types.ON_LIKE_ACTION_FOR_ALL_USERS: {
            if (state.collections.data.collections) {
                const newCollections = state.collections.data.collections.map((collection, i) => {
                    if (state.collections.data.collections[i]._id !== action.likedId) return collection;

                    const currentLikes = state.collections.data.collections[i].likes;

                    return {...collection, likes: currentLikes + 1}
                });
                return {
                    ...state,
                    collections: {
                        ...state.collections,
                        data: {
                            ...state.collections.data,
                            collections: newCollections
                        }
                    }
                };
            }
            return state;
        }

        case types.ON_UNLIKE_ACTION_FOR_ALL_USERS: {
            if (state.collections.data.collections) {
                const newCollections = state.collections.data.collections.map((collection, i) => {
                    if (state.collections.data.collections[i]._id !== action.likedId) return collection;

                    const currentLikes = state.collections.data.collections[i].likes;

                    return {...collection, likes: currentLikes - 1}
                });
                return {
                    ...state,
                    collections: {
                        ...state.collections,
                        data: {
                            ...state.collections.data,
                            collections: newCollections
                        }
                    }
                };
            }
            return state;
        }

        default:
            return state;
    }
}