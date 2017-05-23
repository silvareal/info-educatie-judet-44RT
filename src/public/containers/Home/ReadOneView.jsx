import React, {Component} from 'react';

import ReadOne from '../../components/Home/Main Components/ReadOne.jsx';
import Auth from '../../modules/Auth.js';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import {CircularProgress} from 'material-ui';
import PictureRow from "../../components/Home/Partials Components/PictureRow.jsx";

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
            commentAdded : null,
            fetched: false,
            pictureDescriptionRaw: '',
            collectionDescriptionRaw: '',
            rows: ''
        };
    }

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
                    userId: xhr.response.userId
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
            if (xhr.status === 200){

                //Retrieve the data for a single collection
                this.setState({
                    errorMessage: '',
                    collection: xhr.response.collection,
                    collectionDescriptionRaw: stateToHTML(convertFromRaw(JSON.parse(xhr.response.collection.collectionDescriptionRaw))),
                    fetched: true
                });

                let pictures = this.state.collection.picturesArray;

                this.setState({
                    rows: Object.keys(pictures).map((key) => {
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
            }
            else if(xhr.status === 401) {
                //user is not logged in -- only used if we will allow un-logged users to see this page
            }
        });
        xhr.send(formData);
    };

    componentDidMount() {

        //get userName and firstName of the user
        this.getUser();
        //get collection details
        this.getCollection();
        //retrieve all comments for this specific collection
        this.getComments();

        socket.on('send:comment', this.getComments);
    };

    onCommentChange = (e) => {
        this.setState({comment: e.target.value});
    };

    //for the comment section
    onSave = () => {

        const collectionId = encodeURIComponent(this.props.params._id);
        const userName = encodeURIComponent(this.state.userName);
        const firstName = encodeURIComponent(this.state.firstName);
        const comment = encodeURIComponent(this.state.comment);

        const formData = `collectionId=${collectionId}&userName=${userName}&firstName=${firstName}&comment=${comment}`;

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
            userId: this.state.userId
        });
    };

    render() {

        if (this.state.collection.collectionName)
            document.title = this.state.collection.collectionName;
        else document.title = "404 not found";
        if (this.state.fetched === true) {
            return (
                <ReadOne
                    rows={this.state.rows}
                    collectionDescriptionRaw={this.state.collectionDescriptionRaw}
                    comments={this.state.comments}
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