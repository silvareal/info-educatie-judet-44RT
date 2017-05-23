import React, {Component} from 'react';
import {CircularProgress} from 'material-ui';

import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                return (
                    <ViewRow
                        key={i}
                        collection={collection}
                    />
                )
            }.bind(this));
        return (
            <div className="view-table">
                {this.props.errorMessage.toString() === 'Fetched collections' ?
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