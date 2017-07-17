import * as types from '../../actions/actionTypes.js';

export default function browseCollectionsReadOneReducer(state = {
    loadAfter: 10,
    finished: false,
    requesting: false,
    comment: "",
    commentAdded: null,
    commentsCount: 0
}, action) {
    switch (action.type) {

        case types.READ_ONE_COLLECTION_BROWSE: {
            return {
                ...state,
                fetchedCollection: true,
                collectionId: action.collectionId
            };
        }

        case types.GET_COMMENTS_BROWSE_INITIATED:
            return {
                ...state,
                fetched: false,
                fetching: true
            };

        case types.GET_COMMENTS_BROWSE_SUCCESS: {
            if (action.comments.data.comments && action.comments.data.comments.length % 10 === 0) {
                return {
                    ...state,
                    fetched: true,
                    fetching: false,
                    comments: action.comments,
                    finished: false
                }
            }
            else if (action.comments.data.comments && action.comments.data.comments.length % 10 !== 0) {
                return {
                    ...state,
                    fetched: true,
                    fetching: false,
                    comments: action.comments,
                    finished: true
                }
            }
            else {
                return {
                    ...state,
                    fetched: true,
                    fetching: false,
                    comments: action.comments,
                    finished: false
                }
            }
        }

        case types.GET_COMMENTS_BROWSE_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_LOAD_MORE_COMMENTS_BROWSE_INITIATE:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_COMMENTS_BROWSE_SUCCESS: {

            let newComments = state.comments.data.comments;

            if (action.comments) {
                Object.keys(action.comments).map((key) => {
                    newComments.push(action.comments[key])
                });

                if (newComments && newComments.length % 10 === 0) {
                    return {
                        ...state,
                        requesting: false,
                        comments: {
                            ...state.comments,
                            data: {
                                ...state.comments.data,
                                comments: newComments
                            }
                        }
                    }
                }
                else return {
                    ...state,
                    finished: true,
                    requesting: false,
                    comments: {
                        ...state.comments,
                        data: {
                            ...state.comments.data,
                            comments: newComments
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

        case types.ITERATE_COMMENTS_LOAD_AFTER_BROWSE:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_COMMENTS_BROWSE_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        case types.ON_CHANGE_COMMENT_INPUT_BROWSE:
            return {
                ...state,
                comment: action.comment
            };

        case types.ON_SAVE_COMMENT_BROWSE_INITIATE:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_COMMENT_BROWSE_SUCCESS:
            return {
                ...state,
                commentAdded: true,
                comment: ""
            };

        case types.ON_SAVE_COMMENT_BROWSE_FAILURE:
            return {
                ...state,
                commentAdded: false
            };

        case types.GET_COMMENTS_COUNT_BROWSE:
            return {
                ...state,
                commentsCount: action.count
            };

        case types.ON_RESET_REDUCER_BROWSE_COLLECTIONS:
            return {
                loadAfter: 10,
                finished: false,
                requesting: false,
                comment: "",
                commentAdded: null,
                commentsCount: 0
            };

        default:
            return state;
    }
}