import * as types from '../actions/actionTypes.js';

export default function newsHomeViewReducer(state = {
    comments: [{value: ''}, {value: ''}, {value: ''}, {value: ''}],
    successCommentNews: null,
    openSnackBar: false
}, action) {
    switch (action.type) {
        case types.READ_NEWS_HOME_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.READ_NEWS_HOME_SUCCESS:
            return {
                ...state,
                news: action.news,
                fetched: true,
                fetching: false
            };

        case types.READ_NEWS_HOME_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false};

        case types.ON_COMMENT_CHANGE_NEWS_HOME: {
            const newComments = state.comments.map((comment, j) => {
                if (action.key !== j) return comment;
                return {...comment, value: action.comment, newsId: action.newsId}
            });
            return {
                ...state,
                comments: newComments
            };
        }

        case types.ON_SAVE_COMMENT_NEWS_HOME_INITIATE:
            return {
                ...state,
            };

        case types.ON_SAVE_COMMENT_NEWS_HOME_SUCCESS:
            return {
                ...state,
                successCommentNews: true
            };

        case types.ON_SAVE_COMMENT_NEWS_HOME_FAILURE:
            return {
                ...state,
                successCommentNews: false
            };

        case types.ON_OPEN_SNACK_BAR_HOME_VIEW:
            return {
                ...state,
                openSnackBar: true
            };

        case types.ON_CLOSE_SNACK_BAR_HOME_VIEW:
            return {
                ...state,
                openSnackBar: false
            };

        default:
            return state;
    }
}