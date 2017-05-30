import React, {Component} from 'react';

import Auth from '../../../../modules/Auth.js';
import LogsSignup from '../../../../components/Admin/Logs/Signup/LogsSignup.jsx';
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

import {Card} from 'material-ui';

class LogsSignupView extends Component {
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
        xhr.open('get', '/admin/logsSignup');
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
        this.resetScroll();
        this.adminAuth();
        this.getLogs();
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    render() {
        document.title = "Logs - Signup";
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
                <LogsSignup
                    logs={this.state.logs}
                    userId={this.props.params._id}
                />
            )
        }
        else return <NotAuthorizedView/>
    }

}

export default LogsSignupView;