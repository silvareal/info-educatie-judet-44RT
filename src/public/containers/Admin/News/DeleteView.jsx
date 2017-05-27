import React, {Component} from 'react'

import Delete from '../../../components/Admin/News/Main Components/Delete.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class DeleteView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            response: null,
            newsTitle: '',
            newsCoverLink: '',
            newsDescription: '',
            newsPictures: [{}],
            isAdmin: false
        };
    };

    adminAuth = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    };

    getCollection = () => {
        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/deleteShow');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //Collection exists and the user that wants to delete it is the creator
                this.setState({
                    message: xhr.response.message,
                    response: true,
                    newsTitle: xhr.response.news.newsTitle,
                    newsCoverLink: xhr.response.news.newsCoverLink,
                    newsDescription: xhr.response.news.newsDescription,
                    newsPictures: xhr.response.news.picturesArray
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
        xhr.send(formData);
    };

    componentDidMount() {
        this.adminAuth();
        this.getCollection();
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    //We don t need to verify the identity in the componentDidMount lifecycle
    //We will simply check it once the one that requests the delete presses the DELETE button or variations of it
    onDelete = () => {

        this.resetScroll();

        const newsId = encodeURIComponent(this.props.params._newsId);
        const newsTitle = encodeURIComponent(this.state.newsTitle);
        const newsCoverLink = encodeURIComponent(this.state.newsCoverLink);
        const newsDescription = encodeURIComponent(this.state.newsDescription);
        const newsPictures = encodeURIComponent(JSON.stringify(this.state.newsPictures));

        const formData = `newsId=${newsId}&newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescription=${newsDescription}&newsPictures=${newsPictures}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/delete');
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
    };

    render() {
        if (this.state.newsTitle)
            document.title = "Delete - " + this.state.newsTitle;
        else
        document.title = "404 not found";
        if (this.state.isAdmin === true)
        {
            return (
                <Delete
                    response={this.state.response}
                    adminId={this.props.params._id}
                    message={this.state.message}
                    onDelete={this.onDelete}/>
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default DeleteView