import React, {Component} from 'react';

import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                return (
                    <ViewRow
                        key={i}
                        collection={collection}
                        onClickCollection={this.props.onClickCollection}
                    />
                )
            }.bind(this));
        return (
            <div className="view-table">
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default ViewTable;