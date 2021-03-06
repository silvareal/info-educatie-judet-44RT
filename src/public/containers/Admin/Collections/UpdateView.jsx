import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';
import {connect} from 'react-redux';
import Update from '../../../components/Admin/Collections/Main Components/Update.jsx';
import * as updateActions from '../../../actions/Admin/Collections/manageCollectionsUpdateActionsAdmin.js';
import NotAuthorizedView from "../../Error/NotAuthorizedView.jsx";
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import {Chip} from 'material-ui';
import {smoothScroll} from '../../MainApp/functions.js';

let createHandler = function (dispatch) {
    let getCollection = function (collectionId, textEditorState) {
        dispatch(updateActions.onMountUpdate(collectionId, textEditorState))
    };

    let onUserIdChange = function (userId) {
        dispatch(updateActions.onUserIdChange(userId))
    };

    let onUserNameChange = function (userName) {
        dispatch(updateActions.onUserNameChange(userName))
    };

    let onProfilePictureLinkChange = function (profilePictureLink) {
        dispatch(updateActions.onProfilePictureLinkChange(profilePictureLink))
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

    let onUpdate = function (userId, userName, profilePictureLink, userIdOld, userNameOld, profilePictureLinkOld, collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld, tags, tagsOld) {
        dispatch(updateActions.onUpdate(userId, userName, profilePictureLink, userIdOld, userNameOld, profilePictureLinkOld, collectionId, collectionName, collectionDescriptionRaw, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld, tags, tagsOld))
    };

    return {
        getCollection,
        onUserIdChange,
        onUserNameChange,
        onProfilePictureLinkChange,
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

        this.state = {
            chipInput: '',
            chips: [],
            mappedChips: '',
            chipsOld: []
        }
    };

    componentDidMount() {
        this.handlers.getCollection(this.props.params._collectionId, RichTextEditor.createEmptyValue());
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.collection.tagsOld) {

            const mappedChips = nextProps.collection.tagsOld.map((data, i) => {
                return <Chip key={i}
                             onRequestDelete={() => this.onDeleteTag(data.value)}>
                    {data.value}
                </Chip>
            });

            if (this.state.chips.length === 0)
            this.setState({
                chips: nextProps.collection.tagsOld,
                chipsOld: nextProps.collection.tagsOld,
                mappedChips: mappedChips
            })
        }
    }

    onChipInputChange = (e) => {
        this.setState({
            chipInput: e.target.value
        })
    };

    onDeleteTag = (value) => {
        let currentChips = this.state.chips;
        let chipToDelete;
        if (currentChips) {
            for (let i = 0; i < currentChips.length; i++)
                if (currentChips[i].value === value) {
                    chipToDelete = i;
                    break;
                }
        }
        currentChips.splice(chipToDelete, 1);
        const mappedChips = currentChips.map((data, j) => {
            return <Chip key={j}
                         onRequestDelete={() => this.onDeleteTag(data.value)}
                         style={{cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}
                         labelStyle={{maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                {data.value}
            </Chip>;
        });
        this.setState({
            chips: currentChips,
            mappedChips: mappedChips
        })
    };

    onAddTag = (e) => {
        if (e.key === 'Enter') {
            let newChips = this.state.chips.concat({value: e.target.value});
            const mappedChips = newChips.map((data, i) => {
                return <Chip key={i}
                             onRequestDelete={() => this.onDeleteTag(data.value)}
                             style={{cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}
                             labelStyle={{maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {data.value}
                </Chip>;
            });
            this.setState({
                chipInput: '',
                mappedChips: mappedChips,
                chips: newChips
            })
        }
    };

    onUserIdChange = (e) => {
        this.handles.onUserIdChange(e.target.value)
    };

    onUserNameChange = (e) => {
        this.handlers.onUserNameChange(e.target.value)
    };

    onProfilePictureLinkChange = (e) => {
        this.handlers.onProfilePictureLinkChange(e.target.value)
    };

    onCollectionNameChange = (e) => {
        this.handlers.onCollectionNameChange(e.target.value)
    };

    onCollectionDescriptionChange = (value) => {
        this.handlers.onCollectionDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    getHTML = () => {
        let editorState = this.props.collection.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.props.collection.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.props.collection.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesDescriptionChange = (i) => (value) => {
        const newPictures = this.props.collection.pictures.map((picture, j) => {
            if (i !== j) return picture;

            let editorState = value.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);
            return {...picture, pictureDescription: value, pictureDescriptionRaw: JSON.stringify(rawContentState)};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handleAddPictures = (i) => () => {
        this.handlers.onAddInputField(this.props.collection.pictures, RichTextEditor.createEmptyValue());
    };

    handleRemovePictures = (i) => () => {
        this.handlers.onRemoveInputField(this.props.collection.pictures, i);
    };

    onSave = () => {

        if (this.props.collection.fetchedCollection === true) {
            smoothScroll();
            for (let i = 0; i < this.props.collection.pictures.length; i++) {
                const newPictures = this.props.collection.pictures.map((picture, j) => {
                    if (i !== j) return picture;

                    let editorState = this.props.collection.pictures[i].pictureDescription.getEditorState();
                    let contentState = editorState.getCurrentContent();
                    let rawContentState = window.rawContentState = convertToRaw(contentState);
                    return {...picture, pictureDescriptionRaw: JSON.stringify(rawContentState)};
                });
                this.handlers.onPicturesArrayChange(newPictures);
            }

            let editorState = this.props.collection.collectionDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);

            const userId = this.props.collection.userId;
            const userIdOld = this.props.collection.userIdOld;
            const userName = this.props.collection.userName;
            const userNameOld = this.props.collection.userNameOld;
            const profilePictureLink = this.props.collection.profilePictureLink;
            const profilePictureLinkOld = this.props.collection.profilePictureLinkOld;
            const collectionId = this.props.params._collectionId;
            const collectionName = this.props.collection.collectionName;
            const collectionNameOld = this.props.collection.collectionNameOld;
            const collectionDescription = JSON.stringify(rawContentState);
            const collectionDescriptionRawOld = this.props.collection.collectionDescriptionRawOld;
            const pictures = JSON.stringify(this.props.collection.pictures);
            const picturesOld = JSON.stringify(this.props.collection.picturesOld);

            let tags, tagsOld;
            if (this.state.chips)
            tags = JSON.stringify(this.state.chips);
            else tags = JSON.stringify([]);

            if (this.props.collection.tags)
                tagsOld = JSON.stringify(this.props.collection.tagsOld);
            else tagsOld = JSON.stringify([]);

            this.handlers.onUpdate(userId, userName, profilePictureLink, userIdOld, userNameOld, profilePictureLinkOld, collectionId, collectionName, collectionDescription, pictures, collectionNameOld, collectionDescriptionRawOld, picturesOld, tags, tagsOld);
        }
    };

    render() {
        if (this.props.collection.collectionName)
            document.title = "Update - " + this.props.collection.collectionName;
        else
            document.title = "404 not found";
        if (this.props.credentials.admin === true)
            return (
                <Update
                    adminId={this.props.params._id}
                    userId={this.props.collection.userId}
                    onUserIdChange={this.onUserIdChange}
                    userName={this.props.collection.userName}
                    onUserNameChange={this.onUserNameChange}
                    profilePictureLink={this.props.collection.profilePictureLink}
                    onProfilePictureLinkChange={this.onProfilePictureLinkChange}
                    fetchedCollection={this.props.collection.fetchedCollection}
                    fetchingCollection={this.props.collection.fetchingCollection}
                    collectionId={this.props.collection.collectionId}
                    collectionName={this.props.collection.collectionName}
                    onCollectionNameChange={this.onCollectionNameChange}
                    collectionDescription={this.props.collection.collectionDescription}
                    onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                    collectionDescriptionRaw={this.props.collection.collectionDescriptionRaw}
                    getHTML={this.getHTML}
                    __html={this.props.collection.__html}
                    message={this.props.collection.message}
                    errors={this.props.collection.errors}
                    pictureNameError={this.props.collection.pictureNameError}
                    pictureDescriptionError={this.props.collection.pictureDescriptionError}
                    pictureLinkError={this.props.collection.pictureLinkError}
                    pictures={this.props.collection.pictures}
                    handlePicturesNameChange={this.handlePicturesNameChange}
                    handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                    handlePicturesLinkChange={this.handlePicturesLinkChange}
                    handleAddPictures={this.handleAddPictures}
                    handleRemovePictures={this.handleRemovePictures}
                    onSave={this.onSave}
                    successUpdate={this.props.collection.successUpdate}
                    chipInput={this.state.chipInput}
                    chips={this.state.chips}
                    mappedChips={this.state.mappedChips}
                    onChipInputChange={this.onChipInputChange}
                    onAddTag={this.onAddTag}
                    onDeleteTag={this.onDeleteTag}
                />
            );
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

UpdateView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool
    }),
    collection: React.PropTypes.shape({
        userId: PropTypes.string,
        userName: PropTypes.string,
        profilePictureLink: PropTypes.string,
        userIdOld: PropTypes.string,
        userNameOld: PropTypes.string,
        profilePictureLinkOld: PropTypes.string,
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
    })
};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

const collection = (state) => {
    if (state.manageCollectionsUpdateReducerAdmin.fetching === true) {
        return {
            fetchingCollection: true,
            fetchedCollection: false
        }
    }
    else if (state.manageCollectionsUpdateReducerAdmin.fetched === true && state.manageCollectionsUpdateReducerAdmin.fetching === false) {
        const statePath = state.manageCollectionsUpdateReducerAdmin;
        const collection = state.manageCollectionsUpdateReducerAdmin.collection;
        return {
            fetchingCollection: false,
            fetchedCollection: true,
            userId: collection.userId,
            userIdOld: collection.userIdOld,
            userName: collection.userName,
            userNameOld: collection.userNameOld,
            profilePictureLink: collection.profilePictureLink,
            profilePictureLinkOld: collection.profilePictureLinkOld,
            collectionId: collection.collectionId,
            collectionName: collection.collectionName,
            collectionNameOld: statePath.collectionNameOld,
            collectionDescription: collection.collectionDescription,
            collectionDescriptionRaw: collection.collectionDescriptionRaw,
            collectionDescriptionRawOld: statePath.collectionDescriptionRawOld,
            pictures: collection.picturesArray,
            picturesOld: statePath.picturesArrayOld,
            __html: statePath.__html,
            successUpdate: statePath.successUpdate,
            errors: statePath.errors,
            pictureNameError: statePath.pictureNameError,
            pictureLinkError: statePath.pictureLinkError,
            pictureDescriptionError: statePath.pictureDescriptionError,
            message: statePath.message,
            tagsOld: statePath.collection.tags
        }
    }
    else if (state.manageCollectionsUpdateReducerAdmin.fetched === false && state.manageCollectionsUpdateReducerAdmin.fetching === false) {
        return {
            message: state.manageCollectionsUpdateReducerAdmin.message,
            fetchingCollection: false,
            fetchedCollection: false
        }
    }
    else return {
            fetchingCollection: true,
            fetchedCollection: false,
        }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collection: collection(state)
});

export default connect(mapStateToProps)(UpdateView)