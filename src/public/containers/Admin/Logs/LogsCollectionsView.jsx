import React, {Component} from 'react';

import LogsCollections from '../../../components/Admin/Logs/LogsCollections.jsx';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';
import Auth from '../../../modules/Auth.js'

class LogsCollectionsView extends Component {
    constructor(props){
        super(props);

        this.state = {
            isAdmin: false,
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
        document.title = "Logs - Collections Overview";
        if (this.state.isAdmin === true)
        {
            return (
                <LogsCollections userId={this.props.params._id} />
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default LogsCollectionsView;