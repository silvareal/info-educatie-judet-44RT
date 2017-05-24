import React, {Component} from 'react';
import {CircularProgress} from 'material-ui';
import {NO_RECORDS_ERROR} from '../../../../constants/errors.js';

import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                return (
                    <ViewRow
                        key={i}
                        collection={collection}
                        adminId={this.props.adminId}
                    />
                )
            }.bind(this));
        return (
            <div className="view-table">
                {this.props.errorMessage.toString() === 'Fetched collections' && this.props.collections.length !== 0 ?
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