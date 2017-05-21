import React, {Component} from 'react';

import {
    TextField,
    RaisedButton
} from 'material-ui';

class CommentForm extends Component {

    render() {
        return(
            <div>
                {this.props.commentAdded === false ? "Comments can only have 1000 characters and they cannot be empty" : null}
                <TextField
                    floatingLabelText="Post comment"
                    value={this.props.comment}
                    onChange={this.props.onCommentChange}
                    errorText={this.props.commentAdded === false ? "Comment not valid" : null}
                    onKeyDown={this.props.handleKeyPress}
                />
                <RaisedButton
                    label="Post comment"
                    primary={true}
                    onTouchTap={this.props.onSave}
                />
            </div>
        )
    }

}

export default CommentForm;