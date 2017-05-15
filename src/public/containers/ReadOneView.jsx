import React, {Component} from 'react';

import ReadOne from '../components/ReadOne.jsx';
import Auth from '../modules/Auth.js';

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
            commentAdded : null
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
                    firstName: xhr.response.firstName
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
                    collection: xhr.response.collection
                })
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
    };

    render() {
        if (this.state.collection.collectionName)
        document.title = this.state.collection.collectionName;
        else document.title = "404 not found";
        return (
            <ReadOne
                comments={this.state.comments}
                commentAdded={this.state.commentAdded}
                collection={this.state.collection}
                comment={this.state.comment}
                onCommentChange={this.onCommentChange}
                onSave={this.onSave}
            />
        );
    }
}

export default ReadOneView