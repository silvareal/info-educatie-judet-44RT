import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js';
import LogsSignup from '../../../components/Admin/Logs/LogsSignup.jsx';

class LogsSignupView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/logsSignup');
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
            <LogsSignup
                logs={this.state.logs}
            />
        )
    }

}

export default LogsSignupView;