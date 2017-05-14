import React, {Component} from 'react';

import LogsNews from '../../../components/Admin/Logs/LogsNews.jsx'

class LogsNewsView extends Component {
    render() {
        return (
            <LogsNews userId={this.props.params._id} />
        )
    }
}

export default LogsNewsView;