import React, {Component} from 'react';
import {Card, CircularProgress} from 'material-ui';

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
            <div>
                {(this.props.errorMessage == 'You have not added anything yet' || this.props.errorMessage == 'Please contact an administrator') ?
                 <div>{this.props.errorMessage}</div> : null
                }
                {this.props.errorMessage == 'Fetched collections' ? <div>
                    <Card className="container">
                        {rows}
                    </Card>
                </div> : null}
                {this.props.errorMessage == 'Fetching' ? <CircularProgress/> : null}
            </div>
        );
    }
}

export default ViewTable;