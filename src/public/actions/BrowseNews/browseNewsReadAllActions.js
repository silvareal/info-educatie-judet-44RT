import * as types from '../actionTypes.js';
import axios from 'axios';
import qs from 'qs';

// Initiated the Axios request
export function getNewsInitiated() {
    return {type: types.READ_ALL_NEWS_BROWSE_INITIATED}
}

// Successfully retrieved the news
export function getNewsSuccess(news) {
    return {type: types.READ_ALL_NEWS_BROWSE_SUCCESS, news: news}
}

// Failed to retrieve the news
export function getNewsFailure() {
    return {type: types.READ_ALL_NEWS_BROWSE_FAILURE}
}

// Function for retrieving the news
export function getAllNews() {
    return function (dispatch) {
        dispatch(getNewsInitiated());
        return axios({
            method: 'get',
            url: '/browse/readAllNews',
        }).then((response) => {
            dispatch(getNewsSuccess(response))
        }).catch(() => {
            dispatch(getNewsFailure())
        })
    }
}

// Initiated the Axios request
export function onLoadMoreInitiate(loadAfter) {
    return {type: types.ON_LOAD_MORE_BROWSE_NEWS_INITIATE, loadAfter: loadAfter}
}

// Successfully retrieved the news
export function onLoadMoreSuccess(news) {
    return {type: types.ON_LOAD_MORE_BROWSE_NEWS_SUCCESS, news: news}
}

// Failed to retrieve the news
export function onLoadMoreFailure(message) {
    return {type: types.ON_LOAD_MORE_BROWSE_NEWS_FAILURE, message: message}
}

// Iterate loadAfter if we successfully loaded more news
export function iterateLoadAfter(loadAfter) {
    return {type: types.ITERATE_LOAD_AFTER_BROWSE_NEWS, loadAfter}
}

// Function for x news after the first y
export function onLoadMore(loadAfter) {
    return function (dispatch) {
        dispatch(onLoadMoreInitiate());
        return axios({
            method: 'post',
            url: '/browse/loadMoreNews',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                'loadAfter': loadAfter
            })
        }).then((response) => {
            dispatch(onLoadMoreSuccess(response.data.news));
            dispatch(iterateLoadAfter(loadAfter))
        }).catch((err) => {
            console.log(err);
            dispatch(onLoadMoreFailure(err.response.data.message))
        })
    }
}