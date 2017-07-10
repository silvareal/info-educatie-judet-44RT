import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw} from 'draft-js';
import {connect} from 'react-redux';
import Create from '../../../components/Admin/News/Main Components/Create.jsx'
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import * as createActions from '../../../actions/Admin/News/manageNewsCreateActionsAdmin.js';
import {smoothScroll} from '../../MainApp/functions.js';

let createHandler = function (dispatch) {
    let getInitialState = function (newsDescription) {
        dispatch(createActions.onCreateInitiate(newsDescription))
    };

    let onNewsTitleChange = function (newsTitle) {
        dispatch(createActions.onNewsTitleChange(newsTitle))
    };

    let onNewsDescriptionChange = function (newsDescription, __html) {
        dispatch(createActions.onNewsDescriptionChange(newsDescription, __html))
    };

    let onNewsCoverLinkChange = function (newsCoverLink) {
        dispatch(createActions.onNewsCoverLinkChange(newsCoverLink))
    };

    let onSave = function (newsTitle, newsDescriptionRaw, newsCoverLink) {
        dispatch(createActions.onSaveNews(newsTitle, newsDescriptionRaw, newsCoverLink))
    };

    return {
        getInitialState,
        onNewsTitleChange,
        onNewsDescriptionChange,
        onNewsCoverLinkChange,
        onSave
    }
};

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getInitialState(RichTextEditor.createEmptyValue());
    }

    onNewsTitleChange = (e) => {
        this.handlers.onNewsTitleChange(e.target.value);
    };

    onNewsCoverLinkChange = (e) => {
        this.handlers.onNewsCoverLinkChange(e.target.value);
    };

    onNewsDescriptionChange = (value) => {
        this.handlers.onNewsDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    getHTML = () => {
        let editorState = this.props.UIState.newsDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    onSave = () => {
        smoothScroll();
        let editorState = this.props.UIState.newsDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        const newsTitle = this.props.UIState.newsTitle;
        const newsDescriptionRaw = JSON.stringify(rawContentState);
        const newsCoverLink = this.props.UIState.newsCoverLink;

        this.handlers.onSave(newsTitle, newsDescriptionRaw, newsCoverLink);
    };

    render() {
        document.title = "Create an article - Admin Controlled";
        if (this.props.credentials.admin === true)
        {
            return (
                <Create
                    newsTitle={this.props.UIState.newsTitle}
                    onNewsTitleChange={this.onNewsTitleChange}
                    newsDescription={this.props.UIState.newsDescription}
                    onNewsDescriptionChange={this.onNewsDescriptionChange}
                    newsCoverLink={this.props.UIState.newsCoverLink}
                    onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                    getHTML={this.getHTML}
                    __html={this.props.UIState.__html}
                    onSave={this.onSave}
                    successCreation={this.props.UIState.successCreation}
                    errors={this.props.UIState.errors}
                    message={this.props.UIState.message}
                />)
        }
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

CreateView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
    UIState: React.PropTypes.shape({
        newsTitle: PropTypes.string,
        newsDescription: PropTypes.object,
        newsCoverLink: PropTypes.string,
        successCreation: PropTypes.bool,
        errors: PropTypes.object,
        message: PropTypes.string
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

const UIState = (state) => {
    if (state.manageNewsCreateReducerAdmin) {
        const statePath = state.manageNewsCreateReducerAdmin;
        return {
            newsTitle: statePath.newsTitle,
            newsDescription: statePath.newsDescription,
            newsCoverLink: statePath.newsCoverLink,
            __html: statePath.__html,
            successCreation: statePath.successCreation,
            errors: statePath.errors,
            message: statePath.message
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    UIState: UIState(state)
});

export default connect(mapStateToProps)(CreateView)