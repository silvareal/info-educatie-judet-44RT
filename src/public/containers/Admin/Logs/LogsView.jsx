import React, {Component} from 'react';

import Logs from '../../../components/Admin/Logs/Logs.jsx'

class LogsView extends Component {
    render() {
        return (
            <Logs userId={this.props.params._id} />
        )
    }
}

export default LogsView;