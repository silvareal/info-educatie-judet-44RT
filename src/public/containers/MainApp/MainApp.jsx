import React, {Component} from 'react';
import {Link} from 'react-router';

import Auth from '../../modules/Auth';

import AppBarPersonal from '../../components/MainApp Partials/AppBar.jsx';

let runTime = 0;

class MainApp extends Component {
    constructor(props){
        super(props);

        this.state={
            userName: '',
            userId: '',
            isAdmin: false,
            openMenu: false
        }
    }

    handleOnRequestChange = (value) => {
        this.setState({
            openMenu: value,
        });
    };

    handleCloseMenu = () => {
        this.setState({
            openMenu: false
        })
    };

    getCredentials = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/credentials');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    userName: xhr.response.userName,
                    userId: xhr.response.userId
                })
            }
        });
        xhr.send();
    };

    getAdminStatus = () => {
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

    render() {
        if (Auth.isUserAuthenticated() && runTime === 0) {
            this.getAdminStatus();
            this.getCredentials();
            runTime++;
        }
        if (!Auth.isUserAuthenticated()) {
            runTime = 0;
        }
        return(
            <div className="force-parallax">
                <AppBarPersonal
                userId={this.state.userId}
                userName={this.state.userName}
                isAdmin={this.state.isAdmin}
                handleOnRequestChange={this.handleOnRequestChange}
                handleCloseMenu={this.handleCloseMenu}
                openMenu={this.state.openMenu}
                />
                <div style={{height: 64}}/>
                {this.props.children}
            </div>
        )
    }
}

export default MainApp;
