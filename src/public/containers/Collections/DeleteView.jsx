import React, {Component} from 'react'

import Delete from '../../components/Collections/Main Components/Delete.jsx';
import Auth from '../../modules/Auth.js';
import NotFoundView from "../Error/NotFoundView.jsx";

class DeleteView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            response: null,
            collectionName: '',
            collectionDescriptionRaw: '',
            pictures:[{}]
        };
    };

    componentDidMount() {

        this.resetScroll();

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
                    collectionDescriptionRaw: xhr.response.collection.collectionDescriptionRaw,
                    pictures: xhr.response.collection.picturesArray
                });
            }
            else {
                this.setState({
                    response: "Error"
                })
            }
        });
        xhr.send(formData)
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onDelete = () => {
        if (this.state.response === true) {

            this.resetScroll();

            const collectionName = encodeURIComponent(this.state.collectionName);
            const collectionDescriptionRaw = encodeURIComponent(this.state.collectionDescriptionRaw);
            const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));
            const collectionId = encodeURIComponent(this.props.params._id);

            const formData = `collectionId=${collectionId}&collectionName=${collectionName}&collectionDescriptionRaw=${collectionDescriptionRaw}&picturesArray=${picturesArray}`;

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
        if (this.state.response === "Error")
            return <NotFoundView/>;
        return (
            <Delete
                response={this.state.response}
                message={this.state.message}
                onDelete={this.onDelete}/>
        )
    }
}

export default DeleteView