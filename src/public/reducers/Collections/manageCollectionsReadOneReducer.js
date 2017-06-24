import * as types from '../../actions/actionTypes.js';

export default function manageCollectionsReadOneReducer(state = {
    loadAfter: 10,
    finished: false,
    requesting: false,
    comment: "",
    commentAdded: null,
    commentsCount: 0
}, action) {
    switch (action.type) {

        case types.READ_ONE_COLLECTION:
            return {
                ...state,
                collectionId: action.collectionId
            };

        case types.GET_COMMENTS_INITIATED:
            return {
                ...state,
                fetched: false,
                fetching: true
            };

        case types.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching:false,
                comments: action.comments
            };

        case types.GET_COMMENTS_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_LOAD_MORE_COMMENTS_INITIATE:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_COMMENTS_SUCCESS: {

            let newComments = state.comments.data.comments;

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

        case types.ITERATE_COMMENTS_LOAD_AFTER:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_COMMENTS_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        case types.ON_CHANGE_COMMENT_INPUT:
            return {
                ...state,
                comment: action.comment
            };

        case types.ON_SAVE_COMMENT_INITIATE:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_COMMENT_SUCCESS:
            return {
                ...state,
                commentAdded: true,
                comment: ""
            };

        case types.ON_SAVE_COMMENT_FAILURE:
            return {
                ...state,
                commentAdded: false
            };

        case types.GET_COMMENTS_COUNT:
            return {
                ...state,
                commentsCount: action.count
            };

        default:
            return state;
    }
}