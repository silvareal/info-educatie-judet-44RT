import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Card, CardText, CardHeader, CardActions, Checkbox, RaisedButton, TextField} from 'material-ui';
import NoCommentsFound from '../Partials Components/NoCommentsFound.jsx';
import CommentForm from '../Partials Components/CommentForm.jsx';
import CommentList from '../Partials Components/CommentList.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import * as userActions from '../../../actions/userCredentialsActions.js';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import CopyToClipboard from 'react-copy-to-clipboard';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import SocialShare from 'material-ui/svg-icons/social/share'

let createHandler = function (dispatch) {
    let onLike = function (likedId) {
        dispatch(userActions.onLike(likedId))
    };

    let onUnlike = function (likedId) {
        dispatch(userActions.onUnlike(likedId))
    };

    return {
        onLike,
        onUnlike
    }
};

class ReadOne extends Component {

    constructor(props) {
        super(props);

        this.handlers = createHandler(this.props.dispatch);

        this.state = {
            copied: false
        }
    }

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

        let isLiked = false;
        for (let i = 0; i < this.props.liked.length; i++) {
            if (this.props.liked[i].toString() === this.props.collection._id) {
                isLiked = true;
                break;
            }
        }

        const date = new Date(this.props.collection.time);

        const formattedDate =
            <div>
                {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div>
                <div className="top-bar-spacing"/>
                {this.props.fetchedCollection ?
                    <Card className="container-collections-readOne"
                          style={{backgroundColor: 'whitesmoke', boxShadow: "transparent", padding: 0}}>
                        <Card style={{backgroundColor: 'whitesmoke', boxShadow: "transparent"}}>
                            <div>
                                <div className="collections-content-readOne-desktop">
                                    <ul>
                                        <Card style={{background: "whitesmoke", boxShadow: "transparent"}}>
                                            <CardHeader title={<div
                                                className="collection-header">{this.props.collection.collectionName}</div>}
                                                        subtitle={
                                                            <div>By
                                                                <Link
                                                                    to={`/profile/${this.props.collection.userName}`}> {this.props.collection.userName}
                                                                </Link>
                                                                {formattedDate}
                                                            </div>
                                                        }
                                                        avatar={this.props.collection.profilePictureLink}
                                            />
                                            <CardActions>
                                                <div className="heart-red-color">
                                                    <Checkbox
                                                        label={"Likes: " + this.props.collection.likes}
                                                        checked={isLiked}
                                                        checkedIcon={<ActionFavorite/>}
                                                        uncheckedIcon={<ActionFavoriteBorder/>}
                                                        onClick={isLiked === false ? () => this.handlers.onLike(this.props.collection._id) : () => this.handlers.onUnlike(this.props.collection._id)}
                                                    />
                                                </div>
                                            </CardActions>
                                            <div className="pictures">
                                                <div className="list-spacing-readOne">{this.props.rows1}</div>
                                                <div className="list-spacing-readOne">{this.props.rows2}</div>
                                            </div>
                                            <CardText>
                                                <div
                                                    className="collection-description"
                                                    style={{wordBreak: "break-all"}}
                                                    dangerouslySetInnerHTML={this.getHTML()}/>
                                            </CardText>
                                        </Card>
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
                                    </Card>
                                </div>
                            </div>
                            <CardActions>
                                <TextField name="Share"
                                           disabled={true}
                                           value={`localhost/collections/${this.props.collection._id}`}/>
                                <CopyToClipboard text={`localhost/collections/${this.props.collection._id}`}
                                                 onCopy={() => this.setState({copied: true})}>
                                    <RaisedButton label={this.state.copied === false ? "Copy link" : "Success !"}
                                                  labelPosition="before"
                                                  icon={this.state.copied === false ? <SocialShare/> :
                                                      <NavigationCheck/>}
                                                  primary={this.state.copied}
                                                  buttonStyle={this.state.copied === false ? {
                                                      backgroundColor: "#ffffff",
                                                      opacity: 0.8
                                                  } : {backgroundColor: "green", opacity: 0.8}}/>
                                </CopyToClipboard>
                            </CardActions>
                        </Card>
                    </Card>
                    :
                    <LoadingIndicator/>
                }

                <Card className="container-collections" style={{boxShadow: "none", backgroundColor: "whitesmoke"}}>
                    {parseInt(this.props.comments && this.props.comments.commentsCount ? this.props.comments.commentsCount : 0) !== 0 ?
                        <CardHeader
                            title={`Comments ` + `(` + this.props.comments.commentsCount + `)`}
                        />
                        :
                        <CardHeader
                            title={`Comments ` + `(0)`}
                        />
                    }

                    <CommentForm
                        userName={this.props.userName}
                        profilePictureLink={this.props.profilePictureLink}
                        comment={this.props.comments && this.props.comments.comment ? this.props.comments.comment : ""}
                        handleKeyPress={this.handleKeyPress}
                        onCommentChange={this.props.onCommentChange}
                        onSave={this.props.onSave}
                        commentAdded={this.props.comments && this.props.comments.commentAdded ? this.props.comments.commentAdded : ""}
                    />
                    {this.props.comments && this.props.comments.fetchingComments === true ?
                        <LoadingIndicator/>
                        : null
                    }
                    {this.props.comments && this.props.comments.fetchedComments && this.props.comments.fetchingComments === false ?
                        <CommentList
                            finished={this.props.finished}
                            onLoadMoreComments={this.props.onLoadMoreComments}
                            userName={this.props.userName}
                            profilePictureLink={this.props.profilePictureLink}
                            commentsRows={this.props.comments.commentsRows}
                            comment={this.props.comments && this.props.comments.comment ? this.props.comments.comment : ""}
                            onCommentChange={this.props.onCommentChange}
                            onSave={this.props.onSave}
                            commentAdded={this.props.comments && this.props.comments.commentAdded ? this.props.comments.commentAdded : ""}
                            requesting={this.props.requesting}
                        />
                        :
                        null
                    }
                    {this.props.comments && this.props.comments.fetchedComments === false && this.props.comments.fetchingComments === false ?
                        <NoCommentsFound/>
                        :
                        null
                    }

                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            liked: state.userReducer.data.liked
        }
    }
    else return {
            fetched: true,
            fetching: false
        }
};

export default connect(mapStateToProps)(ReadOne)