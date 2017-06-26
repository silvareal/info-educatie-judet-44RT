import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as contactActions from '../../actions/Contact/contactActions.js';
import Contact from '../../components/Contact/Contact.jsx';

let createHandler = function (dispatch) {
    let onFeedbackChange = function (feedback) {
        dispatch(contactActions.onFeedbackChange(feedback))
    };

    let onSaveFeedback = function (feedback) {
        dispatch(contactActions.onSaveFeedback(feedback))
    };

    return {
        onFeedbackChange,
        onSaveFeedback
    }
};

class ContactView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();
    }

    onFeedbackChange = (e) => {
        this.handlers.onFeedbackChange(e.target.value);
    };

    onSave = () => {
        this.handlers.onSaveFeedback(this.props.feedback);
    };

    render() {
        return <Contact
            feedback={this.props.feedback}
            success={this.props.success}
            errors={this.props.errors}
            onFeedbackChange={this.onFeedbackChange}
            onSave={this.onSave}

        />
    }
}

ContactView.propTypes = {
    feedback: PropTypes.string,
    success: PropTypes.bool,
    errors: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        feedback: state.contactReducer.feedback,
        success: state.contactReducer.success,
        errors: state.contactReducer.errors
    }
};

export default connect(mapStateToProps)(ContactView)