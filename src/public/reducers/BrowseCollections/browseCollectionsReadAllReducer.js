import * as types from '../../actions/actionTypes.js'

export default function browseCollectionsReadAllReducer(state = {}, action) {
    switch (action.type) {
        case types.READ_ALL_COLLECTIONS_BROWSE_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: null
            };

        case types.READ_ALL_COLLECTIONS_BROWSE_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                collections: action.collections,
                loadAfter: 10,
                finished: false,
                requesting: false
            };

        case types.READ_ALL_COLLECTIONS_BROWSE_FAILURE:
            return {
                fetched: false
            };

        case types.ON_LOAD_MORE_BROWSE_INITIATE:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_BROWSE_SUCCESS: {
            let newCollections = state.collections.data.collections;

            if (action.collections) {
                Object.keys(action.collections).map((key) => {
                    newCollections.push(action.collections[key])
                });

                if (newCollections && newCollections.length % 10 === 0) {
                    return {
                        ...state,
                        requesting: false,
                        collections: {
                            ...state.collections,
                            data: {
                                ...state.collections.data,
                                collections: newCollections
                            }
                        }
                    }
                }
                else return {
                    ...state,
                    finished: true,
                    requesting: false,
                    collections: {
                        ...state.collections,
                        data: {
                            ...state.collections.data,
                            collections: newCollections
                        }
                    }
                }
            }
            else return {
                ...state,
                finished: true,
                requesting: false
            }
        }

        case types.ITERATE_LOAD_AFTER_BROWSE:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_BROWSE_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
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