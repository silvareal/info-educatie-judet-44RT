import React, {Component} from 'react';

import LogsCollections from '../../../components/Admin/Logs/LogsCollections.jsx'

class LogsCollectionsView extends Component {
    render() {
        return (
            <LogsCollections userId={this.props.params._id} />
        )
    }
}

export default LogsCollectionsView;