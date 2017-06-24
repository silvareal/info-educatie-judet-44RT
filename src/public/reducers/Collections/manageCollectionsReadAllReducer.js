import * as types from '../../actions/actionTypes.js';

export default function manageCollectionsReadAllReducer(state = {}, action) {
    switch (action.type) {
        case types.READ_ALL_COLLECTIONS_INTIATED:
            return {
                fetching: true,
                fetched: null
            };

        case types.READ_ALL_COLLECTIONS_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                collections: action.collections,
                loadAfter: 10,
                finished: false,
                requesting: false
            };

        case types.READ_ALL_COLLECTIONS_FAILURE:
            return {fetched: false};

        case types.ON_LOAD_MORE_INITIATE:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_SUCCESS: {
            let newCollections = state.collections.data.collections;

            Object.keys(action.collections).map((key) => {
                newCollections.push(action.collections[key])
            });
            // Check if the list has finished aka if there are no more collections to load
            if (newCollections && newCollections.length % 10 === 0) {
                return {
                    ...state,
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

        case types.ITERATE_LOAD_AFTER:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        default:
            return state;
    }
}