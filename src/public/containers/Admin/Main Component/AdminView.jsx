import React, {Component} from 'react';

import AdminPage from '../../../components/Admin/Main Component/AdminPage.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class AdminView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            users: {},
            message: ''
        };
    }

    //Check if the user that requests this page is an admin or not
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true,
                    message: xhr.response.message
                })
            }
        });
        xhr.send();
    }

    render() {
        document.title = "Admin panel";
        return (
            <div>
                {this.state.isAdmin ?
                    <AdminPage
                        userId={this.props.params._id}
                        message={this.state.message}
                    /> : <NotAuthorizedPage/>}
            </div>
        )
    }

}

export default AdminView;