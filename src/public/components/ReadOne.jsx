import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton, TextField} from 'material-ui';

import PictureRow from './PictureRow.jsx';

class ReadOne extends Component {

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSave();
        }
    };

    render() {
        let pictures = this.props.collection.picturesArray;

        let rows;

        if (pictures) {
            rows = Object.keys(pictures).map((key) => {
                return (
                    <PictureRow
                        key={key}
                        pictureName={pictures[key].pictureName}
                        pictureLink={pictures[key].pictureLink}
                        pictureDescription={pictures[key].pictureDescription}
                    />
                )
            });
        }

        let comments = this.props.comments;

        let commentsRows;

        if (comments) {
            commentsRows = Object.keys(comments).map((key) => {
                const date = new Date(comments[key].time);
                console.log(comments[key].firstName);
                return (
                    <div key={key} style={{border: "2px solid black", padding: 5}}>
                        <div>
                            Comment: {comments[key].comment}
                        </div>
                        <div>
                            Added on: {date.toString()}
                        </div>
                        <div>
                            By: {comments[key].firstName !== "undefined" ?
                            <div>
                                {comments[key].firstName} @ {comments[key].userName}
                            </div>
                            :
                            <div>
                                {comments[key].userName}
                            </div>
                        }
                        </div>
                    </div>
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
                <Card className="container">
                    <Link
                        to="/manage">
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Back"
                        />
                    </Link>
                    <div>Collection name: {this.props.collection.collectionName}</div>
                    <div>Collection description: {this.props.collection.collectionDescription}</div>
                    {rows}
                    <div>
                        {this.props.commentAdded === false ? "Comments can only have 1000 characters and they cannot be empty" : null}
                        <TextField
                            floatingLabelText="Post comment"
                            value={this.props.comment}
                            onChange={this.props.onCommentChange}
                            errorText={this.props.commentAdded === false ? "Comment not valid" : null}
                            onKeyDown={this.handleKeyPress}
                        />
                        <RaisedButton
                            label="Post comment"
                            primary={true}
                            onTouchTap={this.props.onSave}
                        />
                    </div>
                    {commentsRows}
                </Card>
            </div>
        );
    }
}

export default ReadOne