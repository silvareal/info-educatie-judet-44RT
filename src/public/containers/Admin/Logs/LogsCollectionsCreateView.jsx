import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsCollectionsCreate from '../../../components/Admin/Logs/LogsCollectionsCreate.jsx';

class LogsCollectionsCreateView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsCollectionsCreate");
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
            <LogsCollectionsCreate logs={this.state.logs}/>
        )
    }
}

export default LogsCollectionsCreateView;