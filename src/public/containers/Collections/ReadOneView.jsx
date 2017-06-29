import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadOne from '../../components/Collections/Main Components/ReadOne.jsx';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import PictureRow from "../../components/Collections/Partials Components/PictureRow.jsx";
import Comment from '../../components/Collections/Partials Components/Comment.jsx';
import * as readOneActions from '../../actions/Collections/manageCollectionsReadOneActions.js';

let socket = io.connect();

let createHandler = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(readOneActions.getCollection(collectionId))
    };

    let getComments = function (collectionId) {
        dispatch(readOneActions.getComments(collectionId))
    };

    let loadMoreComments = function (loadAfter, collectionId) {
        dispatch(readOneActions.onLoadMoreComments(loadAfter, collectionId));
    };

    let onCommentInputChange = function (comment) {
        dispatch(readOneActions.onChangeCommentInput(comment))
    };

    let getCommentsCount = function (collectionId) {
        dispatch(readOneActions.getCommentsCount(collectionId))
    };

    let onSaveComment = function (collectionId, comment) {
        dispatch(readOneActions.onSaveComment(collectionId, comment))
    };

    let resetReducer = function () {
        dispatch(readOneActions.resetReducer())
    };

    let onDeleteComment = function (commentId) {
        dispatch(readOneActions.onDeleteComment(commentId));
    };

    return {
        getCollection,
        getComments,
        loadMoreComments,
        onCommentInputChange,
        getCommentsCount,
        onSaveComment,
        resetReducer,
        onDeleteComment
    }
};

class ReadOneView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onLoadMoreComments = () => {
        this.handlers.loadMoreComments(this.props.comments.loadAfter, this.props.collectionId)
    };

    componentDidMount() {
        this.handlers.getComments(this.props.collectionId);
        this.handlers.getCollection(this.props.collectionId);
        this.handlers.getCommentsCount(this.props.collectionId);

        socket.on('send:comment', () => {
            this.handlers.getComments(this.props.collectionId);
            this.handlers.getCommentsCount(this.props.collectionId);
        });
    };

    componentWillUnmount() {
        this.handlers.resetReducer();
    }

    onCommentChange = (e) => {
        this.handlers.onCommentInputChange(e.target.value);
    };

    //for the comment section
    onSave = () => {

        this.handlers.onSaveComment(this.props.collectionId, this.props.comments.comment);
        this.handlers.getComments(this.props.collectionId);
        this.handlers.getCommentsCount(this.props.collectionId);

        socket.emit('send:comment', {
            comment: this.props.comments.comment,
            collectionId: this.props.collectionId,
            userName: this.props.credentials.userName,
            firstName: this.props.credentials.firstName,
            userId: this.props.credentials.userId,
            profilePictureLink: this.props.credentials.profilePictureLink
        });
    };

    render() {
        return (
            <ReadOne
                finished={this.props.comments.finished}
                onLoadMoreComments={this.onLoadMoreComments}
                fetchedCollection={this.props.collection.fetchedCollection}
                collection={this.props.collection}
                collectionDescriptionRaw={this.props.collection.collectionDescriptionRaw}
                rows1={this.props.collection.rows1}
                rows2={this.props.collection.rows2}
                rows3={this.props.collection.rows3}
                comments={this.props.comments}
                onCommentChange={this.onCommentChange}
                onSave={this.onSave}
                userName={this.props.credentials.userName}
                profilePictureLink={this.props.credentials.profilePictureLink}
                onDeleteComment={this.handlers.onDeleteComment}
            />
        );
    }
}

ReadOneView.propTypes = {
    credentials: React.PropTypes.shape({
        userName: PropTypes.string,
        firstName: PropTypes.string,
        userId: PropTypes.string,
        profilePictureLink: PropTypes.string
    }),
    collection: React.PropTypes.shape({
        collection: PropTypes.array,
        collectionDescriptionRaw: PropTypes.string,
        rows1: PropTypes.array,
        rows2: PropTypes.array,
        rows3: PropTypes.array
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
            finished: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            firstName: response.firstName,
            finished: true
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            finished: true
        };
};

const collection = (state) => {
    if (state.collectionNamesReducer.collections && state.collectionNamesReducer.collections.data.collections) {
        let longPath = state.collectionNamesReducer.collections.data.collections;
        let collectionKey;
        Object.keys(longPath).map((key) => {
            if (longPath[key]._id === state.manageCollectionsReadOneReducer.collectionId)
                collectionKey = key;
        });

        let pictures = longPath[collectionKey].picturesArray, rows1, rows2, rows3;

        rows1 = Object.keys(pictures).map((key) => {
            if (parseInt(key) % 2 === 0) {
                return (
                    <PictureRow
                        key={key}
                        pictureName={pictures[key].pictureName}
                        pictureLink={pictures[key].pictureLink}
                        pictureDescription={stateToHTML(convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw)))}
                    />
                )
            }
        });

        rows2 = Object.keys(pictures).map((key) => {
            if (parseInt(key) % 2 === 1) {
                return (
                    <PictureRow
                        key={key}
                        pictureName={pictures[key].pictureName}
                        pictureLink={pictures[key].pictureLink}
                        pictureDescription={stateToHTML(convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw)))}
                    />
                )
            }
        });

        rows3 = Object.keys(pictures).map((key) => {
            return (
                <PictureRow
                    key={key}
                    pictureName={pictures[key].pictureName}
                    pictureLink={pictures[key].pictureLink}
                    pictureDescription={stateToHTML(convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw)))}
                />
            )
        });

        return {
            _id: longPath[collectionKey]._id,
            collectionName: longPath[collectionKey].collectionName,
            collectionDescriptionRaw: stateToHTML(convertFromRaw(JSON.parse(longPath[collectionKey].collectionDescriptionRaw))),
            picturesArray: longPath[collectionKey].picturesArray,
            profilePictureLink: longPath[collectionKey].profilePictureLink,
            time: longPath[collectionKey].time,
            userId: longPath[collectionKey].userId,
            userName: longPath[collectionKey].userName,
            rows1: rows1,
            rows2: rows2,
            rows3: rows3,
            fetchedCollection: true
        }
    }
    else return {
        _id: "",
        collectionName: "",
        collectionDescriptionRaw: "",
        picturesArray: "",
        profilePictureLink: "",
        time: "",
        userId: "",
        userName: "",
        rows1: null,
        rows2: null,
        rows3: null
    }
};

const comments = (state, ownProps) => {
    if (state.manageCollectionsReadOneReducer.fetching === true)
        return {
            fetchedComments: false,
            fetchingComments: true,
            comment: state.manageCollectionsReadOneReducer.comment,
            commentsCount: state.manageCollectionsReadOneReducer.commentsCount,
            finished: false
        };
    else if (state.manageCollectionsReadOneReducer.fetched === true && state.manageCollectionsReadOneReducer.fetching === false) {
        if (state.manageCollectionsReadOneReducer.comments.data.comments.length !== 0) {

            let comments = state.manageCollectionsReadOneReducer.comments.data.comments;

            let commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                const formattedDate =
                    <div style={{fontSize: 14}}>
                        {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
                    </div>;

                    let handler = createHandler(ownProps.dispatch);

                return <Comment
                        key={key}
                        _id={comments[key]._id}
                        comment={comments[key].comment}
                        date={formattedDate}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                        handler={handler}
                        profilePictureLink={comments[key].profilePictureLink}
                    />;
            });

            return {
                fetchedComments: true,
                fetchingComments: false,
                commentsRows: commentsRows,
                loadAfter: state.manageCollectionsReadOneReducer.loadAfter,
                finished: state.manageCollectionsReadOneReducer.finished,
                requesting: state.manageCollectionsReadOneReducer.requesting,
                comment: state.manageCollectionsReadOneReducer.comment,
                commentsCount: state.manageCollectionsReadOneReducer.commentsCount
            };
        }
        else return {
            fetchedComments: false,
            fetchingComments: false,
            commentsRows: null,
            comment: state.manageCollectionsReadOneReducer.comment,
            commentsCount: state.manageCollectionsReadOneReducer.commentsCount,
            finished: true
        }
    }
    else return {
            finished: false
        }
};

const mapStateToProps = (state, ownProps) => ({
    credentials: credentials(state),
    collection: collection(state),
    comments: comments(state, ownProps)
});

export default connect(mapStateToProps)(ReadOneView)