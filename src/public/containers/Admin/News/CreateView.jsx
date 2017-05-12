import React, {Component} from 'react'

import Create from '../../../components/Admin/News/Create.jsx'
import Auth from '../../../modules/Auth.js';

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            newsTitle: '',
            newsCoverLink: '',
            newsDescription: '',
            newsPictures: [{
                newsPictureLink: ''
            }],
            successCreation: '',
            errors: {},
            errorMessage: '',
            errorsNewsPicturesArray: {},
            newsPictureLinkError: ''
        };
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
        //The next few lines will define the HTTP body message
        const newsTitle = encodeURIComponent(this.state.newsTitle);
        const newsCoverLink = encodeURIComponent(this.state.newsCoverLink);
        const newsDescription = encodeURIComponent(this.state.newsDescription);
        const newsPictures = encodeURIComponent(JSON.stringify(this.state.newsPictures));

        const formData = `newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescription=${newsDescription}&newsPictures=${newsPictures}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/create');
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
                    errorMessage: '',
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
    };

    render() {
        return (
            <Create
                userId={this.props.params._id}
                newsTitle={this.state.newsTitle}
                newsCoverLink={this.state.newsCoverLink}
                newsDescription={this.state.newsDescription}
                onNewsTitleChange={this.onNewsTitleChange}
                onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                onNewsDescriptionChange={this.onNewsDescriptionChange}
                newsPictures={this.state.newsPictures}
                errorMessage={this.state.errorMessage}
                onNewsPictureLinkChange={this.onNewsPictureLinkChange}
                handleNewsPicturesLinkChange={this.handleNewsPicturesLinkChange}
                handleAddNewsPictures={this.handleAddNewsPictures}
                handleRemoveNewsPictures={this.handleRemoveNewsPictures}
                onSave={this.onSave}
                successCreation={this.state.successCreation}
                errors={this.state.errors}
                newsPictureLinkError={this.state.newsPictureLinkError}
            />)
    }
}

export default CreateView;