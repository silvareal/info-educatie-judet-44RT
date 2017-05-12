import React, {Component} from 'react'

import UsersPage from '../../../components/Admin/Users/UsersPage.jsx';
import Auth from '../../../modules/Auth.js';

let selectedUserId = [];
let clicked = [];

class UsersView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            users: {},
            message: ''
        };
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/showUsers');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true,
                    users: xhr.response.data
                })
            }
            else {
                this.setState({
                    message: xhr.response.message
                })
            }
        });
        xhr.send();
    }

    cellClick = (rowNumber) => {
        selectedUserId[rowNumber] = this.state.users[rowNumber]._id;
    };

    cellDeclick = (rowNumber) => {
        selectedUserId[rowNumber] = undefined;
    };

    onSaveModerators = () => {

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

    showAddedModerators = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/showUsers');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    users: xhr.response.data
                })
            }
        });
        xhr.send();
    };

    addModerators = () => {
        this.onSaveModerators();
        this.showAddedModerators();
    };

    render() {
        document.title = "User management";
        return (
            <div>
                {this.state.isAdmin ?
                 <UsersPage
                     userId={this.props.params._id}
                     users={this.state.users}
                     message={this.state.message}
                     clicked={clicked}
                     cellClick={this.cellClick}
                     cellDeclick={this.cellDeclick}
                     addModerators={this.addModerators}
                 /> : null}
            </div>
        )
    }
}
export default UsersView;