import React, {Component} from 'react'

import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';

import {CircularProgress} from 'material-ui';

import Update from '../../components/Collections/Main Components/Update.jsx';
import Auth from '../../modules/Auth.js';

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            userId: '',
            errorMessage: '',
            collectionId: '',
            collectionName: '',
            collectionDescription: RichTextEditor.createEmptyValue(),
            collectionDescriptionRaw: '',
            inputCount: 1,
            errors: {},
            errorsPicturesArray: {},
            pictureNameError: [],
            pictureDescriptionError: [],
            pictureLinkError: [],
            pictures: [{
                pictureName: '',
                pictureLink: '',
                pictureDescription: RichTextEditor.createEmptyValue(),
                pictureDescriptionRaw: ''
            }],
            //oldState
            collectionNameOld: '',
            collectionDescriptionRawOld: '',
            picturesOld: [{}],
            __html: '',
            fetched: false,
            qrLink: ''
        };
    };

    componentDidMount() {

        this.setState({
            errorMessage: "Fetching"
        });

        //The next few lines will define the HTTP body message
        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/updateShow');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //We have checked the user's identity and have retrieved the data of the collection
                this.setState({
                    userId: xhr.response.userId,
                    errorMessage: 'Fetched collection',
                    collectionId: xhr.response.collection._id,
                    collectionName: xhr.response.collection.collectionName,
                    collectionDescriptionRaw: xhr.response.collection.collectionDescriptionRaw,
                    pictures: xhr.response.collection.picturesArray,
                    inputCount: xhr.response.collection.picturesArray.length,
                    response: true,
                    collectionNameOld: xhr.response.collection.collectionName,
                    collectionDescriptionRawOld: xhr.response.collection.collectionDescriptionRaw,
                    picturesOld: xhr.response.collection.picturesArray,
                    qrLink: xhr.response.collection.qrLink
                });

                const contentState = convertFromRaw(JSON.parse(this.state.collectionDescriptionRaw));
                if (contentState) {
                    const html = stateToHTML(contentState);
                    this.setState({
                        collectionDescription: this.state.collectionDescription.setContentFromString(html, 'html')
                    })
                }

                //converting the pictureDescriptionRaw to pictureDescription - editorState
                let pictures = this.state.pictures;

                for (let i = 0; i < pictures.length; i++) {
                    this.setRawValue(i);
                    this.setHTMLValue(i);
                    if (i === pictures.length - 1) {
                        this.setState({
                            fetched: true,
                        })
                    }
                }

            } else {
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false
                });
            }
        });

        xhr.send(formData);
    };

    onQRLinkChange = (e) => {
        this.setState({qrLink: e.target.value})
    };

    setRawValue = (i) => {
        let pictures = this.state.pictures;
        const newPictures = pictures.map((picture, j) => {
            if (i !== j) return picture;

            return {...picture, pictureDescription: RichTextEditor.createEmptyValue()}
        });
        this.setState({pictures: newPictures});
    };

    setHTMLValue = (i) => {
        let pictures = this.state.pictures;
        const newPictures = pictures.map((picture, j) => {
            if (i !== j) return picture;

            const contentState = convertFromRaw(JSON.parse(pictures[i].pictureDescriptionRaw));
            const html = stateToHTML(contentState);
            return {...picture, pictureDescription: pictures[i].pictureDescription.setContentFromString(html, 'html')}
        });
        this.setState({pictures: newPictures});
    };

    getHTML = () => {
        if (this.state.collectionDescriptionRaw) {
            let editorState = this.state.collectionDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let __html = stateToHTML(contentState);
            if (__html.search("/script") === -1 && __html.search("script") === -1)
                return {__html: __html};
        }
    };

    onCollectionChange = (e) => {
        this.setState({collectionName: e.target.value});
    };

    onCollectionDescriptionChange = (value) => {
        this.setState({collectionDescription: value, __html: stateToHTML(value.getEditorState().getCurrentContent())});
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
            inputToRender: this.state.inputToRender - 1
        });
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onSave = () => {

        if (this.state.response === true) {

            for (let i = 0; i < this.state.pictures.length; i++) {
                const newPictures = this.state.pictures.map((picture, j) => {
                    if (i !== j) return picture;

                    let editorState = this.state.pictures[i].pictureDescription.getEditorState();
                    let contentState = editorState.getCurrentContent();
                    let rawContentState = window.rawContentState = convertToRaw(contentState);
                    return {...picture, pictureDescriptionRaw: JSON.stringify(rawContentState)};
                });
                this.setState({pictures: newPictures});
            }

            this.resetScroll();

            //converting collectionDescription to collectionDescriptionRaw
            let editorState = this.state.collectionDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);

            //The next few lines will define the HTTP body message
            const collectionId = encodeURIComponent(this.state.collectionId);
            const collectionName = encodeURIComponent(this.state.collectionName);
            const collectionDescriptionRaw = encodeURIComponent(JSON.stringify(rawContentState));
            const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));
            const qrLink = encodeURIComponent(this.state.qrLink);

            const collectionNameOld = encodeURIComponent(this.state.collectionNameOld);
            const collectionDescriptionRawOld = encodeURIComponent(this.state.collectionDescriptionRawOld);
            const picturesArrayOld = encodeURIComponent(JSON.stringify(this.state.picturesOld));

            const formData = `qrLink=${qrLink}&collectionNameOld=${collectionNameOld}&collectionDescriptionRawOld=${collectionDescriptionRawOld}&picturesArrayOld=${picturesArrayOld}&collectionId=${collectionId}&collectionName=${collectionName}&collectionDescriptionRaw=${collectionDescriptionRaw}&picturesArray=${picturesArray}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/crud/updateSave');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    this.setState({
                        errorMessage: "Your collection was successfully updated!"
                    });
                }
                else if (xhr.status === 404) {
                    this.setState({
                        errorMessage: "The collection was not found. Maybe you deleted it?"
                    });
                }
                else if (xhr.status === 400) {
                    //Inserted data is not correct or database error

                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;
                    const errorsPicturesArray = xhr.response.errorsPicturesArray ? xhr.response.errorsPicturesArray : {};

                    this.setState({
                        successUpdate: false,
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
                        pictureLinkError: pictureLinkError,
                        pictureDescriptionError: pictureDescriptionError
                    })
                }
            });
            xhr.send(formData);
        }
    };

    //Finish showing errors on update fields and then look into trying to update non-existent collections

    render() {
        if (this.state.collectionName)
            document.title = "Update - " + this.state.collectionName;
        else
            document.title = "404 not found";
        return (
            <Update
                qrLink={this.state.qrLink}
                onQRLinkChange={this.onQRLinkChange}
                collectionId={this.state.collectionId}
                collectionName={this.state.collectionName}
                onCollectionChange={this.onCollectionChange}
                collectionDescription={this.state.collectionDescription}
                onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                collectionDescriptionRaw={this.state.collectionDescriptionRaw}
                getHTML={this.getHTML}
                __html={this.state.__html}
                errorMessage={this.state.errorMessage}
                errors={this.state.errors}
                pictureNameError={this.state.pictureNameError}
                pictureDescriptionError={this.state.pictureDescriptionError}
                pictureLinkError={this.state.pictureLinkError}
                pictures={this.state.pictures}
                handlePicturesNameChange={this.handlePicturesNameChange}
                handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                handlePicturesLinkChange={this.handlePicturesLinkChange}
                handleAddPictures={this.handleAddPictures}
                handleRemovePictures={this.handleRemovePictures}
                onSave={this.onSave}
            />
        );
    }
}

export default UpdateView