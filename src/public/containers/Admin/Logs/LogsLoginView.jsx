import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js';
import LogsLogin from '../../../components/Admin/Logs/LogsLogin.jsx';

class LogsLoginView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/logsLogin');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    logs: xhr.response.logs
                });
            }
        });

        xhr.send();
    }

    render() {
        return (
            <LogsLogin
                logs={this.state.logs}
            />
        )
    }

}

export default LogsLoginView;