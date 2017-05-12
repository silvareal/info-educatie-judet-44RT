import React, {Component} from 'react'

import Delete from '../../../components/Admin/Collections/Delete.jsx';
import Auth from '../../../modules/Auth.js';

class DeleteView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            response: null,
            ownerId: '',
            collectionName: '',
            collectionDescription: '',
            pictures:[{}]
        };
    };

    componentDidMount() {

        const collectionId = encodeURIComponent(this.props.params._collectionId);

        const formData = `collectionId=${collectionId}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/deleteShowCollection');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //Collection exists and the user that wants to delete it is the creator
                this.setState({
                    message: xhr.response.message,
                    response: true,
                    collectionName: xhr.response.collection.collectionName,
                    collectionDescription: xhr.response.collection.collectionDescription,
                    pictures: xhr.response.collection.picturesArray,
                    ownerId: xhr.response.collection.userId
                });
            }
            else {
                //Collection or user doesn't exist
                this.setState({
                    message: xhr.response.message,
                    response: false
                })
            }
        });
        xhr.send(formData)
    };

    onDelete = () => {
        if (this.state.response === true) {
            const ownerId = encodeURIComponent(this.state.ownerId);
            const collectionName = encodeURIComponent(this.state.collectionName);
            const collectionDescription = encodeURIComponent(this.state.collectionDescription);
            const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));
            const collectionId = encodeURIComponent(this.props.params._collectionId);

            const formData = `ownerId=${ownerId}&collectionId=${collectionId}&collectionName=${collectionName}&collectionDescription=${collectionDescription}&picturesArray=${picturesArray}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/admin/deleteCollection');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.response === 200) {
                    //Collection was successfully deleted
                    this.setState({
                        message: xhr.response.message
                    });
                }
                else {
                    //Collection was not deleted/Was already deleted/Database error
                    this.setState({
                        message: xhr.response.message
                    });
                }
            });
            xhr.send(formData);
        }
    };

    render() {
        if (this.state.collectionName)
            document.title = "Delete - " + this.state.collectionName;
        else document.title = "404 not found";
        return (
            <Delete
                adminId={this.props.params._id}
                message={this.state.message}
                onDelete={this.onDelete}/>
        )
    }
}

export default DeleteView