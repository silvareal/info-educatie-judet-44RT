import React, {Component} from 'react';
import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.news
            .map(function (news, i) {
                return (
                    <ViewRow
                        key={i}
                        news={news}
                        admin={this.props.admin}
                        userId={this.props.userId}
                        onClickNews={this.props.onClickNews}
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