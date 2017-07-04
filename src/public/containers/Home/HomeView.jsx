import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Home from '../../components/Home/Home.jsx';
import {Card, CardMedia, CardTitle} from 'material-ui';
import {connect} from 'react-redux';
import * as collectionsHomeViewActions from '../../actions/collectionsHomeViewActions.js';
import * as collectionsActions from '../../actions/Collections/manageCollectionsReadAllActions.js';
import * as collectionsBrowseActions from '../../actions/BrowseCollections/browseCollectionsReadAllActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';
import * as newsBrowseActions from '../../actions/BrowseNews/browseNewsReadAllActions.js';
import * as newsActionsHomeView from '../../actions/newsHomeViewActions.js';
import * as collectionNamesActions from '../../actions/AppBar/collectionNamesActions';
import * as readOneActionsCollections from '../../actions/Collections/manageCollectionsReadOneActions.js';
import * as readOneActionsNews from '../../actions/BrowseNews/browseNewsReadOneActions.js';

let createHandler = function (dispatch) {
    let updateCollectionsStore = function () {
        dispatch(collectionsHomeViewActions.getCollectionsHomeView());
        dispatch(collectionsActions.getAllCollections());
        dispatch(collectionsBrowseActions.getAllCollections());
        dispatch(collectionNamesActions.getAllCollections());
    };

    let updateNewsStore = function () {
        dispatch(newsBrowseActions.getAllNews());
        dispatch(newsActionsHomeView.getNews());
    };

    let removeShouldUpdateNews = function () {
        dispatch(shouldUpdateActions.removeShouldUpdateNews());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate());
    };

    let getCollection = function (collectionId) {
        dispatch(readOneActionsCollections.getCollection(collectionId))
    };

    let getNews = function (newsId) {
        dispatch(readOneActionsNews.getNews(newsId))
    };

    return {
        updateCollectionsStore,
        updateNewsStore,
        removeShouldUpdateNews,
        removeShouldUpdate,
        getCollection,
        getNews
    }
};

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
        this.state = {
            openCollections: false,
            openNews: false,
            collectionId: "",
            newsId: ""
        }
    }

    componentDidMount() {
        if (this.props.shouldUpdateCollections && this.props.shouldUpdateCollections.shouldUpdateCollections) {
            this.handlers.updateCollectionsStore();
            this.handlers.removeShouldUpdate();
        }
        if (this.props.shouldUpdateCollections && this.props.shouldUpdateCollections.shouldUpdateNews) {
            this.handlers.updateNewsStore();
            this.handlers.removeShouldUpdateNews();
        }
    };

    handleCloseCollections = () => {
        this.setState({openCollections: false});
    };

    onClickCollection = (collectionId) => {
        this.handlers.getCollection(collectionId);
        this.setState({
            collectionId: collectionId,
            openCollections: true
        })
    };

    handleCloseNews = () => {
        this.setState({openNews: false});
    };

    onClickNews = (newsId) => {
        this.handlers.getNews(newsId);
        this.setState({
            newsId: newsId,
            openNews: true
        })
    };

    render() {

        let news = this.props.news.news;

        let rowsNews;

        if (this.props.news && this.props.news.news) {

            rowsNews = Object.keys(news).map((key) => {
                key = parseInt(key);
                if (key < 3)
                    return (
                        <li key={key} style={{display: "flex", justifyContent: "center"}}
                        >
                            <Card style={{maxHeight: "auto", width: 800}}>
                                <CardMedia overlay={<CardTitle title={news[key].newsTitle}
                                                               subtitle={"by " + news[key].userName}/>}
                                           onClick={() => this.onClickNews(news[key]._id)}
                                           style={{cursor: "pointer"}}>
                                    <img src={news[key].newsCoverLink}/>
                                </CardMedia>
                            </Card>
                        </li>
                    )
            });
        }

        let collections = this.props.collections.collections;

        let rowsCollections1, rowsCollections3;

        if (this.props.collections.collections) {

            rowsCollections1 = Object.keys(collections).map((key) => {
                key = parseInt(key);
                if (key < 3)
                    return (
                        <li className="left-news"
                            onClick={() => this.onClickCollection(collections[key]._id)}
                            key={key}>
                            <Card>
                                <CardMedia
                                    overlay={<CardTitle title={collections[key].collectionName}
                                                        subtitle={"by " + collections[key].userName}/>}
                                    style={{minHeight: 300, cursor: "pointer"}}>
                                    <img src={collections[key].picturesArray[0].pictureLink}/>
                                </CardMedia>
                            </Card>
                        </li>
                    )
            });

            rowsCollections3 = Object.keys(collections).map((key) => {
                key = parseInt(key);
                if (key < 3)
                    return (
                        <li key={key}
                            onClick={() => this.onClickCollection(collections[key]._id)}>
                            <Card>
                                <CardMedia overlay={<CardTitle title={collections[key].collectionName}
                                                               subtitle={"by " + collections[key].userName}/>}
                                           style={{cursor: "pointer"}}>
                                    <img src={collections[key].picturesArray[0].pictureLink}/>
                                </CardMedia>
                            </Card>
                        </li>
                    )
            });

        }

        document.title = "4Art";
        // must work on displaying if there are no collections yet. simply use the fetchedCollections prop.

        return (
            <Home
                successCommentCollections={this.props.successCommentCollections}
                successCommentNews={this.props.news.successCommentNews}
                fetchingCollections={this.props.collections.fetchingCollections}
                fetchedCollections={this.props.collections.fetchedCollections}
                fetchedNews={this.props.news.fetchedNews}
                fetchingNews={this.props.news.fetchedNews}
                userName={this.props.credentials.userName}
                userId={this.props.credentials.userId}
                rowsNews={rowsNews}
                rowsCollections1={rowsCollections1}
                rowsCollections3={rowsCollections3}
                shouldUpdateCollections={this.props.shouldUpdateCollections.shouldUpdateCollections}
                openCollections={this.state.openCollections}
                handleCloseCollections={this.handleCloseCollections}
                collectionId={this.state.collectionId}
                openNews={this.state.openNews}
                handleCloseNews={this.handleCloseNews}
                newsId={this.state.newsId}
            />
        )
    }
}

HomeView.propTypes = {
    credentials: React.PropTypes.shape({
        userId: PropTypes.string,
        userName: PropTypes.string,
        profilePictureLink: PropTypes.string,
        firstName: PropTypes.string,
        guest: PropTypes.bool,
        finished: PropTypes.bool
    }),
    news: PropTypes.object,
    collections: React.PropTypes.shape({
        collections: PropTypes.array,
        fetchedCollections: PropTypes.bool,
        fetchingCollections: PropTypes.bool
    }),
    shouldUpdateCollections: React.PropTypes.shape({
        shouldUpdateCollections: PropTypes.bool,
        shouldUpdateNews: PropTypes.bool
    })
};

// Map credentials
const credentials = (state) => {
    if (state.userReducer.fetching === true) {
        return {
            guest: true,
            finished: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            firstName: response.firstName,
            guest: response.guest,
            finished: true
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true,
            finished: true
        };
};

// Map collections
const collections = (state) => {
    if (state.collectionsHomeViewReducer.fetching === true) {
        return {
            fetchingCollections: true
        }
    }
    else if (state.collectionsHomeViewReducer.fetched === true && state.collectionsHomeViewReducer.fetching === false) {
        const response = state.collectionsHomeViewReducer.collections.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false,
            comments: state.collectionsHomeViewReducer.comments,
            successCommentCollections: state.collectionsHomeViewReducer.successCommentCollections
        }
    }
    else if (state.collectionsHomeViewReducer.fetched === false && state.collectionsHomeViewReducer.fetching === false) {
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
    }
};

// Map news
const news = (state) => {
    if (state.newsHomeViewReducer.fetching === true) {
        return {
            fetchingNews: true,
            fetchedNews: false
        }
    }
    else if (state.newsHomeViewReducer.fetched === true && state.newsHomeViewReducer.fetching === false) {
        const statePath = state.newsHomeViewReducer;
        return {
            news: statePath.news,
            fetchedNews: true,
            fetchingNews: false,
            comments: statePath.comments,
            successCommentNews: statePath.successCommentNews
        }
    }
    else if (state.newsHomeViewReducer.fetched === false) {
        return {
            fetchedNews: false,
            fetchingNews: false
        }
    }
};

// Map shouldUpdate
const shouldUpdateFunction = (state) => {
    if (state.shouldUpdateCollectionsReducer) {
        const response = state.shouldUpdateCollectionsReducer;
        return {
            shouldUpdateCollections: response.shouldUpdate,
            shouldUpdateNews: response.shouldUpdateNews
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collections: collections(state),
    news: news(state),
    shouldUpdateCollections: shouldUpdateFunction(state)
});

export default connect(mapStateToProps)(HomeView);