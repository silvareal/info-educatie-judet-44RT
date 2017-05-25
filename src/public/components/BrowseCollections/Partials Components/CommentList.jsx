import React, {Component} from 'react';

class CommentList extends Component {
    render() {
        return (
            <div>
                {this.props.commentsRows}
            </div>
        )
    }
}

export default CommentList;