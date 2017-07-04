import React, {Component} from 'react';
import {RaisedButton} from 'material-ui';

class CommentList extends Component {
    render() {
        return (
            <div>
                {this.props.commentsRows}
                <RaisedButton primary={true}
                              label={this.props.finished ? "No more comments" : "Load more comments..."}
                              disabled={this.props.finished}
                              fullWidth={true}
                              onTouchTap={this.props.onLoadMoreComments}/>
            </div>
        )
    }
}

export default CommentList;