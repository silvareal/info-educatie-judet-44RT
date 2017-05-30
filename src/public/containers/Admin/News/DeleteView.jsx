import React, {Component} from 'react'

import Delete from '../../../components/Admin/News/Main Components/Delete.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';
import NotFoundView from "../../Error/NotFoundView.jsx";
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";

class DeleteView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            response: false,
            newsTitle: '',
            newsCoverLink: '',
            newsDescriptionRaw: '',
            newsPictures: [{}],
            isAdmin: false,
            userName: '',
            profilePictureLink: ''
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
                    newsDescriptionRaw: xhr.response.news.newsDescriptionRaw,
                    newsPictures: xhr.response.news.picturesArray
                });
            }
            else {
                //Collection or user doesn't exist
                this.setState({
                    message: xhr.response.message,
                    response: "Error"
                })
            }
        });
        xhr.send(formData);
    };

    getUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/comment/getUserCredentials");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                if (xhr.response.guest !== true)
                    this.setState({
                        userName: xhr.response.userName,
                        profilePictureLink: xhr.response.profilePictureLink
                    });
                else this.setState({
                    guest: true
                })
            }
        });
        xhr.send();
    };

    componentDidMount() {
        this.resetScroll();
        this.adminAuth();
        this.getCollection();
        this.getUser();
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
        const newsDescriptionRaw = encodeURIComponent(this.state.newsDescriptionRaw);
        const newsPictures = encodeURIComponent(JSON.stringify(this.state.newsPictures));
        const userName = encodeURIComponent(this.state.userName);
        const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

        const formData = `profilePictureLink=${profilePictureLink}&userName=${userName}&newsId=${newsId}&newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescriptionRaw=${newsDescriptionRaw}&newsPictures=${newsPictures}`;

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
        if (this.state.isAdmin === true && this.state.response === "Error")
            return <NotFoundView/>;
        if (this.state.response === false && this.state.isAdmin !== true)
            return (
                <div className="parallax-collections-delete">
                    <div className="top-bar-spacing"/>
                    <LoadingIndicator/>
                </div>
            );
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