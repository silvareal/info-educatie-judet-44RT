import React, {Component} from 'react';

import ReadOne from '../../components/Collections/Main Components/ReadOne.jsx';
import Auth from '../../modules/Auth.js';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import {CircularProgress} from 'material-ui';
import PictureRow from "../../components/Collections/Partials Components/PictureRow.jsx";
import Comment from '../../components/Collections/Partials Components/Comment.jsx';

let socket = io.connect();

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: '',
            errorMessage: '',
            //for the comment section
            userId: '',
            userName: '',
            firstName: '',
            comment: '',
            comments: [],
            commentAdded: null,
            fetched: false,
            pictureDescriptionRaw: '',
            collectionDescriptionRaw: '',
            rows1: '',
            rows2: '',
            rows3: '',
            profilePictureLink: '',
            pictures: [],
            commentsRows: '',
            loadAfter: 0,
            finished: false,
            commentsCount: 0,
            requesting: false
        };
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    getUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/comment/getUserCredentials");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    userName: xhr.response.userName,
                    firstName: xhr.response.firstName,
                    userId: xhr.response.userId,
                    profilePictureLink: xhr.response.profilePictureLink
                });
            }
        });

        xhr.send();
    };

    getCollection = () => {

        //The next few lines will define the HTTP body message
        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/readOne');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //Retrieve the data for a single collection
                this.setState({
                    errorMessage: '',
                    collection: xhr.response.collection,
                    collectionDescriptionRaw: stateToHTML(convertFromRaw(JSON.parse(xhr.response.collection.collectionDescriptionRaw))),
                    fetched: true
                });

                let pictures = this.state.collection.picturesArray;

                Object.keys(pictures).map((key) => {
                    this.state.pictures.push(pictures[parseInt(key)].pictureLink);
                });

                this.setState({
                    rows1: Object.keys(pictures).map((key) => {
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
                    }),
                    rows2: Object.keys(pictures).map((key) => {
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
                    }),
                    rows3: Object.keys(pictures).map((key) => {
                        return (
                            <PictureRow
                                key={key}
                                pictureName={pictures[key].pictureName}
                                pictureLink={pictures[key].pictureLink}
                                pictureDescription={stateToHTML(convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw)))}
                            />
                        )
                    })
                });
            }
            else {
                this.setState({
                    errorMessage: xhr.response.message
                });
            }
        });

        //Send data for db interrogation
        xhr.send(formData);
    };

    onScroll = (e) => {
        if (this.state.finished === false && document.title === this.state.collection.collectionName)
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 300) {
                this.loadMore();
            }
    };

    loadMore = () => {
        if (this.state.finished === false && this.state.requesting === false) {
            this.loadAndAppendComments(this.state.loadAfter + 10);
            this.setState({loadAfter: this.state.loadAfter + 10})
        }
    };

    loadAndAppendComments = (loadAfter) => {

        this.setState({requesting: true});

        if (this.state.finished === false) {
            const loadAfterParam = encodeURIComponent(loadAfter);
            const collectionId = encodeURIComponent(this.state.collection._id);

            const formData = `loadAfter=${loadAfterParam}&collectionId=${collectionId}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/comment/loadMoreCommentsCollections');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    if (xhr.response.message === "NoComments") {
                        this.setState({finished: true, requesting: false});
                    }
                    else {
                        //Do this to not mutate state
                        let newComments = this.state.comments;

                        Object.keys(xhr.response.comments).map((key) => {
                            newComments.push(xhr.response.comments[key]);
                        });

                        this.setState({comments: newComments, requesting: false});
                        this.mapComments();
                    }
                }
            });
            xhr.send(formData);
        }
    };

    getComments = () => {

        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/comment/retrieveCollectionsComments");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //retrieved comments
                this.setState({
                    comments: xhr.response.comments
                });
                this.mapComments();
            }
        });
        xhr.send(formData);
    };

    getCommentsOverallCount = () => {
        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/comment/commentsCount");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //retrieved comments
                this.setState({
                    commentsCount: xhr.response.commentsCount
                });
            }
        });
        xhr.send(formData);
    };

    mapComments = () => {
        let comments = this.state.comments;

        let commentsRows;

        if (comments) {
            commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                const formattedDate =
                    <div style={{fontSize: 14}}>
                        {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
                    </div>;

                return (
                    <Comment
                        key={key}
                        comment={comments[key].comment}
                        date={formattedDate}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                        profilePictureLink={comments[key].profilePictureLink}
                    />
                )
            })
        }
        this.setState({commentsRows});
    };

    componentDidMount() {

        //get userName and firstName of the user
        this.getUser();
        //get collection details
        this.getCollection();
        //retrieve first 10 comments
        this.getComments();
        //get the number of comments for this collection
        this.getCommentsOverallCount();

        this.resetScroll();

        //the load more event listener
        window.addEventListener('scroll', this.onScroll);

        socket.on('send:comment', this.getComments);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onCommentChange = (e) => {
        this.setState({comment: e.target.value});
    };

    //for the comment section
    onSave = () => {

        const collectionId = encodeURIComponent(this.props.params._id);
        const userName = encodeURIComponent(this.state.userName);
        const firstName = encodeURIComponent(this.state.firstName);
        const comment = encodeURIComponent(this.state.comment);
        const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

        const formData = `profilePictureLink=${profilePictureLink}&collectionId=${collectionId}&userName=${userName}&firstName=${firstName}&comment=${comment}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/comment/postCommentCollections");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                this.setState({
                    commentAdded: xhr.response.commentAdded,
                    comment: ''
                });
            }
            else {
                this.setState({
                    commentAdded: false
                })
            }
        });

        xhr.send(formData);

        this.getComments();

        socket.emit('send:comment', {
            comment: this.state.comment,
            collectionId: this.props.params._id,
            userName: this.state.userName,
            firstName: this.state.firstName,
            userId: this.state.userId,
            profilePictureLink: this.state.profilePictureLink
        });
    };

    render() {

        if (this.state.collection.collectionName)
            document.title = this.state.collection.collectionName;
        else document.title = "404 not found";
        if (this.state.fetched === true) {
            return (
                <ReadOne
                    commentsCount={this.state.commentsCount}
                    commentsRows={this.state.commentsRows}
                    comments={this.state.comments}
                    pictures={this.state.pictures}
                    profilePictureLink={this.state.profilePictureLink}
                    userName={this.state.userName}
                    rows1={this.state.rows1}
                    rows2={this.state.rows2}
                    rows3={this.state.rows3}
                    collectionDescriptionRaw={this.state.collectionDescriptionRaw}
                    commentAdded={this.state.commentAdded}
                    collection={this.state.collection}
                    comment={this.state.comment}
                    onCommentChange={this.onCommentChange}
                    onSave={this.onSave}
                />
            );
        }
        else return <CircularProgress/>
    }
}

export default ReadOneView