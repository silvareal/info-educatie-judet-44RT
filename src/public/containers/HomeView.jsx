import React, {Component} from 'react';

import Home from '../components/Home.jsx';
import Auth from '../modules/Auth.js'

class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userId: null
        }
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/credentials');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    userName: xhr.response.userName,
                    userId: xhr.response.userId
                })
            }
        });
        xhr.send();
    };

    render() {
        document.title = "4Art";
        return (
            <Home
                userName={this.state.userName}
                userId={this.state.userId}
            />
        )
    }
}

export default HomeView;