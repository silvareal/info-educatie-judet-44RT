import React, {Component} from 'react'

import Delete from '../components/Delete.jsx';
import Auth from '../modules/Auth.js';

class DeleteView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            response: null,
            collectionName: '',
            collectionDescription: '',
            pictures:[{}]
        };
    };

    componentDidMount() {

        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/deleteShow');
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
                    pictures: xhr.response.collection.picturesArray
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
            const collectionName = encodeURIComponent(this.state.collectionName);
            const collectionDescription = encodeURIComponent(this.state.collectionDescription);
            const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));
            const collectionId = encodeURIComponent(this.props.params._id);

            const formData = `collectionId=${collectionId}&collectionName=${collectionName}&collectionDescription=${collectionDescription}&picturesArray=${picturesArray}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/crud/deleteExecute');
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
                message={this.state.message}
                onDelete={this.onDelete}/>
        )
    }
}

export default DeleteView