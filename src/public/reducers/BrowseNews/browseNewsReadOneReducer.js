import * as types from '../../actions/actionTypes.js';

export default function browseNewsReadOneReducer(state = {
    loadAfter: 10,
    finished: false,
    requesting: false,
    comment: "",
    commentAdded: null,
    commentsCount: 0,
    newsId: -1,
    fetchedNews: false,
    fetchingNews: false,
    fetchedComments: false,
    news: {}
}, action) {
    switch (action.type) {

        case types.READ_ONE_NEWS_BROWSE_INITIATE:
            return {
                ...state,
                fetchingNews: true,
                fetchedNews: false
            };

        case types.READ_ONE_NEWS_BROWSE_SUCCESS:
            return {
                ...state,
                fetchedNews: true,
                fetchingNews: false,
                news: action.news,
                newsDescriptionRaw: action.news.newsDescriptionRaw
            };

        case types.READ_ONE_NEWS_BROWSE_FAILURE:
            return {
                ...state,
                fetchedNews: false,
                fetchingNews: false
            };

        case types.GET_COMMENTS_NEWS_BROWSE_INITIATED:
            return {
                ...state,
                fetched: false,
                fetching: true
            };

        case types.GET_COMMENTS_NEWS_BROWSE_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching:false,
                comments: action.comments
            };

        case types.GET_COMMENTS_NEWS_BROWSE_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_INITIATE:
            return {
                ...state,
                requesting: true,
                finished: false
            };

        case types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_SUCCESS: {

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

        case types.ITERATE_COMMENTS_LOAD_AFTER_NEWS_BROWSE:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        case types.ON_CHANGE_COMMENT_INPUT_NEWS_BROWSE:
            return {
                ...state,
                comment: action.comment
            };

        case types.ON_SAVE_COMMENT_NEWS_BROWSE_INITIATE:
            return {
                ...state,
                message: "Data sent to the server"
            };

        case types.ON_SAVE_COMMENT_NEWS_BROWSE_SUCCESS:
            return {
                ...state,
                commentAdded: true,
                comment: ""
            };

        case types.ON_SAVE_COMMENT_NEWS_BROWSE_FAILURE:
            return {
                ...state,
                commentAdded: false
            };

        case types.GET_COMMENTS_COUNT_NEWS_BROWSE:
            return {
                ...state,
                commentsCount: action.count
            };


        default:
            return state;
    }
}