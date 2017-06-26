import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';
import {connect} from 'react-redux';
import * as updateActions from '../../actions/Collections/manageCollectionsUpdateActions.js'
import Update from '../../components/Collections/Main Components/Update.jsx';

let createHandler = function (dispatch) {
    let getCollection = function (collectionId, textEditorState) {
        dispatch(updateActions.onMountUpdate(collectionId, textEditorState))
    };

    let onCollectionNameChange = function (collectionName) {
        dispatch(updateActions.onCollectionNameChange(collectionName))
    };

    let onCollectionDescriptionChange = function (collectionDescription, __html) {
        dispatch(updateActions.onCollectionDescriptionChange(collectionDescription, __html))
    };

    let onPicturesArrayChange = function (pictures) {
        dispatch(updateActions.onPicturesArrayChange(pictures))
    };

    let onAddInputField = function (pictures, pictureDescription) {
        dispatch(updateActions.onAddInputField(pictures, pictureDescription))
    };

    let onRemoveInputField = function (pictures, index) {
        dispatch(updateActions.onRemoveInputField(pictures, index))
    };

    let onUpdate = function (collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld) {
        dispatch(updateActions.onUpdate(collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld))
    };

    return {
        getCollection,
        onCollectionNameChange,
        onCollectionDescriptionChange,
        onPicturesArrayChange,
        onAddInputField,
        onRemoveInputField,
        onUpdate
    }
};

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getCollection(this.props.params._id, RichTextEditor.createEmptyValue());
    };

    onCollectionNameChange = (e) => {
        this.handlers.onCollectionNameChange(e.target.value);
    };

    onCollectionDescriptionChange = (value) => {
        this.handlers.onCollectionDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    getHTML = () => {
            let editorState = this.props.collectionDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let __html = stateToHTML(contentState);
            if (__html.search("/script") === -1 && __html.search("script") === -1)
                return {__html: __html};
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.props.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.props.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesDescriptionChange = (i) => (value) => {
        const newPictures = this.props.pictures.map((picture, j) => {
            if (i !== j) return picture;

            let editorState = value.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);
            return {...picture, pictureDescription: value, pictureDescriptionRaw: JSON.stringify(rawContentState)};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handleAddPictures = (i) => () => {
        this.handlers.onAddInputField(this.props.pictures, RichTextEditor.createEmptyValue());
    };

    handleRemovePictures = (i) => () => {
        this.handlers.onRemoveInputField(this.props.pictures, i);
    };

    onSave = () => {

        if (this.props.fetchedCollection === true) {

            for (let i = 0; i < this.props.pictures.length; i++) {
                const newPictures = this.props.pictures.map((picture, j) => {
                    if (i !== j) return picture;

                    let editorState = this.props.pictures[i].pictureDescription.getEditorState();
                    let contentState = editorState.getCurrentContent();
                    let rawContentState = window.rawContentState = convertToRaw(contentState);
                    return {...picture, pictureDescriptionRaw: JSON.stringify(rawContentState)};
                });
                this.handlers.onPicturesArrayChange(newPictures);
            }

            //converting collectionDescription to collectionDescriptionRaw
            let editorState = this.props.collectionDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);

            const collectionId = this.props.params._id;
            const collectionName = this.props.collectionName;
            const collectionNameOld = this.props.collectionNameOld;
            const collectionDescription = JSON.stringify(rawContentState);
            const collectionDescriptionRawOld = this.props.collectionDescriptionRawOld;
            const pictures = JSON.stringify(this.props.pictures);
            const picturesOld = JSON.stringify(this.props.picturesOld);

            this.handlers.onUpdate(collectionId, collectionName, collectionDescription, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld);
        }
    };

    //Finish showing errors on update fields and then look into trying to update non-existent collections

    render() {
        if (this.props.collectionName)
            document.title = "Update - " + this.props.collectionName;
        else
            document.title = "404 not found";
            return (
                <Update
                    fetchedCollection={this.props.fetchedCollection}
                    fetchingCollection={this.props.fetchingCollection}
                    collectionId={this.props.collectionId}
                    collectionName={this.props.collectionName}
                    onCollectionNameChange={this.onCollectionNameChange}
                    collectionDescription={this.props.collectionDescription}
                    onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                    collectionDescriptionRaw={this.props.collectionDescriptionRaw}
                    getHTML={this.getHTML}
                    __html={this.props.__html}
                    message={this.props.message}
                    errors={this.props.errors}
                    pictureNameError={this.props.pictureNameError}
                    pictureDescriptionError={this.props.pictureDescriptionError}
                    pictureLinkError={this.props.pictureLinkError}
                    pictures={this.props.pictures}
                    handlePicturesNameChange={this.handlePicturesNameChange}
                    handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                    handlePicturesLinkChange={this.handlePicturesLinkChange}
                    handleAddPictures={this.handleAddPictures}
                    handleRemovePictures={this.handleRemovePictures}
                    onSave={this.onSave}
                    successUpdate={this.props.successUpdate}
                />
            );
    }
}

UpdateView.propTypes = {
    collectionName: PropTypes.string,
    collectionNameOld: PropTypes.string,
    collectionDescription: PropTypes.object,
    collectionDescriptionRaw: PropTypes.string,
    collectionDescriptionRawOld: PropTypes.string,
    pictures: PropTypes.array,
    picturesOld: PropTypes.array,
    __html: PropTypes.string,
    fetchedCollection: PropTypes.bool,
    fetchingCollection: PropTypes.bool,
    errors: PropTypes.object,
    pictureNameError: PropTypes.array,
    pictureLinkError: PropTypes.array,
    pictureDescriptionError: PropTypes.array,
    successUpdate: PropTypes.bool,
    message: PropTypes.string,
};

const mapStateToProps = (state) => {
    if (state.manageCollectionsUpdateReducer.fetching === true) {
        return {
            fetchingCollection: true,
            fetchedCollection: false
        }
    }
    else if (state.manageCollectionsUpdateReducer.fetched === true && state.manageCollectionsUpdateReducer.fetching === false) {

        const statePath = state.manageCollectionsUpdateReducer;
        const collection = state.manageCollectionsUpdateReducer.collection;
        return {
            fetchingCollection: false,
            fetchedCollection: true,
            collectionId: collection.collectionId,
            collectionName: collection.collectionName,
            collectionNameOld: statePath.collectionNameOld,
            collectionDescription: collection.collectionDescription,
            collectionDescriptionRaw: collection.collectionDescriptionRaw,
            collectionDescriptionRawOld: statePath.collectionDescriptionRaw,
            pictures: collection.picturesArray,
            picturesOld: statePath.picturesArrayOld,
            __html: statePath.__html,
            successUpdate: statePath.successUpdate,
            errors: statePath.errors,
            pictureNameError: statePath.pictureNameError,
            pictureLinkError: statePath.pictureLinkError,
            pictureDescriptionError: statePath.pictureDescriptionError,
            message: statePath.message
        }
    }
    else if (state.manageCollectionsUpdateReducer.fetched === false && state.manageCollectionsUpdateReducer.fetching === false) {
        return {
            message: state.manageCollectionsUpdateReducer.message,
            fetchingCollection: false,
            fetchedCollection: false
        }
    }
    else return {
            fetchingCollection: true,
            fetchedCollection: false,
        }
};

export default connect(mapStateToProps)(UpdateView)