import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsCollectionsDelete from '../../../components/Admin/Logs/LogsCollectionsDelete.jsx';

class LogsCollectionsDeleteView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsCollectionsDelete");
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
            <LogsCollectionsDelete logs={this.state.logs}/>
        )
    }
}

export default LogsCollectionsDeleteView;