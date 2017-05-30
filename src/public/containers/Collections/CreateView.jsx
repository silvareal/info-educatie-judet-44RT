import React, {Component} from 'react'

import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw} from 'draft-js';

import Create from '../../components/Collections/Main Components/Create.jsx'
import Auth from '../../modules/Auth.js';

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            successCreation: '',
            collectionName: '',
            inputCount: 1,
            errorMessage: '',
            errors: {},
            errorsPicturesArray: {},
            pictureNameError: [],
            pictureDescriptionError: [],
            pictureLinkError: [],
            pictures: [{
                pictureName: '',
                pictureLink: '',
                pictureDescription: RichTextEditor.createEmptyValue(),
                pictureDescriptionRaw: '',
            }],
            collectionDescription: RichTextEditor.createEmptyValue(),
            __html: '',
            qrLink: '',
            profilePictureLink: ''
        };
    };

    getCredentials = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/credentials');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    userName: xhr.response.userName,
                    profilePictureLink: xhr.response.profilePictureLink
                })
            }
        });
        xhr.send();
    };

    componentDidMount() {
        this.resetScroll();
        this.getCredentials();
    };

    getHTML = () => {
        let editorState = this.state.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    onCollectionChange = (e) => {
        this.setState({collectionName: e.target.value});
    };

    onCollectionDescriptionChange = (value) => {
        this.setState({collectionDescription: value, __html: stateToHTML(value.getEditorState().getCurrentContent())});
    };

    onQRLinkChange = (e) => {
        this.setState({qrLink: e.target.value})
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.setState({pictures: newPictures});
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.setState({pictures: newPictures});
    };

    handlePicturesDescriptionChange = (i) => (value) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;

            let editorState = value.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);
            return {...picture, pictureDescription: value, pictureDescriptionRaw: JSON.stringify(rawContentState)};
        });
        this.setState({pictures: newPictures});
    };

    handleAddPictures = (i) => () => {
        if (this.state.inputCount < 4) {
            this.setState({
                inputCount: this.state.inputCount + 1,
                pictures: this.state.pictures.concat([{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: RichTextEditor.createEmptyValue(),
                    pictureDescriptionRaw: ''
                }])
            });
        }
        else {
            this.setState({errorMessage: "You can only add up to 4 pictures"})
        }
    };

    handleRemovePictures = (i) => () => {
        this.setState({
            pictures: this.state.pictures.filter((s, j) => i !== j),
            errorMessage: '',
            inputCount: this.state.inputCount - 1
        });
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onSave = () => {

        this.resetScroll();

        //converting collectionDescription to collectionDescriptionRaw
        let editorState = this.state.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        //The next few lines will define the HTTP body message
        const collectionName = encodeURIComponent(this.state.collectionName);
        const collectionDescriptionRaw = encodeURIComponent(JSON.stringify(rawContentState));
        const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));
        const userName = encodeURIComponent(this.state.userName);
        const qrLink = encodeURIComponent(this.state.qrLink);
        const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

        const formData = `profilePictureLink=${profilePictureLink}&qrLink=${qrLink}&collectionName=${collectionName}&collectionDescriptionRaw=${collectionDescriptionRaw}&picturesArray=${picturesArray}&userName=${userName}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/create');
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
                    collectionName: '',
                    collectionDescription: RichTextEditor.createEmptyValue(),
                    pictures: [
                        {
                            pictureName: '',
                            pictureLink: '',
                            pictureDescription: ''
                        }
                    ],
                    pictureNameError: '',
                    pictureDescriptionError: '',
                    pictureLinkError: '',
                    qrLink: ''
                });
            }
            else if (xhr.status === 400) {

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                const errorsPicturesArray = xhr.response.errorsPicturesArray ? xhr.response.errorsPicturesArray : {};

                this.setState({
                    successCreation: false,
                    errors,
                    errorsPicturesArray
                });

                let pictureNameError, pictureDescriptionError, pictureLinkError;

                pictureNameError = this.state.errorsPicturesArray.map((a) => {
                    return a.pictureName;
                });

                pictureDescriptionError = this.state.errorsPicturesArray.map((a) => {
                    return a.pictureDescription
                });

                pictureLinkError = this.state.errorsPicturesArray.map((a) => {
                    return a.pictureLink
                });

                this.setState({
                    pictureNameError: pictureNameError,
                    pictureDescriptionError: pictureDescriptionError,
                    pictureLinkError: pictureLinkError
                })
            }
        });

        //Send the data for insertion into the DB
        xhr.send(formData);
    };

    render() {

        document.title = "Add collection";
        return (
            <Create
                onQRLinkChange={this.onQRLinkChange}
                qrLink={this.state.qrLink}
                collectionName={this.state.collectionName}
                onCollectionChange={this.onCollectionChange}
                collectionDescription={this.state.collectionDescription}
                getHTML={this.getHTML}
                __html={this.state.__html}
                onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                pictures={this.state.pictures}
                errorMessage={this.state.errorMessage}
                handlePicturesNameChange={this.handlePicturesNameChange}
                handlePicturesLinkChange={this.handlePicturesLinkChange}
                handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                handleAddPictures={this.handleAddPictures}
                handleRemovePictures={this.handleRemovePictures}
                onSave={this.onSave}
                successCreation={this.state.successCreation}
                errors={this.state.errors}
                pictureNameError={this.state.pictureNameError}
                pictureDescriptionError={this.state.pictureDescriptionError}
                pictureLinkError={this.state.pictureLinkError}
            />)
    }
}

export default CreateView;