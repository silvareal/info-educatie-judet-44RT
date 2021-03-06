import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardText, CardMedia, CardHeader, CardActions, RaisedButton, TextField} from 'material-ui';
import NoCommentsFound from '../Partials Components/NoCommentsFound.jsx';
import CommentForm from '../Partials Components/CommentForm.jsx';
import CommentList from '../Partials Components/CommentList.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import CopyToClipboard from 'react-copy-to-clipboard';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import SocialShare from 'material-ui/svg-icons/social/share'

class ReadOne extends Component {

    constructor() {
        super();

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
        if (this.props.newsDescriptionRaw) {
            return {__html: this.props.newsDescriptionRaw};
        }
    };

    render() {

        const date = new Date(this.props.news && this.props.news.time ? this.props.news.time : "");

        const formattedDate =
            <div>
                {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div>
                <div className="top-bar-spacing"/>
                {this.props.fetchedNews ?
                    <Card className="container-news-readOne"
                          style={{backgroundColor: 'none', boxShadow: "none", padding: 0}}>
                        <Card style={{boxShadow: "none"}}>
                            <div>
                                <div className="collections-content-readOne-desktop">
                                    <ul>
                                        <Card style={{background: "none", boxShadow: "none"}}>
                                            <CardHeader
                                                title={<div
                                                    className="collection-header">{this.props.news.newsTitle}</div>}
                                                subtitle={
                                                    <div >
                                                        By
                                                        <Link
                                                            to={`/profile/${this.props.news.userName}`}> {this.props.news.userName}
                                                        </Link>
                                                        {formattedDate}
                                                    </div>
                                                }
                                                avatar={this.props.news.profilePictureLink}
                                            />
                                            <CardMedia>
                                                <img src={this.props.news.newsCoverLink}/>
                                            </CardMedia>
                                        </Card>
                                    </ul>
                                    <ul style={{display: "flex"}}>
                                        <li style={{margin: "auto"}}>
                                            <Card style={{background: "none", boxShadow: 'none'}}>
                                                <CardText>
                                                    <div dangerouslySetInnerHTML={this.getHTML()}
                                                         style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>
                                                </CardText>
                                            </Card>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collections-content-readOne-mobile">
                                    <Card style={{padding: 14, boxSizing: "border-box", marginBottom: 64}}>
                                        <CardHeader
                                            className="mobile-header"
                                            title={<div
                                                className="collection-header">{this.props.news.newsTitle}</div>}
                                            subtitle={
                                                <div>By
                                                    <Link
                                                        to={`/profile/${this.props.news.userName}`}> {this.props.news.userName}
                                                    </Link>
                                                    {formattedDate}
                                                </div>
                                            }
                                            avatar={this.props.news.profilePictureLink}
                                        />
                                        <CardMedia>
                                            <img src={this.props.news.newsCoverLink}/>
                                        </CardMedia>
                                        <CardText>
                                            <div
                                                className="collection-description"
                                                dangerouslySetInnerHTML={this.getHTML()}
                                                style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>
                                        </CardText>
                                    </Card>
                                </div>
                            </div>
                            <CardActions>
                                <TextField name="Share"
                                           disabled={true}
                                           value={`localhost/news/${this.props.news._id}`}/>
                                <CopyToClipboard text={`localhost/news/${this.props.news._id}`}
                                                 onCopy={() => this.setState({copied: true})}>
                                    <RaisedButton label={this.state.copied === false ? "Copy link" : "Success !"}
                                                  labelPosition="before"
                                                  icon={this.state.copied === false ?  <SocialShare/> : <NavigationCheck/>}
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
                    {this.props.guest === false ?
                        <CommentForm
                            userName={this.props.userName}
                            profilePictureLink={this.props.profilePictureLink}
                            comment={this.props.comments && this.props.comments.comment ? this.props.comments.comment : ""}
                            handleKeyPress={this.handleKeyPress}
                            onCommentChange={this.props.onCommentChange}
                            onSave={this.props.onSave}
                            commentAdded={this.props.comments && this.props.comments.commentAdded ? this.props.comments.commentAdded : ""}
                        />
                        :
                        null
                    }
                    {this.props.comments && this.props.comments.fetchedComments && this.props.comments.fetchingComments === false ?
                        <CommentList
                            userName={this.props.userName}
                            profilePictureLink={this.props.profilePictureLink}
                            commentsRows={this.props.comments.commentsRows}
                            comment={this.props.comments && this.props.comments.comment ? this.props.comments.comment : ""}
                            onCommentChange={this.props.onCommentChange}
                            onSave={this.props.onSave}
                            finished={this.props.finished}
                            onLoadMoreComments={this.props.onLoadMoreComments}
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

export default ReadOne