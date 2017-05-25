import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardText, CardMedia, CardHeader} from 'material-ui';

import CommentForm from '../Partials Components/CommentForm.jsx';
import CommentList from '../Partials Components/CommentList.jsx';

class ReadOne extends Component {

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

        const date = new Date(this.props.news.time);

        const formattedDate =
            <div>
                {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div className="parallax-collections-readOne">
                <div className="top-bar-spacing"/>
                <Card className="container-news-readOne"
                      style={{backgroundColor: 'none', boxShadow: "none", padding: 0}}>
                    <Card style={{boxShadow: "none"}}>
                        <div>
                            <div className="collections-content-readOne-desktop">
                                <ul>
                                    <Card style={{background: "none", boxShadow: "none"}}>
                                        <CardHeader
                                            title={<div className="collection-header">{this.props.news.newsTitle}</div>}
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
                                                <div dangerouslySetInnerHTML={this.getHTML()}/>
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
                                            dangerouslySetInnerHTML={this.getHTML()}/>
                                    </CardText>
                                </Card>
                            </div>
                        </div>
                    </Card>
                </Card>
                <Card className="container-collections" style={{boxShadow: "none", backgroundColor: "whitesmoke"}}>
                    {parseInt(this.props.commentsCount) !== 0 && this.props.commentsCount !== undefined ?
                        <CardHeader
                            title={`Comments ` + `(` + this.props.commentsCount + `)`}
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
                            comment={this.props.comment}
                            handleKeyPress={this.handleKeyPress}
                            onCommentChange={this.props.onCommentChange}
                            onSave={this.props.onSave}
                            commentAdded={this.props.commentAdded}
                        />
                        :
                        null
                    }
                    <CommentList
                        userName={this.props.userName}
                        profilePictureLink={this.props.profilePictureLink}
                        commentsRows={this.props.commentsRows}
                        comment={this.props.comment}
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