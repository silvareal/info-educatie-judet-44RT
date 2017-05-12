import React, {Component} from 'react';

import ReadOne from '../../../components/Admin/Collections/ReadOne.jsx';
import Auth from '../../../modules/Auth.js';

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: '',
            errorMessage: ''
        };
    };

    componentDidMount() {

        //The next few lines will define the HTTP body message
        const collectionId = encodeURIComponent(this.props.params._collectionId);

        const formData = `collectionId=${collectionId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/readOneCollection');
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

    render() {
        if (this.state.collection.collectionName)
            document.title = this.state.collection.collectionName;
        else
            document.title = "404 not found";
        return (
            <ReadOne
                errorMessage={this.state.errorMessage}
                adminId={this.props.params._id}
                collection={this.state.collection} />
        );
    }
}

export default ReadOneView