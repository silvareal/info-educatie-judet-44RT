import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Users from '../../../components/Admin/Users/Main Components/Users.jsx';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import UsersRowsMobile from '../../../components/Admin/Users/Partials Components/UsersRowsMobile.jsx';
import * as usersActions from '../../../actions/Admin/Users/manageUsersActionsAdmin.js';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let getAllUsers = function () {
        dispatch(usersActions.getAllUsers())
    };

    let onGetRows = function (rowsModerators, rowsBan) {
        dispatch(usersActions.onGetRows(rowsModerators, rowsBan))
    };

    let onAddModerators = function (userId) {
        dispatch(usersActions.onAddModerators(userId))
    };

    let onBanUser = function (userId) {
        dispatch(usersActions.onBanUser(userId))
    };

    let onChangeAppMode = function (newMode) {
        dispatch(usersActions.onChangeAppMode(newMode))
    };

    let onSearchQueryChange = function (searchQuery) {
        dispatch(usersActions.onSearchQueryChange(searchQuery))
    };

    let onSearchUser = function (searchQuery, users) {
        dispatch(usersActions.onSearchUser(searchQuery, users))
    };

    let onGetRowsFound = function (rowsModeratorsFound, rowsBanFound) {
        dispatch(usersActions.onGetRowsFound(rowsModeratorsFound, rowsBanFound))
    };

    return {
        getAllUsers,
        onGetRows,
        onAddModerators,
        onBanUser,
        onChangeAppMode,
        onSearchQueryChange,
        onSearchUser,
        onGetRowsFound
    }
};

class UsersView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onBanUser = (userId) => () => {
        this.handlers.onBanUser(userId);

        // Give the Store time to update
        setTimeout(() => {
            this.handlers.getAllUsers();
            setTimeout(() => {
                let users = this.props.users.users;
                if (users) {
                    let rowsModerators = Object.keys(users).map((i) => {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onAddModerator={this.onAddModerator}/>
                    });

                    let rowsBan = Object.keys(users).map((i) => {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onBanUser={this.onBanUser}/>
                    });

                    this.handlers.onGetRows(rowsModerators, rowsBan);
                    this.onSearchUser();
                }
            }, 200)
        }, 300);
    };

    onAddModerator = (userId) => () => {
        this.handlers.onAddModerators(userId);

        // Give the Store time to update
        setTimeout(() => {
            this.handlers.getAllUsers();
            setTimeout(() => {
                let users = this.props.users.users;
                if (users) {
                    let rowsModerators = Object.keys(users).map((i) => {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onAddModerator={this.onAddModerator}/>
                    });

                    let rowsBan = Object.keys(users).map((i) => {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onBanUser={this.onBanUser}/>
                    });

                    this.handlers.onGetRows(rowsModerators, rowsBan);
                    this.onSearchUser();
                }
            }, 200)
        }, 300);
    };

    componentDidMount() {
        this.handlers.getAllUsers();

        setTimeout(() => {
            let users = this.props.users.users;
            if (users) {
                let rowsModerators = Object.keys(users).map((i) => {
                    return <UsersRowsMobile key={i}
                                            user={users[i]}
                                            onAddModerator={this.onAddModerator}/>
                });

                let rowsBan = Object.keys(users).map((i) => {
                    return <UsersRowsMobile key={i}
                                            user={users[i]}
                                            onBanUser={this.onBanUser}/>
                });

                this.handlers.onGetRows(rowsModerators, rowsBan);
            }
        }, 500)
    }

    onSearchQueryChange = (e) => {
        this.handlers.onSearchQueryChange(e.target.value);
        if (e.target.value === "")
            this.handlers.onGetRowsFound("", "")
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearchUser();
        }
    };

    onSearchUser = () => {
        this.handlers.onSearchUser(this.props.users.searchQuery, this.props.users.users);

        setTimeout(() => {
            let users = this.props.users.usersFound;
            if (users) {
                let rowsModeratorsFound = Object.keys(users).map((i) => {
                    if (users[i] && (users[i].email.includes(this.props.users.searchQuery) || users[i].name.includes(this.props.users.searchQuery) || users[i]._id === this.props.users.searchQuery)) {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onAddModerator={this.onAddModerator}/>
                    }
                });

                let rowsBanFound = Object.keys(users).map((i) => {
                    if (users[i] && (users[i].email.includes(this.props.users.searchQuery) || users[i].name.includes(this.props.users.searchQuery) || users[i]._id === this.props.users.searchQuery)) {
                        return <UsersRowsMobile key={i}
                                                user={users[i]}
                                                onBanUser={this.onBanUser}/>
                    }
                });

                this.handlers.onGetRowsFound(rowsModeratorsFound, rowsBanFound)
            }
        }, 500)
    };

    changeAppMode = (newMode) => {
        this.handlers.onChangeAppMode(newMode);
    };

    render() {

        document.title = "User management";

        if (this.props.credentials.admin === true) {
            if (this.props.users.fetchedUsers === true)
                return <Users
                    rowsModeratorsFound={this.props.users.rowsModeratorsFound}
                    rowsBanFound={this.props.users.rowsBanFound}
                    rowsModerators={this.props.users.rowsModerators}
                    rowsBan={this.props.users.rowsBan}
                    users={this.props.users.users}
                    currentMode={this.props.users.currentMode}
                    handleKeyPress={this.handleKeyPress}
                    searchQuery={this.props.users.searchQuery}
                    onSearchQueryChange={this.onSearchQueryChange}
                    onSearchUser={this.onSearchUser}
                    changeAppMode={this.changeAppMode}/>;
            else if (this.props.users.fetchedUsers === false && this.props.users.fetchingUsers === true)
                return <LoadingIndicator/>;
            else if (this.props.users.fetchingUsers === false && this.props.users.fetchedUsers === false)
                return (
                    <div>
                        No users found
                    </div>
                )
        }
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

UsersView.propTypes = {};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

const users = (state) => {
    if (state.manageUsersReducerAdmin.fetching === true)
        return {
            fetchingUsers: true,
            fetchedUsers: false,
            users: {}
        };
    else if (state.manageUsersReducerAdmin.fetched === true && state.manageUsersReducerAdmin.fetching === false) {
        return {
            fetchedUsers: true,
            fetchingUsers: false,
            users: state.manageUsersReducerAdmin.users,
            currentMode: state.manageUsersReducerAdmin.currentMode,
            searchQuery: state.manageUsersReducerAdmin.searchQuery,
            addedModerator: state.manageUsersReducerAdmin.addedModerator,
            bannedUser: state.manageUsersReducerAdmin.bannedUser,
            usersFound: state.manageUsersReducerAdmin.usersFound,
            rowsModerators: state.manageUsersReducerAdmin.rowsModerators,
            rowsBan: state.manageUsersReducerAdmin.rowsBan,
            rowsModeratorsFound: state.manageUsersReducerAdmin.rowsModeratorsFound,
            rowsBanFound: state.manageUsersReducerAdmin.rowsBanFound
        }
    }
    else if (state.manageUsersReducerAdmin.fetched === false && state.manageUsersReducerAdmin.fetching === false) {
        return {
            fetchedUsers: false,
            fetchingUsers: false
        }
    }
    else if (state.manageUsersReducerAdmin.fetched === null && state.manageUsersReducerAdmin.fetching === null) {
        return {
            fetchedUsers: false,
            fetchingUsers: true
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    users: users(state)
});

export default connect(mapStateToProps)(UsersView)