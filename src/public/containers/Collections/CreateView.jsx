import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';
import {connect} from 'react-redux';
import * as createActions from '../../actions/Collections/manageCollectionsCreateActions.js'
import Create from '../../components/Collections/Main Components/Create.jsx'
import LoadingIndicator from "../../components/Loading Indicator/LoadingIndicator.jsx";
import {Chip} from 'material-ui';

let createHandler = function (dispatch) {
    let getInitialState = function (collectionDescription, pictureDescription) {
        dispatch(createActions.onCreateInitiate(collectionDescription, pictureDescription))
    };

    let onCollectionNameChange = function (collectionName) {
        dispatch(createActions.onCollectionNameChange(collectionName))
    };

    let onCollectionDescriptionChange = function (collectionDescription, __html) {
        dispatch(createActions.onCollectionDescriptionChange(collectionDescription, __html))
    };

    let onPicturesArrayChange = function (pictures) {
        dispatch(createActions.onPicturesArrayChange(pictures))
    };

    let onAddInputField = function (pictures, pictureDescription) {
        dispatch(createActions.onAddInputField(pictures, pictureDescription))
    };

    let onRemoveInputField = function (pictures, index) {
        dispatch(createActions.onRemoveInputField(pictures, index))
    };

    let onSave = function (collectionName, collectionDescriptionRaw, pictures, tags) {
        dispatch(createActions.onSaveCollection(collectionName, collectionDescriptionRaw, pictures, tags))
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

        this.state = {
            chipInput: '',
            chips: [],
            mappedChips: '',
            localCollectionName: '',
            localCollectionDescription: '',
            localPictures: '',
            localTags: '',
            localMappedTags: '',
            canResume: false
        }
    };

    componentDidMount() {
        this.setState({
            localCollectionName: localStorage.getItem("collectionName"),
            localCollectionDescription: localStorage.getItem("collectionDescription"),
            localPictures: localStorage.getItem("pictures"),
            localTags: localStorage.getItem("tags")
        });

        if (localStorage.getItem("collectionDescription") || localStorage.getItem("collectionName") || localStorage.getItem("pictures"))
            this.setState({
                canResume: true
            });

        this.handlers.getInitialState(RichTextEditor.createEmptyValue(), RichTextEditor.createEmptyValue());
    };

    onResumeCreate = () => {

        if (this.state.localCollectionName)
            this.handlers.onCollectionNameChange(this.state.localCollectionName);

        if (this.state.localCollectionDescription) {

            let contentState = convertFromRaw(JSON.parse(this.state.localCollectionDescription));
            let html = stateToHTML(contentState);

            let collectionDescription = RichTextEditor.createEmptyValue();
            collectionDescription = collectionDescription.setContentFromString(html, 'html');

            this.handlers.onCollectionDescriptionChange(collectionDescription, stateToHTML(collectionDescription.getEditorState().getCurrentContent()));
        }

        if (this.state.localPictures) {
            const localPictures = JSON.parse(this.state.localPictures);

            const newPictures = localPictures.map((picture, i) => {

                let contentState = convertFromRaw(JSON.parse(picture.pictureDescriptionRaw));
                let html = stateToHTML(contentState);

                let pictureDescription = RichTextEditor.createEmptyValue();
                pictureDescription = pictureDescription.setContentFromString(html, 'html');

                return {...picture, pictureDescription: pictureDescription}

            });

            this.handlers.onPicturesArrayChange(newPictures);
        }

        if (this.state.localTags) {
            const localTags = JSON.parse(this.state.localTags);

            const mappedChips = localTags.map((data, i) => {
                return <Chip key={i}
                             onRequestDelete={() => this.onDeleteTag(data.value)}>
                    {data.value}
                </Chip>
            });

            this.setState({
                mappedChips: mappedChips,
                tags: JSON.parse(this.state.localTags)
            })
        }

        this.setState({
            canResume: false
        });
    };

    onCollectionNameChange = (e) => {
        const value = e.target.value;
        this.handlers.onCollectionNameChange(value);
        localStorage.setItem("collectionName", value);
    };

    onCollectionDescriptionChange = (value) => {
        const val = value;
        this.handlers.onCollectionDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
        localStorage.setItem("collectionDescription", JSON.stringify(convertToRaw(val.getEditorState().getCurrentContent())));
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
        localStorage.setItem("pictures", JSON.stringify(newPictures));
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
        localStorage.setItem("pictures", JSON.stringify(newPictures));
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
        localStorage.setItem("pictures", JSON.stringify(newPictures));
    };

    handleAddPictures = (i) => () => {
        this.handlers.onAddInputField(this.props.UIState.pictures, RichTextEditor.createEmptyValue());
    };

    handleRemovePictures = (i) => () => {
        this.handlers.onRemoveInputField(this.props.UIState.pictures, i);
    };

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
            >
                {data.value}
            </Chip>;
        });
        this.setState({
            chips: currentChips,
            mappedChips: mappedChips
        });
        localStorage.setItem("tags", JSON.stringify(currentChips));
    };

    onAddTag = (e) => {
        if (e.key === 'Enter') {

            let newChips = this.state.chips.concat({value: e.target.value});
            const mappedChips = newChips.map((data, i) => {
                return <Chip key={i}
                             onRequestDelete={() => this.onDeleteTag(data.value)}
                >
                    {data.value}
                </Chip>;
            });
            this.setState({
                chipInput: '',
                mappedChips: mappedChips,
                chips: newChips
            });
            localStorage.setItem("tags", JSON.stringify(newChips));
        }
    };

    onSave = () => {
        // Convert editorState to contentState and then "HTML-ize" it
        let editorState = this.props.UIState.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        const collectionName = this.props.UIState.collectionName;
        const collectionDescriptionRaw = JSON.stringify(rawContentState);
        const pictures = JSON.stringify(this.props.UIState.pictures);

        const tags = JSON.stringify(this.state.chips);

        this.handlers.onSave(collectionName, collectionDescriptionRaw, pictures, tags);

        this.setState({
            canResume: false
        })
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
                    chipInput={this.state.chipInput}
                    chips={this.state.chips}
                    mappedChips={this.state.mappedChips}
                    onChipInputChange={this.onChipInputChange}
                    onAddTag={this.onAddTag}
                    onDeleteTag={this.onDeleteTag}
                    canResume={this.state.canResume}
                    onResumeCreate={this.onResumeCreate}
                />);
        else return <LoadingIndicator/>
    }
}

CreateView.propTypes = {
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
    if (state.userReducer.fetching === true)
        return {
            guest: false,
            finished: false
        };
    else if (state.userReducer.data)
        return {
            guest: state.userReducer.data.guest,
            finished: true
        };
    else if (state.userReducer.fetched === false)
        return {
            guest: state.userReducer.data.guest,
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