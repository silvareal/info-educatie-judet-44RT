import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as loginActions from '../../actions/Authentication/loginActions.js';
import Login from '../../components/Authentication/Login.jsx';

let createHandler = function (dispatch) {
    let onUserInfoChange = function (fieldName, user, value) {
        dispatch(loginActions.onUserInfoChange(fieldName, user, value))
    };

    let onLogin = function (user) {
        dispatch(loginActions.onLogin(user))
    };

    return {
        onUserInfoChange,
        onLogin
    }
};

class LoginView extends Component {
    constructor(props, context) {
        super(props, context);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.resetScroll();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true)
            this.context.router.replace('/')
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onChange = (e) => {
        this.handlers.onUserInfoChange(e.target.name, this.props.user, e.target.value);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.handlers.onLogin(this.props.user);
    };

    render() {
        document.title = "Login";
        return (
            <Login
                errors={this.props.errors}
                user={this.props.user}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

LoginView.propTypes = {
    user: PropTypes.object,
    errors: PropTypes.object
};

LoginView.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    let errors = state.loginReducer.errors;
    if (errors)
        errors = {...errors, summary: state.loginReducer.message};
    return {
        user: state.loginReducer.user,
        errors: errors,
        success: state.loginReducer.success
    }
};

export default connect(mapStateToProps)(LoginView);
