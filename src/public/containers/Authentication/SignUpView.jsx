import React, {Component} from 'react';
import PropTypes from 'prop-types'

import SignUp from '../../components/Authentication/SignUp.jsx';

class SignUpView extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            errors: {},
            user: {
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
            }
        };
    }

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
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const confirmPassword = encodeURIComponent(this.state.user.confirmPassword);

        const formData = `name=${name}&email=${email}&password=${password}&confirmPassword=${confirmPassword}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/authentication/signup');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {}
                });

                localStorage.setItem('successMessage', xhr.response.message);

                this.context.router.replace('/login');
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
        document.title = "Signup";
        return (
            <SignUp
                errors={this.state.errors}
                user={this.state.user}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

SignUpView.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpView;
