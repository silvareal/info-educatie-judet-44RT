import * as types from '../../../actions/actionTypes.js';

export default function manageCollectionsReadAllReducerAdmin(state = {}, action) {
    switch (action.type) {
        case types.READ_ALL_COLLECTIONS_INITIATED_ADMIN_COLLECTIONS:
            return {
                fetching: true,
                fetched: null
            };

        case types.READ_ALL_COLLECTIONS_SUCCESS_ADMIN_COLLECTIONS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                collections: action.collections,
                loadAfter: 10,
                finished: false,
                requesting: false
            };

        case types.READ_ALL_COLLECTIONS_FAILURE_ADMIN_COLLECTIONS:
            return {
                ...state,
                fetched: false
            };

        case types.ON_LOAD_MORE_INITIATE_ADMIN_COLLECTIONS:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_SUCCESS_ADMIN_COLLECTIONS: {
            let newCollections = state.collections.data.collections;

            if (action.collections) {
                Object.keys(action.collections).map((key) => {
                    newCollections.push(action.collections[key])
                });
                // Check if the list has finished aka if there are no more collections to load
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

        case types.ITERATE_LOAD_AFTER_ADMIN_COLLECTIONS:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_FAILURE_ADMIN_COLLECTIONS:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        default:
            return state;
    }
}