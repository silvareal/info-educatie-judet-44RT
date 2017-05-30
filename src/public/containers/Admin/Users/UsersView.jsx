import React, {Component} from 'react'

import Users from '../../../components/Admin/Users/Main Components/Users.jsx';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import UsersRowsMobile from '../../../components/Admin/Users/Partials Components/UsersRowsMobile.jsx';
import Auth from '../../../modules/Auth.js';

import {TableRow, TableRowColumn, Card} from 'material-ui';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";

let selectedUserId = [];
let clicked = [];

class UsersView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            users: {},
            message: '',
            fetchedUsers: false,
            rows1: '',
            rows2: '',
            searchQuery: '',
            searched: '',
            rows3: '',
            rows4: '',
            userIdToBan: '',
            currentMode: 'Moderators'
        };
    }

    adminAuth = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                if (xhr.response.message === "Welcome admin")
                    this.setState({
                        isAdmin: true
                    });
                else {
                    this.setState({
                        isAdmin: false
                    });
                }
            }
        });
        xhr.send();
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();
        this.adminAuth();
        this.showAddedModerators();
    }

    cellClick = (rowNumber) => {
        selectedUserId[rowNumber] = this.state.users[rowNumber]._id;
    };

    cellDeclick = (rowNumber) => {
        selectedUserId[rowNumber] = undefined;
    };

    mobileAddModerators = (i) => () => {
        selectedUserId[0] = this.state.users[i]._id;
        this.onSaveModerators();
        this.showAddedModerators();
    };

    mobileBanUser = (userId) => () => {
        this.onBanUser(userId);
        this.showAddedModerators();
    };

    onBanUser = (userId) => {

        this.setState({
            fetchedUsers: false
        });

        const userIdToBan = encodeURIComponent(userId);

        const formData = `userIdToBan=${userIdToBan}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/banUser');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    message: xhr.response.message
                })
            }
        });
        xhr.send(formData);
    };

    onSaveModerators = () => {

        this.setState({
            fetchedUsers: false
        });

        const selectedUserIdInsert = encodeURIComponent(JSON.stringify(selectedUserId));
        const formData = `moderators=${selectedUserIdInsert}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/makeModerators');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //specified users were given or revoked moderator permissions
                this.setState({
                    message: xhr.response.message
                });
            }
            else {
                this.setState({
                    message: xhr.response.message
                });
            }
        });
        xhr.send(formData);
        //reset checkboxes
        selectedUserId.length = 0;
        clicked.length = 0;
    };

    onSearchQueryChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearchUser();
        }
    };

    onSearchUser = () => {
        let users = this.state.users;

        if (this.state.searchQuery)
            this.setState({
                searched: true
            });
        else this.setState({
            searched: false
        });

        let j = 0;

        let rows1 = Object.keys(users).map((i) => {
            if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery) || users[i]._id === this.state.searchQuery) {
                j++;
                return (
                    <TableRow key={i}>
                        <TableRowColumn>{users[i].email}</TableRowColumn>
                        <TableRowColumn>{users[i].moderator === true ? "Y" : "N"}</TableRowColumn>
                    </TableRow>
                )
            }
        });

        j = 0;

        let rows2 = Object.keys(users).map((i) => {
            if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery)) {
                j++;
                return (
                    <UsersRowsMobile key={j}
                                     index={i}
                                     user={users[i]}
                                     mobileAddModerators={this.mobileAddModerators}/>
                )
            }
        });

        j = 0;

        let rows3 = Object.keys(users).map((i) => {
            if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery)) {
                j++;
                return (
                    <UsersRowsMobile key={j}
                                     index={i}
                                     user={users[i]}
                                     userId={users[i]._id}
                                     mobileBanUser={this.mobileBanUser}/>
                )
            }
        });

        this.setState({
            rows1, rows2, rows3
        })
    };

    //also used for showing banned users
    //will change name in 0.0.4
    showAddedModerators = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/showUsers');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    users: xhr.response.data,
                    fetchedUsers: true
                });

                let users = this.state.users;

                if (!this.state.searchQuery) {

                    let rows1 = Object.keys(users).map((i) => (
                        <TableRow key={i}>
                            <TableRowColumn>{users[i].email}</TableRowColumn>
                            <TableRowColumn>{users[i].moderator === true ? "Y" : "N"}</TableRowColumn>
                        </TableRow>
                    ));

                    let rows2 = Object.keys(users).map((i) => (
                        <UsersRowsMobile key={i}
                                         index={i}
                                         user={users[i]}
                                         mobileAddModerators={this.mobileAddModerators}/>
                    ));

                    let rows3 = Object.keys(users).map((i) => (
                        <UsersRowsMobile key={i}
                                         index={i}
                                         user={users[i]}
                                         userId={users[i]._id}
                                         mobileBanUser={this.mobileBanUser}/>
                    ));


                    this.setState({
                        rows1, rows2, rows3
                    })
                }

                else {

                    let j = 0;

                    let rows1 = Object.keys(users).map((i) => {
                        if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery) || users[i]._id === this.state.searchQuery) {
                            j++;
                            return (
                                <TableRow key={i}>
                                    <TableRowColumn>{users[i].email}</TableRowColumn>
                                    <TableRowColumn>{users[i].moderator === true ? "Y" : "N"}</TableRowColumn>
                                </TableRow>
                            )
                        }
                    });

                    j = 0;

                    let rows2 = Object.keys(users).map((i) => {
                        if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery)) {
                            j++;
                            return (
                                <UsersRowsMobile key={j}
                                                 index={i}
                                                 user={users[i]}
                                                 mobileAddModerators={this.mobileAddModerators}/>
                            )
                        }
                    });

                    j = 0;

                    let rows3 = Object.keys(users).map((i) => {
                        if (users[i].email.includes(this.state.searchQuery) || users[i].name.includes(this.state.searchQuery)) {
                            j++;
                            return (
                                <UsersRowsMobile key={j}
                                                 index={i}
                                                 user={users[i]}
                                                 userId={users[i]._id}
                                                 mobileBanUser={this.mobileBanUser}/>
                            )
                        }
                    });

                    this.setState({
                        rows1, rows2, rows3
                    });
                }
            }
            else {
                this.setState({
                    message: xhr.response.message,
                    fetchedUsers: true
                })
            }
        });
        xhr.send();
    };

    addModerators = () => {
        this.onSaveModerators();
        this.showAddedModerators();
    };

    changeAppMode = (newMode) => {
        this.setState({
            currentMode: newMode
        });
    };

    render() {

        document.title = "User management";
        if (this.state.isAdmin !== true && this.state.fetchedUsers === false) {
            return <div>
                <div className="top-bar-spacing"/>
                <Card className="container-manage-users" style={{boxShadow: "none"}}>
                    <LoadingIndicator/>
                </Card>
            </div>
        }
        if (this.state.isAdmin === true) {

            let modeComponent =
                <Users
                    currentMode={this.state.currentMode}
                    searched={this.state.searched}
                    handleKeyPress={this.handleKeyPress}
                    onSearchUser={this.onSearchUser}
                    searchQuery={this.state.searchQuery}
                    onSearchQueryChange={this.onSearchQueryChange}
                    rows1={this.state.rows1}
                    rows2={this.state.rows2}
                    mobileAddModerators={this.mobileAddModerators}
                    fetchedUsers={this.state.fetchedUsers}
                    userId={this.props.params._id}
                    users={this.state.users}
                    message={this.state.message}
                    clicked={clicked}
                    cellClick={this.cellClick}
                    cellDeclick={this.cellDeclick}
                    addModerators={this.addModerators}
                    changeAppMode={this.changeAppMode}/>;

            switch (this.state.currentMode) {
                case 'Moderators':
                    break;
                case 'Ban':
                    modeComponent =
                        <Users
                            currentMode={this.state.currentMode}
                            searched={this.state.searched}
                            handleKeyPress={this.handleKeyPress}
                            onSearchUser={this.onSearchUser}
                            searchQuery={this.state.searchQuery}
                            onSearchQueryChange={this.onSearchQueryChange}
                            rows3={this.state.rows3}
                            mobileAddModerators={this.mobileAddModerators}
                            fetchedUsers={this.state.fetchedUsers}
                            userId={this.props.params._id}
                            users={this.state.users}
                            message={this.state.message}
                            clicked={clicked}
                            cellClick={this.cellClick}
                            cellDeclick={this.cellDeclick}
                            addModerators={this.addModerators}
                            changeAppMode={this.changeAppMode}/>;
            }

            return (
                modeComponent
            )
        }
        else return <NotAuthorizedView/>
    }
}
export default UsersView;