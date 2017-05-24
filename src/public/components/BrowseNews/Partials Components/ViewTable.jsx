import React, {Component} from 'react';
import {CircularProgress} from 'material-ui';
import {NO_RECORDS_ERROR} from '../../../constants/errors.js';

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
                {this.props.errorMessage.toString() === 'Fetched news' && this.props.news.length !== 0 ?
                    <div>
                        {rows}
                    </div>
                    :
                    <div>
                        {NO_RECORDS_ERROR}
                    </div>}
                {this.props.errorMessage.toString() === 'Fetching' ? <CircularProgress/> : null}
            </div>
        );
    }
}

export default ViewTable;