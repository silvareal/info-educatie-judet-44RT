import React, {Component} from 'react';

import AdminPage from '../../../components/Admin/Main Component/Admin.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';

class AdminView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            message: '',
            userName: '',
            firstName: '',
            profilePictureLink: '',
            adminId: ''
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
                    isAdmin: true,
                    message: xhr.response.message
                })
            }
        });
        xhr.send();
    };

    getUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/comment/getUserCredentials");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    userName: xhr.response.userName,
                    firstName: xhr.response.firstName,
                    profilePictureLink: xhr.response.profilePictureLink,
                    adminId: xhr.response.userId
                });
            }
        });

        xhr.send();
    };

    //Check if the user that requests this page is an admin or not
    componentDidMount() {
        this.resetScroll();
        this.adminAuth();
        this.getUser();
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    render() {
        document.title = "Admin panel";
        if (this.state.isAdmin) {
            return (
                <div>
                    <AdminPage
                        adminId={this.state.adminId}
                        userName={this.state.userName}
                        firstName={this.state.firstName}
                        profilePictureLink={this.state.profilePictureLink}
                        userId={this.props.params._id}
                        message={this.state.message}
                    />
                </div>
            )
        }
        else return <NotAuthorizedView/>
    }
}

export default AdminView;