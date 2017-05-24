import React, {Component} from 'react';
import {CircularProgress} from 'material-ui';

import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.news
            .map(function (news, i) {
                return (
                    <ViewRow
                        key={i}
                        news={news}
                    />
                )
            }.bind(this));
        return (
            <div className="view-table">
                {this.props.errorMessage.toString() === 'Fetched news' ?
                    <div>
                        {rows}
                    </div>
                    :
                    null}
                {this.props.errorMessage.toString() === 'Fetching' ? <CircularProgress/> : null}
            </div>
        );
    }
}

export default ViewTable;