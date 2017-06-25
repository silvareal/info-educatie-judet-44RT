import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import * as signUpActions from '../../actions/Authentication/signUpActions.js'
import SignUp from '../../components/Authentication/SignUp.jsx';

let createHandler = function (dispatch) {
    let onUserInfoChange = function (fieldName, user, value) {
        dispatch(signUpActions.onUserInfoChange(fieldName, user, value))
    };

    let onSaveUser = function (user) {
        dispatch(signUpActions.onSaveUser(user))
    };

    return {
        onUserInfoChange,
        onSaveUser
    }
};

class SignUpView extends Component {
    constructor(props, context) {
        super(props, context);
        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        this.resetScroll();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true)
            this.context.router.replace('/login')
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onChange = (e) => {
        this.handlers.onUserInfoChange(e.target.name, this.props.user, e.target.value);
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.handlers.onSaveUser(this.props.user);
    };

    render() {
        document.title = "Signup";
        return (
            <SignUp
                errors={this.props.errors}
                user={this.props.user}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
            />
        );
    }
}

SignUpView.propTypes = {
    user: PropTypes.object,
    errors: PropTypes.object
};

SignUpView.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    let errors = state.signUpReducer.errors;
    if (errors)
        errors = {...errors, summary: state.signUpReducer.message};
    return {
        user: state.signUpReducer.user,
        errors: errors,
        success: state.signUpReducer.success
    }
};

export default connect(mapStateToProps)(SignUpView)