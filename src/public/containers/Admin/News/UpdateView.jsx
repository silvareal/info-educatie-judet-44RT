import React, {Component} from 'react'

import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';

import Update from '../../../components/Admin/News/Main Components/Update.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import NotFoundView from "../../Error/NotFoundView.jsx";
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            errorMessage: '',
            newsTitle: '',
            newsCoverLink: '',
            newsDescription: RichTextEditor.createEmptyValue(),
            newsDescriptionRaw: '',
            inputCount: 1,
            errors: {},
            newsTitleOld: '',
            newsDescriptionOld: '',
            newsDescriptionRawOld: '',
            newsCoverLinkOld: '',
            __html: '',
            fetched: false,
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
                    newsDescriptionRaw: xhr.response.news.newsDescriptionRaw,
                    response: true,
                    newsTitleOld: xhr.response.news.newsTitle,
                    newsCoverLinkOld: xhr.response.news.newsCoverLink,
                    newsDescriptionRawOld: xhr.response.news.newsDescriptionRaw,
                    userName: xhr.response.news.userName,
                    profilePictureLink: xhr.response.news.profilePictureLink
                });

                const contentState = convertFromRaw(JSON.parse(this.state.newsDescriptionRaw));
                if (contentState) {
                    const html = stateToHTML(contentState);
                    this.setState({
                        newsDescription: this.state.newsDescription.setContentFromString(html, 'html'),
                        fetched: true
                    })
                }

            } else {
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false,
                    fetched: "Error"
                });
            }
        });

        xhr.send(formData);
    };

    getHTML = () => {
        if (this.state.newsDescriptionRaw) {
            let editorState = this.state.newsDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let __html = stateToHTML(contentState);
            if (__html.search("/script") === -1 && __html.search("script") === -1)
                return {__html: __html};
        }
    };

    componentDidMount() {
        this.resetScroll();
        this.adminAuth();
        this.getCollection();
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
        if (this.state.response === true) {

            this.resetScroll();

            //converting collectionDescription to collectionDescriptionRaw
            let editorState = this.state.newsDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);

            //The next few lines will define the HTTP body message
            const newsId = encodeURIComponent(this.props.params._newsId);
            const newsTitle = encodeURIComponent(this.state.newsTitle);
            const newsCoverLink = encodeURIComponent(this.state.newsCoverLink);
            const newsDescriptionRaw = encodeURIComponent(JSON.stringify(rawContentState));
            const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);
            const userName = encodeURIComponent(this.state.userName);

            const newsTitleOld = encodeURIComponent(this.state.newsTitleOld);
            const newsCoverLinkOld = encodeURIComponent(this.state.newsCoverLinkOld);
            const newsDescriptionRawOld = encodeURIComponent(this.state.newsDescriptionRawOld);

            const formData = `userName=${userName}&profilePictureLink=${profilePictureLink}&newsTitleOld=${newsTitleOld}&newsCoverLinkOld=${newsCoverLinkOld}&newsDescriptionRawOld=${newsDescriptionRawOld}&newsTitle=${newsTitle}&newsCoverLink=${newsCoverLink}&newsDescriptionRaw=${newsDescriptionRaw}&newsId=${newsId}`;

            //AJAX
            const xhr = new XMLHttpRequest();
            xhr.open('post', '/admin/updateSave');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    this.setState({
                        errorMessage: 'The news article has been successfully updated',
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
        if (this.state.isAdmin === true && this.state.fetched === "Error")
            return <NotFoundView/>;
        if (this.state.fetched === false && this.state.isAdmin !== true)
            return (
                <div className="parallax-collections-create">
                    <div className="top-bar-spacing"/>
                    <LoadingIndicator/>
                </div>
            );
        if (this.state.isAdmin === true)
        {
            return (
                <Update
                    fetched={this.state.fetched}
                    newsDescriptionRaw={this.state.newsDescriptionRaw}
                    getHTML={this.getHTML}
                    __html={this.state.__html}
                    adminId={this.props.params._id}
                    newsTitle={this.state.newsTitle}
                    newsCoverLink={this.state.newsCoverLink}
                    newsDescription={this.state.newsDescription}
                    onNewsTitleChange={this.onNewsTitleChange}
                    onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                    onNewsDescriptionChange={this.onNewsDescriptionChange}
                    newsPictures={this.state.newsPictures}
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
        else return <NotAuthorizedView/>
    }
}

export default UpdateView