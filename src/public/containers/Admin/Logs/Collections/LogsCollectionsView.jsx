import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import LogsCollections from '../../../../components/Admin/Logs/Collections/LogsCollections.jsx';
import NotAuthorizedView from '../../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../../components/Loading Indicator/LoadingIndicator.jsx";

class LogsCollectionsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        document.title = "Logs - Collections Overview";
        if (this.props.admin === true)
            return <LogsCollections userId={this.props.params._id}/>;
        else if (this.props.fetching === true) return <LoadingIndicator/>;
        else if (this.props.admin === false) return <NotAuthorizedView/>;
    }
}

LogsCollectionsView.propTypes = {
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

export default connect(mapStateToProps)(LogsCollectionsView)