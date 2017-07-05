import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadOne from '../../components/BrowseNews/Main Components/ReadOne.jsx';
import Auth from '../../modules/Auth.js';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import Comment from '../../components/BrowseNews/Partials Components/Comment.jsx';
import * as readOneActions from '../../actions/BrowseNews/browseNewsReadOneActions.js';

let socket = io.connect();

let createHandler = function (dispatch) {
    let getNews = function (newsId) {
        dispatch(readOneActions.getNews(newsId))
    };

    let getComments = function (newsId) {
        dispatch(readOneActions.getComments(newsId))
    };

    let loadMoreComments = function (loadAfter, newsId) {
        dispatch(readOneActions.onLoadMoreComments(loadAfter, newsId));
    };

    let onCommentInputChange = function (comment) {
        dispatch(readOneActions.onChangeCommentInput(comment))
    };

    let getCommentsCount = function (newsId) {
        dispatch(readOneActions.getCommentsCount(newsId))
    };

    let onSaveComment = function (newsId, comment) {
        dispatch(readOneActions.onSaveComment(newsId, comment))
    };

    let onDeleteComment = function (commentId) {
        dispatch(readOneActions.onDeleteComment(commentId));
    };

    return {
        getNews,
        getComments,
        loadMoreComments,
        onCommentInputChange,
        getCommentsCount,
        onSaveComment,
        onDeleteComment
    }
};

class ReadOneView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onLoadMoreComments = () => {
        this.handlers.loadMoreComments(this.props.comments.loadAfter, this.props.newsId ? this.props.newsId : this.props.params._newsId)
    };

    componentDidMount() {

        this.handlers.getComments(this.props.newsId ? this.props.newsId : this.props.params._newsId);
        this.handlers.getNews(this.props.newsId ? this.props.newsId : this.props.params._newsId);
        this.handlers.getCommentsCount(this.props.newsId ? this.props.newsId : this.props.params._newsId);

        socket.on('send:commentNews', () => {
            this.handlers.getComments(this.props.newsId ? this.props.newsId : this.props.params._newsId);
            this.handlers.getCommentsCount(this.props.newsId ? this.props.newsId : this.props.params._newsId);
        });
    };

    onCommentChange = (e) => {
        this.handlers.onCommentInputChange(e.target.value);
    };

    onSave = () => {
        if (Auth.isUserAuthenticated()) {

            this.handlers.onSaveComment(this.props.newsId ? this.props.newsId : this.props.params._newsId, this.props.comments.comment);
            this.handlers.getComments(this.props.newsId ? this.props.newsId : this.props.params._newsId);
            this.handlers.getCommentsCount(this.props.newsId ? this.props.newsId : this.props.params._newsId);

            socket.emit('send:commentNews', {
                comment: this.props.comments.comment,
                newsId: this.props.newsId ? this.props.newsId : this.props.params._newsId,
                userName: this.props.credentials.userName,
                firstName: this.props.credentials.firstName,
                userId: this.props.credentials.userId,
                profilePictureLink: this.props.credentials.profilePictureLink
            });
        }
    };

    render() {
        return (
            <ReadOne
                finished={this.props.comments.finished}
                onLoadMoreComments={this.onLoadMoreComments}
                guest={this.props.credentials.guest}
                fetchedNews={this.props.news.fetchedNews}
                news={this.props.news.news}
                newsDescriptionRaw={this.props.news.newsDescriptionRaw}
                comments={this.props.comments}
                onCommentChange={this.onCommentChange}
                onSave={this.onSave}
                userName={this.props.credentials.userName}
                profilePictureLink={this.props.credentials.profilePictureLink}
            />
        );
    }
}

ReadOneView.propTypes = {
    credentials: React.PropTypes.shape({
        userName: PropTypes.string,
        firstName: PropTypes.string,
        userId: PropTypes.string,
        profilePictureLink: PropTypes.string,
        guest: PropTypes.bool,
        admin: PropTypes.bool
    }),
    news: React.PropTypes.shape({
        news: PropTypes.object,
        newsDescriptionRaw: PropTypes.string
    }),
    comments: React.PropTypes.shape({
        fetchedComments: PropTypes.bool,
        fetchingComments: PropTypes.bool,
        loadAfter: PropTypes.number,
        finished: PropTypes.bool,
        requesting: PropTypes.bool,
        comment: PropTypes.string,
        commentAdded: PropTypes.bool,
        commentsCount: PropTypes.number
    })
};

// Map credentials
const credentials = (state) => {
    if (state.userReducer.fetching === true) {
        return {
            finished: false,
            admin: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            firstName: response.firstName,
            finished: true,
            guest: response.guest,
            admin: response.admin
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            finished: true,
            admin: false
        };
};

const news = (state) => {
    if (state.browseNewsReadOneReducer.fetchingNews === true) {
        return {
            fetchingNews: true,
            fetchedNews: false
        }
    }
    else if (state.browseNewsReadOneReducer.fetchedNews === true && state.browseNewsReadOneReducer.fetchingNews === false) {
        return {
            fetchedNews: true,
            fetchingNews: false,
            news: state.browseNewsReadOneReducer.news,
            newsDescriptionRaw: stateToHTML(convertFromRaw(JSON.parse(state.browseNewsReadOneReducer.newsDescriptionRaw))),
            userName: state.browseNewsReadOneReducer.news.userName,
            profilePictureLink: state.browseNewsReadOneReducer.news.profilePictureLink
        }
    }
    else if (state.browseNewsReadOneReducer.fetchingNews === false && state.browseNewsReadOneReducer.fetchedNews === false) {
        return {
            fetchedNews: false,
            fetchingNews: false
        }
    }
};

const comments = (state, ownProps) => {
    if (state.browseNewsReadOneReducer.fetching === true)
        return {
            fetchedComments: false,
            fetchingComments: true,
            comment: state.browseNewsReadOneReducer.comment,
            commentsCount: state.browseNewsReadOneReducer.commentsCount,
            finished: false
        };
    else if (state.browseNewsReadOneReducer.fetched === true && state.browseNewsReadOneReducer.fetching === false) {
        if (state.browseNewsReadOneReducer.comments && state.browseNewsReadOneReducer.comments.data.comments.length !== 0) {

            let comments = state.browseNewsReadOneReducer.comments.data.comments;

            let commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                const formattedDate =
                    <div style={{fontSize: 14}}>
                        {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
                    </div>;

                let handler = createHandler(ownProps.dispatch);

                return (
                    <Comment
                        key={key}
                        _id={comments[key]._id}
                        comment={comments[key].comment}
                        date={formattedDate}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                        handler={handler}
                        profilePictureLink={comments[key].profilePictureLink}
                    />
                )
            });

            return {
                fetchedComments: true,
                fetchingComments: false,
                commentsRows: commentsRows,
                loadAfter: state.browseNewsReadOneReducer.loadAfter,
                finished: state.browseNewsReadOneReducer.finished,
                requesting: state.browseNewsReadOneReducer.requesting,
                comment: state.browseNewsReadOneReducer.comment,
                commentsCount: state.browseNewsReadOneReducer.commentsCount
            };
        }
        else return {
            fetchedComments: false,
            fetchingComments: false,
            commentsRows: null,
            comment: state.browseNewsReadOneReducer.comment,
            commentsCount: state.browseNewsReadOneReducer.commentsCount,
            finished: false
        }
    }
    else return {
            finished: false
        }
};

const mapStateToProps = (state, ownProps) => ({
    credentials: credentials(state),
    news: news(state),
    comments: comments(state, ownProps)
});

export default connect(mapStateToProps)(ReadOneView)