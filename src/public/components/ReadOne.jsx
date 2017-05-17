import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, RaisedButton} from 'material-ui';

import PictureRow from './PictureRow.jsx';
import CommentList from './CommentList.jsx';

class ReadOne extends Component {

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.onSave();
        }
    };

    getHTML = () => {
            return {__html: this.props.collection.collectionDescriptionRender};
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
                        pictureDescriptionRender={pictures[key].pictureDescriptionRender}
                    />
                )
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
                    <div dangerouslySetInnerHTML={this.getHTML()} />
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