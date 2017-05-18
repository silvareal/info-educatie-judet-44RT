import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton} from 'material-ui';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import PictureRow from './PictureRow.jsx';
import CommentList from './CommentList.jsx';

class ReadOne extends Component {

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSave();
        }
    };

    getHTML = () => {
        if (this.props.collection.collectionDescriptionRaw) {
            const contentState = convertFromRaw(JSON.parse(this.props.collection.collectionDescriptionRaw));
            return {__html: stateToHTML(contentState)};
        }
    };

    render() {

        let pictures = this.props.collection.picturesArray;

        let contentState;

        let rows;

        if (pictures) {
            rows = Object.keys(pictures).map((key) => {
                if (pictures[key].pictureDescriptionRaw) {
                    contentState = convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw));
                    return (
                        <PictureRow
                            key={key}
                            pictureName={pictures[key].pictureName}
                            pictureLink={pictures[key].pictureLink}
                            pictureDescription={stateToHTML(contentState)}
                        />
                    )
                }
            });
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
                    <div dangerouslySetInnerHTML={this.getHTML()}/>
                    {rows}
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