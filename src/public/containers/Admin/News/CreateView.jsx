import React, {Component} from 'react'

import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw} from 'draft-js';

import Create from '../../../components/Admin/News/Main Components/Create.jsx'
import Auth from '../../../modules/Auth.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            successCreation: '',
            inputCount: 1,
            errorMessage: '',
            errors: {},
            newsTitle: '',
            newsCoverLink: '',
            newsDescription: RichTextEditor.createEmptyValue(),
            newsPictureLinkError: '',
            isAdmin: false,
            __html: '',
            userName: '',
            profilePictureLink: ''
        };
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
                        userId: xhr.response.userId,
                        profilePictureLink: xhr.response.profilePictureLink
                    });
                else this.setState({
                    guest: true
                })
            }
        });
        xhr.send();
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

    componentDidMount() {
        this.adminAuth();
        this.getUser();
    }

    getHTML = () => {
        let editorState = this.state.newsDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    onNewsTitleChange = (e) => {
        this.setState({newsTitle: e.target.value});
    };

    onNewsCoverLinkChange = (e) => {
        this.setState({newsCoverLink: e.target.value});
    };

    onNewsDescriptionChange = (value) => {
        this.setState({newsDescription: value, __html: stateToHTML(value.getEditorState().getCurrentContent())});
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onSave = () => {

        this.resetScroll();

        //converting collectionDescription to collectionDescriptionRaw
        let editorState = this.state.newsDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        //The next few lines will define the HTTP body message
        const newsTitle = encodeURIComponent(this.state.newsTitle);
        const newsCoverLink = encodeURIComponent(this.state.newsCoverLink);
        const newsDescriptionRaw = encodeURIComponent(JSON.stringify(rawContentState));
        const userName = encodeURIComponent(this.state.userName);
        const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

        const formData = `profilePictureLink=${profilePictureLink}&userName=${userName}&newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescriptionRaw=${newsDescriptionRaw}`;

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
                    successCreation: true,
                    errorMessage: '',
                    newsTitle : '',
                    newsCoverLink: '',
                    newsDescription: RichTextEditor.createEmptyValue(),
                });
            }
            else if (xhr.status === 400) {

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    successCreation: false,
                    errors
                });
            }
        });

        //Send the data for insertion into the DB
        xhr.send(formData);
    };

    render() {
        document.title = "Create news - Admin Controlled";
        if (this.state.isAdmin === true)
        {
            return (
                <Create
                    getHTML={this.getHTML}
                    __html={this.state.__html}
                    adminId={this.props.params._id}
                    newsTitle={this.state.newsTitle}
                    newsCoverLink={this.state.newsCoverLink}
                    newsDescription={this.state.newsDescription}
                    onNewsTitleChange={this.onNewsTitleChange}
                    onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                    onNewsDescriptionChange={this.onNewsDescriptionChange}
                    errorMessage={this.state.errorMessage}
                    onSave={this.onSave}
                    successCreation={this.state.successCreation}
                    errors={this.state.errors}
                />)
        }
        else return <NotAuthorizedView/>
    }
}

export default CreateView;