import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Home from '../../components/Home/Home.jsx';
import {Card, CardMedia, CardTitle, CardActions, TextField, ListItem, List, Avatar} from 'material-ui';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import {connect} from 'react-redux';
import * as collectionsHomeViewActions from '../../actions/collectionsHomeViewActions.js';
import * as collectionsActions from '../../actions/Collections/manageCollectionsReadAllActions.js';
import * as collectionsBrowseActions from '../../actions/BrowseCollections/browseCollectionsReadAllActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';
import * as newsBrowseActions from '../../actions/BrowseNews/browseNewsReadAllActions.js';
import * as newsActionsHomeView from '../../actions/newsHomeViewActions.js';
import * as collectionNamesActions from '../../actions/AppBar/collectionNamesActions';

let socket = io.connect();

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

    let onCommentNewsChange = function (comment, newsId,  key) {
        dispatch(newsActionsHomeView.onCommentChange(comment, newsId, key))
    };

    let onCommentCollectionsChange = function (comment, collectionId, key) {
        dispatch(collectionsHomeViewActions.onCommentChange(comment, collectionId, key))
    };

    let onSaveCommentNews = function (comment, newsId, key) {
        dispatch(newsActionsHomeView.onSave(comment, newsId, key))
    };

    let onSaveCommentCollections = function (comment, collectionId, key) {
        dispatch(collectionsHomeViewActions.onSave(comment, collectionId, key))
    };

    let removeShouldUpdateNews = function () {
        dispatch(shouldUpdateActions.removeShouldUpdateNews());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate());
    };

    return {
        updateCollectionsStore,
        updateNewsStore,
        onCommentNewsChange,
        onCommentCollectionsChange,
        onSaveCommentNews,
        onSaveCommentCollections,
        removeShouldUpdateNews,
        removeShouldUpdate
    }
};

class HomeView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
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

    onCommentNewsChange = (i, newsId) => (e) => {
        this.handlers.onCommentNewsChange(e.target.value, newsId, i);
    };

    onCommentCollectionsChange = (i, collectionId) => (e) => {
        this.handlers.onCommentCollectionsChange(e.target.value, collectionId, i)
    };

    onSaveNewsComments = (i) => () => {
        this.handlers.onSaveCommentNews(this.props.news.comments[i].value, this.props.news.comments[i].newsId, i);

        socket.emit('send:commentNews', {
            comment: this.props.news.comments[i].value,
            newsId: this.props.news.comments[i].newsId,
            userName: this.props.credentials.userName,
            firstName: this.props.credentials.firstName,
            userId: this.props.credentials.userId,
            profilePictureLink: this.props.credentials.profilePictureLink
        });
    };

    onSaveCollectionsComments = (i) => ()  => {
        this.handlers.onSaveCommentCollections(this.props.collections.comments[i].value, this.props.collections.comments[i].collectionId, i);

        socket.emit('send:comment', {
            comment: this.props.news.comments[i].value,
            newsId: this.props.news.comments[i].newsId,
            userName: this.props.credentials.userName,
            firstName: this.props.credentials.firstName,
            userId: this.props.credentials.userId,
            profilePictureLink: this.props.credentials.profilePictureLink
        });
    };

    render() {

        let news = this.props.news.news;

        let rowsNews1, rowsNews2, rowsNews3;

        if (this.props.news && this.props.news.news) {

            rowsNews1 = Object.keys(news).map((key) => {
                key = parseInt(key);
                if (key % 2 === 0)
                    return (
                        <li className="left-news"
                            key={key}
                        >
                            <Card>
                                <Link to={`/news/${news[key]._id}`}
                                      target="_blank">
                                    <CardMedia overlay={<CardTitle title={news[key].newsTitle}/>}>
                                        <img src={news[key].newsCoverLink}/>
                                    </CardMedia>
                                </Link>
                                {this.props.credentials.finished === true && this.props.credentials.guest === false && this.props.credentials.profilePictureLink ?
                                    <CardActions>
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <div className="avatar-cells-home">
                                                <ListItem disabled={true}
                                                          leftAvatar={
                                                              <Link to={`/profile/${this.props.credentials.userName}`}>
                                                                  <Avatar
                                                                      src={this.props.credentials.profilePictureLink}/>
                                                              </Link>}
                                                          rightIcon={<ContentSend onClick={this.onSaveNewsComments(key)}
                                                                                  hoverColor="#f3989b"
                                                                                  color="#eb7077"/>}
                                                          style={{paddingTop: 0, paddingBottom: 0}}
                                                >
                                                    <TextField name="commentNewsLeft"
                                                               value={this.props.news.comments[key].value}
                                                               onChange={this.onCommentNewsChange(key, news[key]._id)}
                                                               style={{width: "100%"}}
                                                               multiLine={true}
                                                               rowsMax={2}
                                                    />
                                                </ListItem>
                                            </div>
                                        </List>
                                    </CardActions>
                                    : null
                                }

                                {this.props.credentials.guest === false && this.props.credentials.finished === true && !this.props.credentials.profilePictureLink  ?
                                    <CardActions>
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <div className="avatar-cells-home">
                                                <ListItem disabled={true}
                                                          leftIcon={
                                                              <Link to={`/profile/${this.props.credentials.userName}`}>
                                                                  <ActionAccountCircle/>
                                                              </Link>}
                                                          rightIcon={<ContentSend onClick={this.onSaveNewsComments(key)}
                                                                                  hoverColor="#f3989b"
                                                                                  color="#eb7077"/>}
                                                          style={{paddingTop: 0, paddingBottom: 0}}
                                                >
                                                    <TextField name="commentNewsLeft"
                                                               value={this.props.news.comments[key].value}
                                                               onChange={this.onCommentNewsChange(key, news[key]._id)}
                                                               style={{width: "100%"}}
                                                               multiLine={true}
                                                               rowsMax={2}
                                                    />
                                                </ListItem>
                                            </div>
                                        </List>
                                    </CardActions>
                                    : null
                                }

                            </Card>
                        </li>
                    )
            });

            rowsNews2 = Object.keys(news).map((key) => {
                key = parseInt(key);
                if (key % 2 === 1)
                    return (
                        <li className="right-news"
                            key={key}
                        >
                            <Card>
                                <Link to={`/news/${news[key]._id}`}
                                      target="_blank">
                                    <CardMedia overlay={<CardTitle title={news[key].newsTitle}/>}>
                                        <img src={news[key].newsCoverLink}/>
                                    </CardMedia>
                                </Link>
                                {this.props.credentials.finished === true && this.props.credentials.guest === false && this.props.credentials.profilePictureLink ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftAvatar={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <Avatar
                                                                  src={this.props.credentials.profilePictureLink}/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveNewsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsRight"
                                                           value={this.props.news.comments[key].value}
                                                           onChange={this.onCommentNewsChange(key, news[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions>
                                    : null}

                                {!this.props.credentials.profilePictureLink && this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftIcon={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <ActionAccountCircle/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveNewsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsRight"
                                                           value={this.props.news.comments[key].value}
                                                           onChange={this.onCommentNewsChange(key, news[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions>
                                    : null
                                }
                            </Card>
                        </li>
                    )
            });
            //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {}

            rowsNews3 = Object.keys(news).map((key) => {
                key = parseInt(key);
                return (
                    <li key={key}
                    >
                        <Card>
                            <Link to={`/news/${news[key]._id}`}
                                  target="_blank">
                                <CardMedia overlay={<CardTitle title={news[key].newsTitle}/>}>
                                    <img src={news[key].newsCoverLink}/>
                                </CardMedia>
                            </Link>
                            {this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                <CardActions>
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  rightIcon={<ContentSend onClick={this.onSaveNewsComments(key)}
                                                                          hoverColor="#f3989b"
                                                                          color="#eb7077"/>}
                                                  style={{paddingTop: 0, paddingBottom: 0}}
                                        >
                                            <TextField name="commentNewsMobile"
                                                       value={this.props.news.comments[key].value}
                                                       onChange={this.onCommentNewsChange(key, news[key]._id)}
                                                       style={{width: "100%"}}
                                                       multiLine={true}
                                            />
                                        </ListItem>
                                    </List>
                                </CardActions>
                                : null}
                        </Card>
                    </li>
                )
            });
        }

        //----------------------

        let collections = this.props.collections.collections;

        let rowsCollections1, rowsCollections2, rowsCollections3;

        if (this.props.collections.collections) {

            rowsCollections1 = Object.keys(collections).map((key) => {
                key = parseInt(key);
                if (key % 2 === 0)
                    return (
                        <li className="left-news"
                            key={key}
                        >
                            <Card>
                                <Link to={`/collections/${collections[key]._id}`}
                                    target="_blank"
                                >
                                    <CardMedia overlay={<CardTitle title={collections[key].collectionName}/>}>
                                        <img src={collections[key].picturesArray[0].pictureLink}/>
                                    </CardMedia>
                                </Link>
                                {this.props.credentials.finished === true && this.props.credentials.guest === false && this.props.credentials.profilePictureLink ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftAvatar={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <Avatar
                                                                  src={this.props.credentials.profilePictureLink}/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveCollectionsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.props.collections.comments[key].value}
                                                           onChange={this.onCommentCollectionsChange(key, collections[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions>
                                    : null}

                                {!this.props.credentials.profilePictureLink && this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftIcon={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <ActionAccountCircle/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveCollectionsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.props.collections.comments[key].value}
                                                           onChange={this.onCommentCollectionsChange(key, collections[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions> : null
                                }
                            </Card>
                        </li>
                    )
            });

            rowsCollections2 = Object.keys(collections).map((key) => {
                key = parseInt(key);
                if (key % 2 === 1)
                    return (
                        <li className="right-news"
                            key={key}
                        >
                            <Card>
                                <Link to={`/collections/${collections[key]._id}`}
                                      target="_blank">
                                    <CardMedia overlay={<CardTitle title={collections[key].collectionName}/>}>
                                        <img src={collections[key].picturesArray[0].pictureLink}/>
                                    </CardMedia>
                                </Link>
                                {this.props.credentials.finished === true && this.props.credentials.guest === false && this.props.credentials.profilePictureLink ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftAvatar={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <Avatar
                                                                  src={this.props.credentials.profilePictureLink}/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveCollectionsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.props.collections.comments[key].value}
                                                           onChange={this.onCommentCollectionsChange(key, collections[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions>
                                    : null}

                                {!this.props.credentials.profilePictureLink && this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                    <CardActions className="avatar-cells-home">
                                        <List style={{paddingTop: 0, paddingBottom: 0}}>
                                            <ListItem disabled={true}
                                                      leftIcon={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <ActionAccountCircle/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSaveCollectionsComments(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.props.collections.comments[key].value}
                                                           onChange={this.onCommentCollectionsChange(key, collections[key]._id)}
                                                           style={{width: "100%"}}
                                                           multiLine={true}
                                                           rowsMax={2}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardActions> : null
                                }
                            </Card>
                        </li>
                    )
            });

            rowsCollections3 = Object.keys(collections).map((key) => {
                key = parseInt(key);
                return (
                    <li key={key}
                    >
                        <Card>
                            <Link to={`/collections/${collections[key]._id}`}
                                  target="_blank">
                                <CardMedia overlay={<CardTitle title={collections[key].collectionName}/>}>
                                    <img src={collections[key].picturesArray[0].pictureLink}/>
                                </CardMedia>
                            </Link>
                            {this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  rightIcon={<ContentSend onClick={this.onSaveCollectionsComments(key)}
                                                                          hoverColor="#f3989b"
                                                                          color="#eb7077"/>}
                                                  style={{paddingTop: 0, paddingBottom: 0}}
                                        >
                                            <TextField name="commentNewsLeft"
                                                       value={this.props.collections.comments[key].value}
                                                       onChange={this.onCommentCollectionsChange(key, collections[key]._id)}
                                                       style={{width: "100%"}}
                                                       multiLine={true}
                                            />
                                        </ListItem>
                                    </List>
                                </CardActions>
                                : null}
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
                rowsNews1={rowsNews1}
                rowsNews2={rowsNews2}
                rowsNews3={rowsNews3}
                rowsCollections1={rowsCollections1}
                rowsCollections2={rowsCollections2}
                rowsCollections3={rowsCollections3}
                shouldUpdateCollections={this.props.shouldUpdateCollections.shouldUpdateCollections}
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