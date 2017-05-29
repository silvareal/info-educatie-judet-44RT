import React, {Component} from 'react';

import Auth from '../../../../modules/Auth.js';
import LogsLogin from '../../../../components/Admin/Logs/Login/LogsLogin.jsx';
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

import {Card} from 'material-ui';

class LogsLoginView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}],
            isAdmin: false,
            fetched: false
        }
    }

    adminAuth = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    };

    getLogs = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/logsLogin');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    logs: xhr.response.logs,
                    fetched: true
                });
            }
        });

        xhr.send();
    };

    componentDidMount() {
        this.adminAuth();
        this.getLogs();
    }

    render() {
        document.title = "Logs - Login";
        if (this.state.fetched === false && this.state.isAdmin !== true)
            return (
                <div>
                    <div className="top-bar-spacing"/>
                    <Card className="container-logs" style={{boxShadow: "none"}}>
                        <LoadingIndicator/>
                    </Card>
                </div>
            );
        if (this.state.isAdmin === true)
        {
            return (
                <LogsLogin
                    logs={this.state.logs}
                    userId={this.props.params._id}
                />
            )
        }
        else return <NotAuthorizedView/>
    }

}

export default LogsLoginView;