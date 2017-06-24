import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Auth from '../../modules/Auth';
import Login from '../../components/Authentication/Login.jsx';

let socket = io.connect();

class LoginView extends Component {
    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            user: {
                email: '',
                password: ''
            }
        };
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();
    }

    onChange = (e) => {
        const field = e.target.name;
        const user = this.state.user;
        user[field] = e.target.value;

        this.setState({
            user
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        //The next few lines will define the HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/authentication/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });

                Auth.authenticateUser(xhr.response.token);

                socket.emit("getCredentials");

                this.context.router.replace('/');
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    };

    render() {
        document.title = "Login";
        return (
            <Login
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

LoginView.contextTypes = {
    router: PropTypes.object.isRequired
};

export default connect()(LoginView);
