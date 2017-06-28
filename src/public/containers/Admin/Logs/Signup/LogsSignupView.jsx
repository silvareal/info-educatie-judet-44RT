import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as logsActions from '../../../../actions/Admin/Logs/Signup/logsSignUpActions.js';
import LogsSignup from '../../../../components/Admin/Logs/Signup/LogsSignup.jsx';
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let getLogs = function () {
        dispatch(logsActions.onGetLogs())
    };

    return {
        getLogs
    }
};
class LogsSignupView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.getLogs();
    }

    render() {
        document.title = "Logs - Signup";
        if (this.props.logs && this.props.credentials.admin === true && this.props.logs.fetchedLogs === true)
            return <LogsSignup logs={this.props.logs.logs}
                               userId={this.props.params._id}/>;
        else if (this.props.credentials.fetching === true || (this.props.logs && this.props.logs.fetchingLogs)) return <LoadingIndicator/>;
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (!this.props.logs) return <LoadingIndicator/>;
    }
}

LogsSignupView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetching: PropTypes.bool,
        fetched: PropTypes.bool
    }),
    logs: React.PropTypes.shape({
        fetchingLogs: PropTypes.bool,
        fetchedLogs: PropTypes.bool,
        logs: PropTypes.array
    })
};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

const logs = (state) => {
    if (state.logsSignUpReducer.fetching === true)
        return {
            fetchingLogs: true,
            fetchedLogs: false
        };
    else if (state.logsSignUpReducer.fetched === true && state.logsSignUpReducer.fetching === false)
        return {
            logs: state.logsSignUpReducer.logs,
            fetchedLogs: true,
            fetchingLogs: false
        };
    else if (state.logsSignUpReducer.fetched === false && state.logsSignUpReducer.fetching === false)
        return {
            fetchedLogs: false,
            fetchingLogs: false
        };
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    logs: logs(state)
});

export default connect(mapStateToProps)(LogsSignupView)