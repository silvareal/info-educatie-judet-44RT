import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../../../../components/Admin/Logs/Main Component/Logs.jsx'
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

class LogsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        document.title = "Logs - Overview";
        if (this.props.admin === true)
            return <Logs userId={this.props.params._id}/>;
        else if (this.props.fetching === true) return <LoadingIndicator/>;
        else if (this.props.admin === false) return <NotAuthorizedView/>;
    }
}

LogsView.propTypes = {
    admin: PropTypes.bool
};

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps)(LogsView)