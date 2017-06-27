import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw, convertFromRaw} from 'draft-js';
import {connect} from 'react-redux';
import Update from '../../../components/Admin/News/Main Components/Update.jsx';
import * as updateActions from '../../../actions/Admin/News/manageNewsUpdateActionsAdmin.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let getNews = function (newsId, textEditorState) {
        dispatch(updateActions.onMountUpdate(newsId, textEditorState))
    };

    let onNewsTitleChange = function (newsTitle) {
        dispatch(updateActions.onNewsTitleChange(newsTitle))
    };

    let onNewsDescriptionChange = function (newsDescription, __html) {
        dispatch(updateActions.onNewsDescriptionChange(newsDescription, __html))
    };

    let onNewsCoverLinkChange = function (newsCoverLink) {
        dispatch(updateActions.onNewsCoverLinkChange(newsCoverLink))
    };

    let onUpdate = function (newsId, newsTitle, newsDescriptionRaw, newsCoverLink, newsTitleOld, newsDescriptionRawOld, newsCoverLinkOld) {
        dispatch(updateActions.onUpdate(newsId, newsTitle, newsDescriptionRaw, newsCoverLink, newsTitleOld, newsDescriptionRawOld, newsCoverLinkOld))
    };

    return {
        getNews,
        onNewsTitleChange,
        onNewsDescriptionChange,
        onNewsCoverLinkChange,
        onUpdate
    }
};

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getNews(this.props.params._newsId, RichTextEditor.createEmptyValue())
    };

    onNewsTitleChange = (e) => {
        this.handlers.onNewsTitleChange(e.target.value);
    };

    onNewsDescriptionChange = (value) => {
        this.handlers.onNewsDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    onNewsCoverLinkChange = (e) => {
        this.handlers.onNewsCoverLinkChange(e.target.value);
    };

    getHTML = () => {
        let editorState = this.props.news.newsDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    onSave = () => {
        if (this.props.news.fetchedNews === true) {

            let editorState = this.props.news.newsDescription.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);

            const newsId = this.props.params._newsId;

            const newsTitle = this.props.news.newsTitle;
            const newsCoverLink = this.props.news.newsCoverLink;
            const newsDescriptionRaw = JSON.stringify(rawContentState);

            const newsTitleOld = this.props.news.newsTitleOld;
            const newsCoverLinkOld = this.props.news.newsCoverLinkOld;
            const newsDescriptionRawOld = this.props.news.newsDescriptionRawOld;

            this.handlers.onUpdate(newsId, newsTitle, newsDescriptionRaw, newsCoverLink, newsTitleOld, newsDescriptionRawOld, newsCoverLinkOld)
        }
    };

    render() {

        if (this.props.news.newsTitle)
            document.title = "Update News - " + this.props.news.newsTitle;
        else
            document.title = "404 not found";
        if (this.props.credentials.admin === true)
            return <Update
                adminId={this.props.params._id}
                userId={this.props.news.userId}
                onNewsTitleChange={this.onNewsTitleChange}
                newsTitle={this.props.news.newsTitle}
                onNewsDescriptionChange={this.onNewsDescriptionChange}
                newsDescriptionRaw={this.props.news.newsDescriptionRaw}
                newsDescription={this.props.news.newsDescription}
                onNewsCoverLinkChange={this.onNewsCoverLinkChange}
                newsCoverLink={this.props.news.newsCoverLink}
                fetchedNews={this.props.news.fetchedNews}
                fetchingNews={this.props.news.fetchingNews}
                getHTML={this.getHTML}
                __html={this.props.news.__html}
                errors={this.props.news.errors}
                message={this.props.news.message}
                onSave={this.onSave}
                successUpdate={this.props.news.successUpdate}
            />;
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

UpdateView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool
    }),
    news: React.PropTypes.shape({
        newsTitle: PropTypes.string,
        newsTitleOld: PropTypes.string,
        newsDescription: PropTypes.object,
        newsDescriptionRaw: PropTypes.string,
        newsDescriptionRawOld: PropTypes.string,
        newsCoverLink: PropTypes.string,
        newsCoverLinkOld: PropTypes.string,
        __html: PropTypes.string,
        fetchedCollection: PropTypes.bool,
        fetchingCollection: PropTypes.bool,
        errors: PropTypes.object,
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

const news = (state) => {
    if (state.manageNewsUpdateReducerAdmin.fetching === true) {
        return {
            fetchedNews: false,
            fetchingNews: true
        }
    }
    else if (state.manageNewsUpdateReducerAdmin.fetched === true && state.manageNewsUpdateReducerAdmin.fetching === false) {
        const statePath = state.manageNewsUpdateReducerAdmin;
        const news = state.manageNewsUpdateReducerAdmin.news;
        return {
            fetchingNews: false,
            fetchedNews: true,
            newsTitle: news.newsTitle,
            newsTitleOld: statePath.newsTitleOld,
            newsDescription: news.newsDescription,
            newsDescriptionRaw: news.newsDescriptionRaw,
            newsDescriptionRawOld: statePath.newsDescriptionRawOld,
            newsCoverLink: news.newsCoverLink,
            newsCoverLinkOld: statePath.newsCoverLinkOld,
            __html: statePath.__html,
            successUpdate: statePath.successUpdate,
            errors: statePath.errors,
            message: statePath.message
        }
    }
    else if (state.manageNewsUpdateReducerAdmin.fetched === false && state.manageNewsUpdateReducerAdmin.fetching === false) {
        return {
            message: state.manageNewsUpdateReducerAdmin.message,
            fetchingNews: false,
            fetchedNews: false
        }
    }
    else return {
            fetchedNews: false,
            fetchingNews: false
        }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    news: news(state)
});

export default connect(mapStateToProps)(UpdateView)