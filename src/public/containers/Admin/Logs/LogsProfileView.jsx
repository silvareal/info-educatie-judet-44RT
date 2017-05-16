import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsProfile from '../../../components/Admin/Logs/LogsProfile.jsx';

class LogsProfileView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsProfile");
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
            <LogsProfile logs={this.state.logs}/>
        )
    }
}

export default LogsProfileView;