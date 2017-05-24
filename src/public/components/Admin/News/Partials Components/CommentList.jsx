import React, {Component} from 'react';

import Comment from './Comment.jsx';
import CommentForm from './CommentForm.jsx';

class CommentList extends Component {

    render() {

        let comments = this.props.comments;

        let commentsRows;

        if (comments) {
            commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                return (
                    <Comment
                        key={key}
                        comment={comments[key].comment}
                        date={date.toString()}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                    />
                )
            })
        }

        if (this.props.comments.length === 0) {
            commentsRows =
                (<div>
                    No comments found
                </div>)
        }

        return (
            <div>
                <CommentForm
                    comment={this.props.comment}
                    handleKeyPress={this.props.handleKeyPress}
                    onCommentChange={this.props.onCommentChange}
                    onSave={this.props.onSave}
                    commentAdded={this.props.commentAdded}
                />
                {commentsRows}
            </div>
        )
    }
}

export default CommentList;