import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadAll from '../../components/BrowseNews/Main Components/ReadAll.jsx';
import * as newsActions from '../../actions/BrowseNews/browseNewsReadAllActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';

let createHandler = function (dispatch) {
    let updateNewsStore = function () {
        dispatch(newsActions.getAllNews());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdateNews())
    };

    let loadMore = function (loadAfter) {
        dispatch(newsActions.onLoadMore(loadAfter))
    };

    return {
        updateNewsStore,
        removeShouldUpdate,
        loadMore
    }
};

class ReadAllView extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    onScroll = () => {
        if (this.props.news.finished === false && document.title === "Browse news" && this.props.news.requesting === false) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 1000) {
                this.handlers.loadMore(this.props.news.loadAfter);
            }
        }
    };

    componentDidMount() {
        if (this.props.shouldUpdateNews && this.props.shouldUpdateNews.shouldUpdateNews) {
            this.handlers.updateNewsStore();
            this.handlers.removeShouldUpdate();
        }

        //the load more event listener
        window.addEventListener('scroll', this.onScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        document.title = "Browse news";
        return <ReadAll
            fetchedNews={this.props.news.fetchedNews}
            fetchingNews={this.props.news.fetchingNews}
            news={this.props.news.news}
            admin={this.props.credentials.admin}
            userId={this.props.credentials.userId}
        />;
    }
}

ReadAllView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        userId: PropTypes.string,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
    news: React.PropTypes.shape({
        news: PropTypes.array,
        fetchedNews: PropTypes.bool,
        fetchingNews: PropTypes.bool,
        loadAfter: PropTypes.number,
        finished: PropTypes.bool,
        requesting: PropTypes.bool
    }),
    shouldUpdateNews: React.PropTypes.shape({
        shouldUpdateNews: PropTypes.bool
    })
};

// Map credentials
const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null,
            userId: ""
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin,
            userId: state.userReducer.data.userId
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false,
            userId: ""
        }
};

// Map news
const news = (state) => {
    if (state.browseNewsReadAllReducer.fetching === true) {
        return {
            fetchingNews: true,
            fetchedNews: false
        }
    }
    else if (state.browseNewsReadAllReducer.news) {
        const response = state.browseNewsReadAllReducer.news.data;
        return {
            news: response.news,
            fetchedNews: true,
            fetchingNews: false,
            loadAfter: state.browseNewsReadAllReducer.loadAfter,
            finished: state.browseNewsReadAllReducer.finished,
            requesting: state.browseNewsReadAllReducer.requesting
        }
    }
    else if (state.browseNewsReadAllReducer.fetched === false) {
        return {
            fetchedNews: false,
            fetchingNews: false
        }
    }
};

// Map shouldUpdate - same reducer as collections as I couldn't bother to write more reducers
const shouldUpdateNews = (state) => {
    if (state.shouldUpdateCollectionsReducer) {
        const response = state.shouldUpdateCollectionsReducer;
        return {
            shouldUpdateNews: response.shouldUpdateNews
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    news: news(state),
    shouldUpdateNews: shouldUpdateNews(state)
});

export default connect(mapStateToProps)(ReadAllView)