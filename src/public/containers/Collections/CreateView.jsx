import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw} from 'draft-js';
import {connect} from 'react-redux';
import * as createCollectionsActions from '../../actions/Collections/manageCollectionsCreateActions.js'
import Create from '../../components/Collections/Main Components/Create.jsx'
import LoadingIndicator from "../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let getInitialState = function (collectionDescription, pictureDescription) {
        dispatch(createCollectionsActions.onCreateInitiate(collectionDescription, pictureDescription))
    };

    let onCollectionNameChange = function (collectionName) {
        dispatch(createCollectionsActions.onCollectionNameChange(collectionName))
    };

    let onCollectionDescriptionChange = function (collectionDescription, __html) {
        dispatch(createCollectionsActions.onCollectionDescriptionChange(collectionDescription, __html))
    };

    let onPicturesArrayChange = function (pictures) {
        dispatch(createCollectionsActions.onPicturesArrayChange(pictures))
    };

    let onAddInputField = function (pictures, pictureDescription) {
        dispatch(createCollectionsActions.onAddInputField(pictures, pictureDescription))
    };

    let onRemoveInputField = function (pictures, index) {
        dispatch(createCollectionsActions.onRemoveInputField(pictures, index))
    };

    let onSave = function (collectionName, collectionDescriptionRaw, pictures) {
        dispatch(createCollectionsActions.onSaveCollection(collectionName, collectionDescriptionRaw, pictures))
    };

    return {
        getInitialState,
        onCollectionNameChange,
        onCollectionDescriptionChange,
        onPicturesArrayChange,
        onAddInputField,
        onRemoveInputField,
        onSave
    }
};

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getInitialState(RichTextEditor.createEmptyValue(), RichTextEditor.createEmptyValue());
        this.resetScroll();
    };

    onCollectionNameChange = (e) => {
        this.handlers.onCollectionNameChange(e.target.value);
    };

    onCollectionDescriptionChange = (value) => {
        this.handlers.onCollectionDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    getHTML = () => {
        let editorState = this.props.UIState.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesDescriptionChange = (i) => (value) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;

            let editorState = value.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);
            return {...picture, pictureDescription: value, pictureDescriptionRaw: JSON.stringify(rawContentState)};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handleAddPictures = (i) => () => {
        this.handlers.onAddInputField(this.props.UIState.pictures, RichTextEditor.createEmptyValue());
    };

    handleRemovePictures = (i) => () => {
        this.handlers.onRemoveInputField(this.props.UIState.pictures, i);
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    onSave = () => {
        this.resetScroll();

        // Convert editorState to contentState and then "HTML-ize" it
        let editorState = this.props.UIState.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        const collectionName = this.props.UIState.collectionName;
        const collectionDescriptionRaw = JSON.stringify(rawContentState);
        const pictures = JSON.stringify(this.props.UIState.pictures);

        this.handlers.onSave(collectionName, collectionDescriptionRaw, pictures);
    };

    render() {

        document.title = "Add collection";

        //Verify if the Redux Store has filled up initial state
        if (typeof this.props.UIState.collectionName === 'string')
        return (
            <Create
                collectionName={this.props.UIState.collectionName}
                onCollectionNameChange={this.onCollectionNameChange}
                collectionDescription={this.props.UIState.collectionDescription}
                onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                __html={this.props.UIState.__html}
                getHTML={this.getHTML}
                pictures={this.props.UIState.pictures}
                handlePicturesNameChange={this.handlePicturesNameChange}
                handlePicturesLinkChange={this.handlePicturesLinkChange}
                handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                handleAddPictures={this.handleAddPictures}
                handleRemovePictures={this.handleRemovePictures}
                onSave={this.onSave}
                message={this.props.UIState.message}
                successCreation={this.props.UIState.successCreation}
                errors={this.props.UIState.errors}
                pictureNameError={this.props.UIState.pictureNameError}
                pictureDescriptionError={this.props.UIState.pictureDescriptionError}
                pictureLinkError={this.props.UIState.pictureLinkError}
            />);
        else return <LoadingIndicator/>
    }
}

CreateView.propTypes = {
    userName: PropTypes.string,
    profilePictureLink: PropTypes.string,
    guest: PropTypes.bool,
    finished: PropTypes.bool,
    collectionName: PropTypes.string,
    collectionDescription: PropTypes.object,
    __html: PropTypes.string,
    pictures: PropTypes.array,
    successCreation: PropTypes.bool,
    errors: PropTypes.object,
    pictureNameError: PropTypes.array,
    pictureLinkError: PropTypes.array,
    pictureDescriptionError: PropTypes.array,
    message: PropTypes.string
};

const credentials = (state) => {
    if (state.userReducer.fetching === true) {
        return {
            guest: false,
            finished: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            guest: false,
            finished: true
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true,
            finished: true
        };
};

const UIState = (state) => {
    if (state.manageCollectionsCreateReducer) {
        const statePath = state.manageCollectionsCreateReducer;
        return {
            collectionName: statePath.collectionName,
            collectionDescription: statePath.collectionDescription,
            __html: statePath.__html,
            pictures: statePath.pictures,
            successCreation: statePath.successCreation,
            errors: statePath.errors,
            pictureNameError: statePath.pictureNameError,
            pictureLinkError: statePath.pictureLinkError,
            pictureDescriptionError: statePath.pictureDescriptionError,
            message: statePath.message
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    UIState: UIState(state)
});

export default connect(mapStateToProps)(CreateView);