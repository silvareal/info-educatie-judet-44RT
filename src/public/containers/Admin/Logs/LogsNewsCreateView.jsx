import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsNewsCreate from '../../../components/Admin/Logs/LogsNewsCreate.jsx';

class LogsNewsCreateView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsNewsCreate");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    logs: xhr.response.logs
                })
            }
        });

        xhr.send();
    }

    render() {
        return (
            <LogsNewsCreate logs={this.state.logs}/>
        )
    }
}

export default LogsNewsCreateView;