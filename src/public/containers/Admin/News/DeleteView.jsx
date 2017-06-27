import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Delete from '../../../components/Admin/News/Main Components/Delete.jsx';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';
import NotFoundView from "../../Error/NotFoundView.jsx";
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import {connect} from 'react-redux';
import * as deleteActions from '../../../actions/Admin/News/manageNewsDeleteActionsAdmin.js';

let createHandlers = function (dispatch) {
    let getNews = function (newsId) {
        dispatch(deleteActions.onDeleteInitiate(newsId))
    };

    let onDelete = function (newsId, newsTitle, newsDescriptionRaw, newsCoverLink) {
        dispatch(deleteActions.onDeleteExecute(newsId, newsTitle, newsDescriptionRaw, newsCoverLink))
    };

    return {
        getNews,
        onDelete
    }
};

class DeleteView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getNews(this.props.params._newsId);
    };

    onDelete = () => {

        if (this.props.news.response === true) {
            const newsId = this.props.params._newsId;
            const newsTitle = this.props.news.newsTitle;
            const newsDescriptionRaw = this.props.news.newsDescriptionRaw;
            const newsCoverLink = this.props.news.newsCoverLink;

            this.handlers.onDelete(newsId, newsTitle, newsDescriptionRaw, newsCoverLink);
        }
    };

    render() {
        if (this.props.news.newsTitle)
            document.title = "Delete - " + this.props.news.newsTitle;
        else
        document.title = "404 not found";
        if (this.props.credentials.admin === true)
            return <Delete
                    response={this.props.news.response}
                    adminId={this.props.params._id}
                    message={this.props.news.message}
                    onDelete={this.onDelete}/>;
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

DeleteView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
    news: PropTypes.object
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
    const statePath = state.manageNewsDeleteReducerAdmin;
    return {
        response: statePath.response,
        message: statePath.message,
        newsTitle: statePath.newsTitle,
        newsDescriptionRaw: statePath.newsDescriptionRaw,
        newsCoverLink: statePath.newsCoverLink
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    news: news(state)
});

export default connect(mapStateToProps)(DeleteView)