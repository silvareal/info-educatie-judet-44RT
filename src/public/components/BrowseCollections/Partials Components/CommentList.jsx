import React, {Component} from 'react';
import {RaisedButton, CircularProgress} from 'material-ui';

class CommentList extends Component {
    render() {

        let buttonLabel = "Load more collections...";

        if (this.props.requesting)
            buttonLabel = <CircularProgress size={30} color="red"/>;
        else if (this.props.requesting === false && this.props.finished === false)
            buttonLabel = "Load more comments...";
        else if (this.props.requesting === false && this.props.finished === true)
            buttonLabel = "No more comments :(";

        return (
            <div>
                {this.props.commentsRows}
                <RaisedButton label={buttonLabel}
                              disabled={this.props.finished}
                              fullWidth={true}
                              labelStyle={{color: "#ffffff"}}
                              buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                              onTouchTap={this.props.onLoadMoreComments}/>
            </div>
        )
    }
}

export default CommentList;