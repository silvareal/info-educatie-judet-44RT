import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsCollectionsUpdate from '../../../components/Admin/Logs/LogsCollectionsUpdate.jsx';

class LogsCollectionsUpdateView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsCollectionsUpdate");
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
            <LogsCollectionsUpdate logs={this.state.logs}/>
        )
    }
}

export default LogsCollectionsUpdateView;