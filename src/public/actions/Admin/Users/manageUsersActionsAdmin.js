import React from 'react';
import UsersRowsMobile from '../../../components/Admin/Users/Partials Components/UsersRowsMobile.jsx';
import * as types from '../../actionTypes.js';
import axios from 'axios';
import Auth from '../../../modules/Auth.js';
import qs from "qs";

// Initiated the Axios request
export function getAllUsersInitiate() {
    return {type: types.ON_FETCH_ALL_USERS_INITIATE_ADMIN}
}

// Successfully retrieved all users
export function getAllUsersSuccess(users) {
    return {type: types.ON_FETCH_ALL_USERS_SUCCESS_ADMIN, users: users}
}

// Failed to retrieve all users
export function getAllUsersFailure() {
    return {type: types.ON_FETCH_ALL_USERS_FAILURE_ADMIN}
}

// Function for retrieving all users
export function getAllUsers() {
    return function (dispatch) {
        dispatch(getAllUsersInitiate());
        return axios({
            method: 'get',
            url: '/admin/showUsers',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            dispatch(getAllUsersSuccess(response.data.users))
        }).catch((err) => {
            console.log(err);
            dispatch(getAllUsersFailure())
        })
    }
}

export function onGetRows(rowsModerators, rowsBan) {
    return function (dispatch) {
        dispatch({type: types.ON_GET_ROWS_USERS_ADMIN, rowsModerators: rowsModerators, rowsBan: rowsBan})
    }
}

export function onGetRowsFound(rowsModeratorsFound, rowsBanFound) {
    return function (dispatch) {
        dispatch({type: types.ON_GET_ROWS_FOUND_USERS_ADMIN, rowsModeratorsFound: rowsModeratorsFound, rowsBanFound: rowsBanFound})
    }
}

// Initiated the Axios request
export function onAddModeratorsInitiate() {
    return {type: types.ON_ADD_MODERATORS_INITIATE_ADMIN}
}

// Successfully added the user to moderators group
export function onAddModeratorsSuccess() {
    return {type: types.ON_ADD_MODERATORS_SUCCESS_ADMIN}
}

// Failed to add the user to moderators group
export function onAddModeratorsFailure() {
    return {type: types.ON_ADD_MODERATORS_FAILURE_ADMIN}
}

export function onOpenSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_OPEN_SNACK_BAR_USERS_ADMIN});
        setTimeout(() => {
            dispatch({type: types.ON_CLOSE_SNACK_BAR_USERS_ADMIN})
        }, 4000)
    }
}

export function onCloseSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_SNACK_BAR_USERS_ADMIN})
    }
}

// Function for adding moderators
export function onAddModerators(userId) {
    return function (dispatch) {
        dispatch(onAddModeratorsInitiate());
        return axios({
            method: 'post',
            url: '/admin/makeModerators',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'userId': userId
            })
        }).then(() => {
            dispatch(onAddModeratorsSuccess());
            dispatch(onOpenSnackBar());
        }).catch(() => {
            dispatch(onAddModeratorsFailure())
        })
    }
}

// Initiated the Axios request
export function onBanUserInitiate() {
    return {type: types.ON_BAN_USER_INITIATE_ADMIN}
}

// Successfully banned the user
export function onBanUserSuccess() {
    return {type: types.ON_BAN_USER_SUCCESS_ADMIN}
}

// Failed to ban the user
export function onBanUserFailure() {
    return {type: types.ON_BAN_USER_FAILURE_ADMIN}
}

// Function for banning users
export function onBanUser(userId) {
    return function (dispatch) {
        dispatch(onBanUserInitiate());
        return axios({
            method: 'post',
            url: '/admin/banUser',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'userIdToBan': userId
            })
        }).then(() => {
            dispatch(onBanUserSuccess());
            dispatch(onOpenSnackBar());
        }).catch(() => {
            dispatch(onBanUserFailure())
        })
    }
}

// Handle appMode change
export function onChangeAppMode(newMode) {
    return function (dispatch) {
        dispatch({type: types.ON_CHANGE_APP_MODE, newMode: newMode})
    }
}

// Handle searchQuery change
export function onSearchQueryChange(searchQuery) {
    return function (dispatch) {
        dispatch({type: types.ON_SEARCH_QUERY_CHANGE_USERS_ADMIN, searchQuery: searchQuery})
    }
}

// Initiated the axios request
export function onSearchUserInitiate() {
    return {type: types.ON_SEARCH_USERS_INITIATE_ADMIN}
}

// Successfully found user(s) matching the searchQuery
export function onSearchUserSuccess(usersFound) {
    return {type: types.ON_SEARCH_USERS_SUCCESS_ADMIN, usersFound: usersFound}
}

// Failed to find any users matching the searchQuery
export function onSearchUserFailure() {
    return {type: types.ON_SEARCH_USERS_FAILURE_ADMIN}
}

// Function for mapping users object and finding matches
export function onSearchUser(searchQuery, users) {
    return function (dispatch) {
        dispatch(onSearchUserInitiate());
        let usersFound = Object.keys(users).map((i) => {
            if (users[i].email.includes(searchQuery) || users[i].name.includes(searchQuery) || users[i]._id === searchQuery)
                return users[i]
        });
        if (usersFound){
            dispatch(onSearchUserSuccess(usersFound));
        }

        else dispatch(onSearchUserFailure())
    }
}