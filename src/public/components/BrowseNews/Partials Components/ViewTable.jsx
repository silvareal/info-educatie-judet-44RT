import React, {Component} from 'react';
import ViewRow from './ViewRow.jsx';
import {RaisedButton} from 'material-ui';

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
                <RaisedButton label={this.props.finished === true ? "No more articles :(" : "Load more articles ..."}
                              disabled={this.props.finished}
                              onTouchTap={this.props.onLoadMoreNews}
                              primary={true}
                              fullWidth={true}
                              labelStyle={{color: "#ffffff"}}
                              buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                />
            </div>
        );
    }
}

export default ViewTable;