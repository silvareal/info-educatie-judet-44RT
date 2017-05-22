import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js';
import Logs from '../../../components/Admin/Logs/Logs.jsx'
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class LogsView extends Component {

    constructor(props){
        super(props);

        this.state= {
            isAdmin: false
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
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    }

    render() {
        document.title = "Logs - Overview";
        if (this.state.isAdmin === true)
        {
            return (
                <Logs userId={this.props.params._id} />
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default LogsView;