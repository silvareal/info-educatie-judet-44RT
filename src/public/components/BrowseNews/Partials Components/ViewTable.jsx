import React, {Component} from 'react';
import ViewRow from './ViewRow.jsx';
import {RaisedButton, CircularProgress} from 'material-ui';

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

        let buttonLabel = "Load more collections...";

        if (this.props.requesting)
            buttonLabel = <CircularProgress size={30} color="red"/>;
        else if (this.props.requesting === false && this.props.finished === false)
            buttonLabel = "Load more collections...";
        else if (this.props.requesting === false && this.props.finished === true)
            buttonLabel = "No more collections :(";

        return (
            <div className="view-table">
                <div>
                    {rows}
                </div>
                <RaisedButton label={buttonLabel}
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