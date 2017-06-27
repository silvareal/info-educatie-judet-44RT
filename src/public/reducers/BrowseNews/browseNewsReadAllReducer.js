import * as types from '../../actions/actionTypes.js';

export default function browseNewsReadAllReducer(state = {}, action) {
    switch (action.type) {
        case types.READ_ALL_NEWS_BROWSE_INITIATED:
            return {
                fetching: true,
                fetched: null
            };

        case types.READ_ALL_NEWS_BROWSE_SUCCESS:
            return {
                ...state,
                fetched: true,
                fetching: false,
                news: action.news,
                loadAfter: 10,
                finished: false,
                requesting: false
            };

        case types.READ_ALL_NEWS_BROWSE_FAILURE:
            return {
                fetched: false
            };

        case types.ON_LOAD_MORE_BROWSE_NEWS_INITIATE:
            return {
                ...state,
                requesting: false,
                finished: false
            };

        case types.ON_LOAD_MORE_BROWSE_NEWS_SUCCESS: {
            let newNews = state.news.data.news;


            if (action.news) {
                Object.keys(action.news).map((key) => {
                    newNews.push(action.news[key])
                });

                if (newNews && newNews.length % 10 === 0) {
                    return {
                        ...state,
                        news: {
                            ...state.news,
                            data: {
                                ...state.news.data,
                                news: newNews
                            }
                        }
                    }
                }
                else return {
                    ...state,
                    finished: true,
                    requesting: false,
                    news: {
                        ...state.news,
                        data: {
                            ...state.news.data,
                            news: newNews
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

        case types.ITERATE_LOAD_AFTER_BROWSE_NEWS:
            return {
                ...state,
                loadAfter: action.loadAfter + 10
            };

        case types.ON_LOAD_MORE_BROWSE_NEWS_FAILURE:
            return {
                ...state,
                requesting: false,
                finished: true
            };

        default:
            return state;
    }
}