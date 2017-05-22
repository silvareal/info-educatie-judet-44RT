import React, {Component} from 'react';

import ReadOne from '../../../components/Admin/Collections/ReadOne.jsx';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';
import Auth from '../../../modules/Auth.js';

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collection: '',
            errorMessage: '',
            isAdmin: false
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

                if (xhr.response.message === "Not an admin"){
                    this.setState({
                        isAdmin: false
                    })
                }
                else{
                    this.setState({
                        isAdmin: true,
                        errorMessage: '',
                        collection: xhr.response.collection
                    })
                }

            }
            else {
                this.setState({
                    isAdmin: false,
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
        if (this.state.isAdmin === true){
            return (
                <ReadOne
                    errorMessage={this.state.errorMessage}
                    adminId={this.props.params._id}
                    collection={this.state.collection} />
            );
        }
        else return <NotAuthorizedPage/>
    }
}

export default ReadOneView