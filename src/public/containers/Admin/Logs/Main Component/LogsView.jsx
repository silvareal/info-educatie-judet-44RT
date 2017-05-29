import React, {Component} from 'react';

import Auth from '../../../../modules/Auth.js';
import Logs from '../../../../components/Admin/Logs/Main Component/Logs.jsx'
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

import {Card} from 'material-ui';

class LogsView extends Component {

    constructor(props){
        super(props);

        this.state= {
            isAdmin: false,
            fetched: false
        }
    }

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
                    fetched: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    }

    render() {
        document.title = "Logs - Overview";
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
                <Logs userId={this.props.params._id} />
            )
        }
        else return <NotAuthorizedView/>
    }
}

export default LogsView;