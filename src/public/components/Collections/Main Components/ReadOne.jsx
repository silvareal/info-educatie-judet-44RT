import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton} from 'material-ui';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import PictureRow from '../Partials Components/PictureRow.jsx';
import CommentList from '../Partials Components/CommentList.jsx';

class ReadOne extends Component {

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSave();
        }
    };

    getHTML = () => {
        if (this.props.collectionDescriptionRaw) {
            return {__html: this.props.collectionDescriptionRaw};
        }
    };

    render() {
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
                    <div dangerouslySetInnerHTML={this.getHTML()}/>
                    {this.props.rows}
                    <CommentList
                        comments={this.props.comments}
                        comment={this.props.comment}
                        handleKeyPress={this.handleKeyPress}
                        onCommentChange={this.props.onCommentChange}
                        onSave={this.props.onSave}
                        commentAdded={this.props.commentAdded}
                    />
                </Card>
            </div>
        );
    }
}

export default ReadOne