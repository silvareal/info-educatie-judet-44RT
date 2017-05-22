import React, {Component} from 'react'

import Update from '../../../components/Admin/News/Update.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            errorMessage: '',
            newsTitle: '',
            newsCoverLink: '',
            newsDescription: '',
            newsPictures: [{
                newsPictureLink: ''
            }],
            inputToRender: 1,
            errors: {},
            errorsNewsPicturesArray: {},
            newsPictureLinkError: [],
            newsTitleOld: '',
            newsDescriptionOld: '',
            newsCoverLinkOld: '',
            newsPicturesOld:[{}],
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
        this.setState({
            errorMessage: "Fetching"
        });

        //The next few lines will define the HTTP body message
        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/updateShow');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //We have checked the user's identity and have retrieved the data of the collection
                this.setState({
                    errorMessage: 'Fetched news',
                    newsTitle: xhr.response.news.newsTitle,
                    newsCoverLink: xhr.response.news.newsCoverLink,
                    newsDescription: xhr.response.news.newsDescription,
                    newsPictures: xhr.response.news.picturesArray,
                    response: true,
                    newsTitleOld: xhr.response.news.newsTitle,
                    newsCoverLinkOld: xhr.response.news.newsCoverLink,
                    newsDescriptionOld: xhr.response.news.newsDescription,
                    newsPicturesOld: xhr.response.news.picturesArray
                });

            } else if (xhr.status == 404) {
                //The user or collection does not exist
                //We show the corresponding error message
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false
                });
            }
            else {
                //Database error to be handled only by an admin
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false
                });
            }
        });

        xhr.send(formData);
    };

    componentDidMount() {
        this.adminAuth();
        this.getCollection();
    };

    onNewsTitleChange = (e) => {
        this.setState({newsTitle: e.target.value});
    };

    onNewsCoverLinkChange = (e) => {
        this.setState({newsCoverLink: e.target.value});
    };

    onNewsDescriptionChange = (e) => {
        this.setState({newsDescription: e.target.value});
    };

    onNewsPictureLinkChange = (e) => {
        this.setState({newsPictureLink: e.target.value});
    };

    handleNewsPicturesLinkChange = (i) => (e) => {
        const newNewsPictures = this.state.newsPictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, newsPictureLink: e.target.value};
        });
        this.setState({newsPictures: newNewsPictures});
    };

    //we don't limit the number of pictures we can add here
    handleAddNewsPictures = (i) => () => {
        this.setState({
            newsPictures: this.state.newsPictures.concat([{
                newsPictureLink: ''
            }])
        });
    };

    handleRemoveNewsPictures = (i) => () => {
        this.setState({
            newsPictures: this.state.newsPictures.filter((s, j) => i !== j),
        });
    };

    onSave = () => {
        if (this.state.response === true) {
            //The next few lines will define the HTTP body message
            const newsId = encodeURIComponent(this.props.params._newsId);
            const newsTitle = encodeURIComponent(this.state.newsTitle);
            const newsCoverLink = encodeURIComponent(this.state.newsCoverLink);
            const newsDescription = encodeURIComponent(this.state.newsDescription);
            const newsPictures = encodeURIComponent(JSON.stringify(this.state.newsPictures));

            const newsTitleOld = encodeURIComponent(this.state.newsTitleOld);
            const newsCoverLinkOld = encodeURIComponent(this.state.newsCoverLinkOld);
            const newsDescriptionOld = encodeURIComponent(this.state.newsDescriptionOld);
            const newsPicturesOld = encodeURIComponent(JSON.stringify(this.state.newsPicturesOld));

            const formData = `newsTitleOld=${newsTitleOld}&newsCoverLinkOld=${newsCoverLinkOld}&newsDescriptionOld=${newsDescriptionOld}&newsPicturesOld=${newsPicturesOld}&newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescription=${newsDescription}&newsPictures=${newsPictures}&newsId=${newsId}`;

            //AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/admin/updateSave');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    //We will display a Success! message if the entry was added to the DB
                    //We will also reset the fields
                    this.setState({
                        errors: {},
                        errorsNewsPicturesArray: {},
                        newsPictureLinkError: [],
                        successCreation: true,
                        errorMessage: 'The news article has been successfully updated',
                        newsTitle : '',
                        newsCoverLink: '',
                        newsDescription: '',
                        newsPictures : [{
                            newsPictureLink: ''
                        }]
                    });
                }
                else if (xhr.status === 400) {

                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;
                    const errorsNewsPicturesArray = xhr.response.errorsNewsPicturesArray ? xhr.response.errorsNewsPicturesArray : {};

                    this.setState({
                        successCreation: false,
                        errors,
                        errorsNewsPicturesArray
                    });

                    let newsPictureLinkError;

                    newsPictureLinkError = this.state.errorsNewsPicturesArray.map((a) => {
                        return a.newsPictureLink;
                    });

                    this.setState({
                        newsPictureLinkError: newsPictureLinkError
                    })
                }
            });

            //Send the data for insertion into the DB
            xhr.send(formData);
        }
    };

    //Finish showing errors on update fields and then look into trying to update non-existent collections

    render() {
        if (this.state.newsTitle)
        document.title = "Update News - " + this.state.newsTitle;
        else
            document.title = "404 not found";
        if (this.state.isAdmin === true)
        {
            return (
                <Update
                    userId={this.props.params._id}
                    newsTitle={this.state.newsTitle}
                    newsCoverLink={this.state.newsCoverLink}
                    newsDescription={this.state.newsDescription}
                    onNewsTitleChange={this.onNewsTitleChange}
                    onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                    onNewsDescriptionChange={this.onNewsDescriptionChange}
                    newsPictures={this.state.newsPictures}
                    onNewsPictureLinkChange={this.onNewsPictureLinkChange}
                    handleNewsPicturesLinkChange={this.handleNewsPicturesLinkChange}
                    handleAddNewsPictures={this.handleAddNewsPictures}
                    handleRemoveNewsPictures={this.handleRemoveNewsPictures}
                    successCreation={this.state.successCreation}
                    newsPictureLinkError={this.state.newsPictureLinkError}
                    errorMessage={this.state.errorMessage}
                    errors={this.state.errors}
                    onSave={this.onSave}
                />
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default UpdateView