import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, CardMedia, CardHeader} from 'material-ui';
import QRCode from 'qrcode.react';

import CommentForm from '../Partials Components/CommentForm.jsx';
import CommentList from '../Partials Components/CommentList.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';

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

        const date = new Date(this.props.collection.time);

        const formattedDate =
            <div>
                {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div className="parallax-collections-readOne">
                <div className="top-bar-spacing"/>
                {this.props.fetchedCollection ?
                    <Card className="container-collections-readOne"
                          style={{backgroundColor: 'none', boxShadow: "none", padding: 0}}>
                        <Card>
                            <div>
                                <div className="collections-content-readOne-desktop">
                                    <ul>
                                        <Card style={{background: "none", boxShadow: "none"}}>
                                            <CardHeader title={<div
                                                className="collection-header">{this.props.collection.collectionName}</div>}
                                                        subtitle={
                                                            <div>By
                                                                <Link
                                                                    to={`/profile/${this.props.userName}`}> {this.props.userName}
                                                                </Link>
                                                                {formattedDate}
                                                            </div>
                                                        }
                                                        avatar={this.props.profilePictureLink}
                                            />
                                            <div className="pictures">
                                                <div className="list-spacing-readOne">{this.props.rows1}</div>
                                                <div className="list-spacing-readOne">{this.props.rows2}</div>
                                            </div>
                                            <CardText>
                                                <div
                                                    className="collection-description"
                                                    dangerouslySetInnerHTML={this.getHTML()}/>
                                            </CardText>
                                        </Card>
                                    </ul>
                                    <ul style={{display: "flex"}}>
                                        <li style={{margin: "auto"}}>
                                            <Card style={{background: "none", boxShadow: 'none'}}>
                                                <CardText
                                                    style={{maxWidth: 512, padding: 16, fontSize: 16, textAlign: "center"}}>
                                                    Scan this QR code to listen to a song that the creator of this
                                                    collection has chosen for you to listen to while viewing his collection
                                                </CardText>
                                                <CardMedia style={{padding: 0}}>
                                                    <QRCode
                                                        value={this.props.collection.qrLink ? this.props.collection.qrLink : "123"}
                                                        bgColor="whitesmoke" level="H" size={512}/>
                                                </CardMedia>
                                            </Card>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collections-content-readOne-mobile">
                                    <Card style={{padding: 14, boxSizing: "border-box", marginBottom: 64}}>
                                        <CardHeader
                                            className="mobile-header"
                                            title={<div
                                                className="collection-header">{this.props.collection.collectionName}</div>}
                                            subtitle={
                                                <div>By
                                                    <Link
                                                        to={`/profile/${this.props.userName}`}> {this.props.userName}
                                                    </Link>
                                                    {formattedDate}
                                                </div>
                                            }
                                            avatar={this.props.profilePictureLink}
                                        />
                                        {this.props.rows3}
                                        <CardText>
                                            <div
                                                className="collection-description"
                                                dangerouslySetInnerHTML={this.getHTML()}/>
                                        </CardText>
                                        <CardMedia style={{display: "flex", justifyContent: "center"}}>
                                            <QRCode
                                                value={this.props.collection.qrLink ? this.props.collection.qrLink : "123"}
                                                level="H" size={128}/>
                                        </CardMedia>
                                    </Card>
                                </div>
                            </div>
                        </Card>
                    </Card>
                    :
                    <LoadingIndicator/>
                }

                <Card className="container-collections" style={{boxShadow: "none", backgroundColor: "whitesmoke"}}>
                    {this.props.commentsCount !== 0 ?
                        <CardHeader
                            title={`Comments ` + `(` + this.props.commentsCount + `)`}
                        />
                        :
                        <CardHeader
                            title={`Comments ` + `(0)`}
                        />
                    }

                    <CommentForm
                        userName={this.props.userName}
                        profilePictureLink={this.props.profilePictureLink}
                        comment={this.props.comment}
                        handleKeyPress={this.handleKeyPress}
                        onCommentChange={this.props.onCommentChange}
                        onSave={this.props.onSave}
                        commentAdded={this.props.commentAdded}
                    />
                    {this.props.fetchedComments ?
                        <CommentList
                            userName={this.props.userName}
                            profilePictureLink={this.props.profilePictureLink}
                            commentsRows={this.props.commentsRows}
                            comment={this.props.comment}
                            onCommentChange={this.props.onCommentChange}
                            onSave={this.props.onSave}
                            commentAdded={this.props.commentAdded}
                        />
                        :
                        <LoadingIndicator/>
                    }

                </Card>
            </div>
        );
    }
}

export default ReadOne