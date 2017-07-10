import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadOne from '../../components/BrowseCollections/Main Components/ReadOne.jsx';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import PictureRow from "../../components/BrowseCollections/Partials Components/PictureRow.jsx";
import Comment from '../../components/BrowseCollections/Partials Components/Comment.jsx';
import * as readOneActions from '../../actions/BrowseCollections/browseCollectionsReadOneActions.js';
import * as readOneActionsUniversal from '../../actions/Collections/manageCollectionsReadOneActions.js';

let socket = io.connect();

let createHandler = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(readOneActions.getCollection(collectionId))
    };

    let getComments = function (collectionId) {
        dispatch(readOneActions.getComments(collectionId));
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
        dispatch(readOneActionsUniversal.resetReducer())
    };

    return {
        getCollection,
        getComments,
        loadMoreComments,
        onCommentInputChange,
        getCommentsCount,
        onSaveComment,
        resetReducer
    }
};

class ReadOneView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onLoadMoreComments = () => {
        this.handlers.loadMoreComments(this.props.comments.loadAfter, this.props.collectionId ? this.props.collectionId : this.props.params._id)
    };

    componentDidMount() {

        this.handlers.getComments(this.props.collectionId ? this.props.collectionId : this.props.params._id);
        this.handlers.getCollection(this.props.collectionId ? this.props.collectionId : this.props.params._id);
        this.handlers.getCommentsCount(this.props.collectionId ? this.props.collectionId : this.props.params._id);

        socket.on('send:comment', () => {
            setTimeout(() => {
                this.handlers.getComments(this.props.collectionId ? this.props.collectionId : this.props.params._id);
                this.handlers.getCommentsCount(this.props.collectionId ? this.props.collectionId : this.props.params._id);
            }, 500)
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

        this.handlers.onSaveComment(this.props.collectionId ? this.props.collectionId : this.props.params._id, this.props.comments.comment);
        setTimeout(() => {
            this.handlers.getComments(this.props.collectionId ? this.props.collectionId : this.props.params._id);
            this.handlers.getCommentsCount(this.props.collectionId ? this.props.collectionId : this.props.params._id);
        }, 500);

        socket.emit('send:comment', {
            comment: this.props.comments.comment,
            collectionId: this.props.collectionId ? this.props.collectionId : this.props.params._id,
            userName: this.props.credentials.userName,
            firstName: this.props.credentials.firstName,
            userId: this.props.credentials.userId,
            profilePictureLink: this.props.credentials.profilePictureLink
        });
    };

    render() {
        return (
            <ReadOne
                collection={this.props.collection.collection}
                finished={this.props.comments.finished}
                onLoadMoreComments={this.onLoadMoreComments}
                guest={this.props.credentials.guest}
                fetchedCollection={this.props.collection.fetchedCollection}
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
                requesting={this.props.comments.requesting}
            />
        );
    }
}

ReadOneView.propTypes = {
    credentials: PropTypes.shape({
        userName: PropTypes.string,
        firstName: PropTypes.string,
        userId: PropTypes.string,
        profilePictureLink: PropTypes.string,
        guest: PropTypes.bool
    }),
    collection: PropTypes.shape({
        collection: PropTypes.object,
        collectionDescriptionRaw: PropTypes.string,
        rows1: PropTypes.array,
        rows2: PropTypes.array,
        rows3: PropTypes.array
    }),
    comments: PropTypes.shape({
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
            finished: true,
            guest: response.guest
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            finished: true
        };
};

const collection = (state) => {
    if (state.browseCollectionsReadOneReducer.collectionId && state.collectionNamesReducer.collections && state.collectionNamesReducer.collections.data.collections) {
        let longPath = state.collectionNamesReducer.collections.data.collections;
        let collectionKey;
        Object.keys(longPath).map((key) => {
            if (longPath[key]._id === state.browseCollectionsReadOneReducer.collectionId)
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
            collection: longPath[collectionKey],
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
        collection: {},
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

const comments = (state) => {
    if (state.browseCollectionsReadOneReducer.fetching === true)
        return {
            fetchedComments: false,
            fetchingComments: true,
            comment: state.browseCollectionsReadOneReducer.comment,
            commentsCount: state.browseCollectionsReadOneReducer.commentsCount
        };
    else if (state.browseCollectionsReadOneReducer.fetched === true && state.browseCollectionsReadOneReducer.fetching === false) {
        if (state.browseCollectionsReadOneReducer.comments.data.comments.length !== 0) {

            let comments = state.browseCollectionsReadOneReducer.comments.data.comments;

            let commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                const formattedDate =
                    <div style={{fontSize: 14}}>
                        {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
                    </div>;

                return (
                    <Comment
                        key={key}
                        _id={comments[key]._id}
                        comment={comments[key].comment}
                        date={formattedDate}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                        profilePictureLink={comments[key].profilePictureLink}
                        admin={state.userReducer.data.admin}
                        moderator={state.userReducer.data.moderator}
                    />
                )
            });

            return {
                fetchedComments: true,
                fetchingComments: false,
                commentsRows: commentsRows,
                loadAfter: state.browseCollectionsReadOneReducer.loadAfter,
                finished: state.browseCollectionsReadOneReducer.finished,
                requesting: state.browseCollectionsReadOneReducer.requesting,
                comment: state.browseCollectionsReadOneReducer.comment,
                commentsCount: state.browseCollectionsReadOneReducer.commentsCount
            };
        }
        else return {
            fetchedComments: false,
            fetchingComments: false,
            commentsRows: null,
            comment: state.browseCollectionsReadOneReducer.comment,
            commentsCount: state.browseCollectionsReadOneReducer.commentsCount
        }
    }
    else return {
            finished: false
        }
};

const mapStateToProps = (state) => ({
    collection: collection(state),
    credentials: credentials(state),
    comments: comments(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadOneView)