import * as types from '../../../actions/actionTypes.js';

export default function manageUsersReducerAdmin(state = {
    users: {},
    fetched: null,
    fetching: null,
    addedModerator: null,
    bannedUser: null,
    openModal: [],
    openSnackBar: [],
    currentMode: 'Moderators',
    searchQuery: '',
    usersFound: {},
    rowsModerators: "",
    rowsBan: "",
    rowsModeratorsFound: "",
    rowsBanFound: ""
}, action) {
    switch (action.type) {
        case types.ON_FETCH_ALL_USERS_INITIATE_ADMIN:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.ON_FETCH_ALL_USERS_SUCCESS_ADMIN:
            return {
                ...state,
                fetched: true,
                fetching: false,
                users: action.users
            };

        case types.ON_FETCH_ALL_USERS_FAILURE_ADMIN:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_GET_ROWS_USERS_ADMIN:
            return {
                ...state,
                rowsModerators: action.rowsModerators,
                rowsBan: action.rowsBan
            };

        case types.ON_GET_ROWS_FOUND_USERS_ADMIN:
            return {
                ...state,
                rowsModeratorsFound: action.rowsModeratorsFound,
                rowsBanFound: action.rowsBanFound
            };

        case types.ON_ADD_MODERATORS_INITIATE_ADMIN:
            return state;

        case types.ON_ADD_MODERATORS_SUCCESS_ADMIN:
            return {
                ...state,
                addedModerator: true
            };

        case types.ON_ADD_MODERATORS_FAILURE_ADMIN:
            return state;

        case types.ON_BAN_USER_INITIATE_ADMIN:
            return state;

        case types.ON_BAN_USER_SUCCESS_ADMIN:
            return {
                ...state,
                bannedUser: true
            };

        case types.ON_BAN_USER_FAILURE_ADMIN:
            return state;

        case types.ON_OPEN_SNACK_BAR_USERS_ADMIN:
            return {
                ...state,
                openSnackBar: true
            };

        case types.ON_CLOSE_SNACK_BAR_USERS_ADMIN:
            return {
                ...state,
                openSnackBar: false
            };

        case types.ON_CHANGE_APP_MODE:
            return {
                ...state,
                currentMode: action.newMode
            };

        case types.ON_SEARCH_QUERY_CHANGE_USERS_ADMIN:
            return {
                ...state,
                searchQuery: action.searchQuery
            };

        case types.ON_SEARCH_USERS_INITIATE_ADMIN:
            return state;

        case types.ON_SEARCH_USERS_SUCCESS_ADMIN:
            return {
                ...state,
                usersFound: action.usersFound
            };

        case types.ON_SEARCH_USERS_FAILURE_ADMIN:
            return state;

        default:
            return state;
    }
}