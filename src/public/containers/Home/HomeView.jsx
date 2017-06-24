import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Home from '../../components/Home/Main Components/Home.jsx';
import Auth from '../../modules/Auth.js'
import {Card, CardMedia, CardTitle, CardActions, TextField, ListItem, List, Avatar} from 'material-ui';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import {connect} from 'react-redux';
import * as collectionsHomeViewActions from '../../actions/collectionsHomeViewActions.js';
import * as collectionsActions from '../../actions/Collections/manageCollectionsReadAllActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';
let socket = io.connect();

let createHandler = function (dispatch) {
    let updateCollectionsStore = function () {
        dispatch(collectionsHomeViewActions.getCollectionsHomeView());
        dispatch(collectionsActions.getAllCollections());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate());
    };

    return {
        updateCollectionsStore,
        removeShouldUpdate
    }
};

class HomeView extends Component {
    constructor(props) {
        super(props);

        this.handlers = createHandler(this.props.dispatch);

        this.state = {
            news: [],
            collectionId: "",
            newsId: "",
            fetchedNews: false,
            profilePictureLink: '',
            //Due to concat not working or myself not using it correctly, I've manually set the initial state of this array
            comments: [
                {value: ''}, {value: ''}, {value: ''}, {value: ''},
                {value: ''}, {value: ''}, {value: ''}, {value: ''},
            ]
        };
    }

    getNews = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/news');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    news: xhr.response.news,
                    fetchedNews: true
                })
            }
        });
        xhr.send();
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();
        this.getNews();
        if (this.props.shouldUpdateCollections && this.props.shouldUpdateCollections.shouldUpdateCollections) {
            this.handlers.updateCollectionsStore();
            this.handlers.removeShouldUpdate();
        }
    };

    onCommentChange = (i) => (e) => {
        const newComments = this.state.comments.map((comment, j) => {
            if (parseInt(i) !== j) return comment;
            return {...comment, value: e.target.value}
        });
        this.setState({comments: newComments})
    };

    getCollectionId = (i) => () => {
        this.setState({
            collectionId: this.props.collections.collections[i]._id
        })
    };

    getNewsId = (i) => () => {
        this.setState({
            newsId: this.state.news[i]._id
        })
    };

    onSave = (i) => () => {

        if (i >= 4) {
            const collectionId = encodeURIComponent(this.state.collectionId);
            const userName = encodeURIComponent(this.props.credentials.userName);
            const firstName = encodeURIComponent(this.props.firstName);
            const comment = encodeURIComponent(this.state.comments[i].value);
            const profilePictureLink = encodeURIComponent(this.props.credentials.profilePictureLink);

            const formData = `profilePictureLink=${profilePictureLink}&collectionId=${collectionId}&userName=${userName}&firstName=${firstName}&comment=${comment}`;

            const xhr = new XMLHttpRequest();
            xhr.open("post", "/comment/postCommentCollections");
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    this.setState({
                        commentAdded: xhr.response.commentAdded
                    });

                    const newComments = this.state.comments.map((comment, j) => {
                        if (i !== j) return comment;
                        return {...comment, value: ""}
                    });
                    this.setState({comments: newComments})

                }
                else {
                    this.setState({
                        commentAdded: false
                    })
                }
            });

            xhr.send(formData);

            socket.emit('send:comment', {
                comment: this.state.comments[i].value,
                collectionId: this.state.collectionId,
                userName: this.props.credentials.userName,
                firstName: this.props.firstName,
                userId: this.props.credentials.userId,
                profilePictureLink: this.props.credentials.profilePictureLink
            });
        }
        else {
            const newsId = encodeURIComponent(this.state.newsId);
            const userName = encodeURIComponent(this.props.credentials.userName);
            const firstName = encodeURIComponent(this.props.firstName);
            const comment = encodeURIComponent(this.state.comments[i].value);
            const profilePictureLink = encodeURIComponent(this.props.credentials.profilePictureLink);

            const formData = `profilePictureLink=${profilePictureLink}&newsId=${newsId}&userName=${userName}&firstName=${firstName}&comment=${comment}`;

            const xhr = new XMLHttpRequest();
            xhr.open("post", "/comment/postCommentNews");
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    this.setState({
                        commentAdded: xhr.response.commentAdded
                    });

                    const newComments = this.state.comments.map((comment, j) => {
                        if (i !== j) return comment;
                        return {...comment, value: ""}
                    });
                    this.setState({comments: newComments})

                }
                else {
                    this.setState({
                        commentAdded: false
                    })
                }
            });

            xhr.send(formData);

            socket.emit('send:commentNews', {
                comment: this.state.comments[i].value,
                newsId: this.state.newsId,
                userName: this.props.credentials.userName,
                firstName: this.props.firstName,
                userId: this.props.credentials.userId,
                profilePictureLink: this.props.credentials.profilePictureLink
            });
        }
    };

    render() {

        let news = this.state.news;

        let rowsNews1, rowsNews2, rowsNews3;

        rowsNews1 = Object.keys(news).map((key) => {
            key = parseInt(key);
            if (key % 2 === 0)
                return (
                    <li className="left-news"
                        key={key}
                        onMouseEnter={this.getNewsId(key)}
                    >
                        <Card>
                            <Link to={`/news/${news[key]._id}`}>
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
                                                      rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key].value}
                                                           onChange={this.onCommentChange(key)}
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

                            {!this.props.credentials.profilePictureLink && this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                <CardActions>
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <div className="avatar-cells-home">
                                            <ListItem disabled={true}
                                                      leftIcon={
                                                          <Link to={`/profile/${this.props.credentials.userName}`}>
                                                              <ActionAccountCircle/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key].value}
                                                           onChange={this.onCommentChange(key)}
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
                        onMouseEnter={this.getNewsId(key)}
                    >
                        <Card>
                            <Link to={`/news/${news[key]._id}`}>
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
                                                  rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                          hoverColor="#f3989b"
                                                                          color="#eb7077"/>}
                                                  style={{paddingTop: 0, paddingBottom: 0}}
                                        >
                                            <TextField name="commentNewsRight"
                                                       value={this.state.comments[key].value}
                                                       onChange={this.onCommentChange(key)}
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
                                                  rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                          hoverColor="#f3989b"
                                                                          color="#eb7077"/>}
                                                  style={{paddingTop: 0, paddingBottom: 0}}
                                        >
                                            <TextField name="commentNewsRight"
                                                       value={this.state.comments[key].value}
                                                       onChange={this.onCommentChange(key)}
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
                    onClick={this.getNewsId(key)}
                >
                    <Card>
                        <Link to={`/news/${news[key]._id}`}>
                            <CardMedia overlay={<CardTitle title={news[key].newsTitle}/>}>
                                <img src={news[key].newsCoverLink}/>
                            </CardMedia>
                        </Link>
                        {this.props.credentials.finished === true && this.props.credentials.guest === false ?
                            <CardActions>
                                <List style={{paddingTop: 0, paddingBottom: 0}}>
                                    <ListItem disabled={true}
                                              rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                      hoverColor="#f3989b"
                                                                      color="#eb7077"/>}
                                              style={{paddingTop: 0, paddingBottom: 0}}
                                    >
                                        <TextField name="commentNewsMobile"
                                                   value={this.state.comments[key].value}
                                                   onChange={this.onCommentChange(key)}
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
                            onMouseEnter={this.getCollectionId(key)}
                        >
                            <Card>
                                <Link to={`/collections/${collections[key]._id}`}>
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
                                                      rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key + 4].value}
                                                           onChange={this.onCommentChange(key + 4)}
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
                                                      rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key + 4].value}
                                                           onChange={this.onCommentChange(key + 4)}
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
                            onMouseEnter={this.getCollectionId(key)}
                        >
                            <Card>
                                <Link to={`/collections/${collections[key]._id}`}>
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
                                                      rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key + 4].value}
                                                           onChange={this.onCommentChange(key + 4)}
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
                                                      rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                              hoverColor="#f3989b"
                                                                              color="#eb7077"/>}
                                                      style={{paddingTop: 0, paddingBottom: 0}}
                                            >
                                                <TextField name="commentNewsLeft"
                                                           value={this.state.comments[key + 4].value}
                                                           onChange={this.onCommentChange(key + 4)}
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
                        onClick={this.getCollectionId(key)}
                    >
                        <Card>
                            <Link to={`/collections/${collections[key]._id}`}>
                                <CardMedia overlay={<CardTitle title={collections[key].collectionName}/>}>
                                    <img src={collections[key].picturesArray[0].pictureLink}/>
                                </CardMedia>
                            </Link>
                            {this.props.credentials.finished === true && this.props.credentials.guest === false ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                          hoverColor="#f3989b"
                                                                          color="#eb7077"/>}
                                                  style={{paddingTop: 0, paddingBottom: 0}}
                                        >
                                            <TextField name="commentNewsLeft"
                                                       value={this.state.comments[key + 4].value}
                                                       onChange={this.onCommentChange(key + 4)}
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
                fetchedNews={this.state.fetchedNews}
                fetchingCollections={this.props.collections.fetchingCollections}
                fetchedCollections={this.props.collections.fetchedCollections}
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
    collections: React.PropTypes.shape({
        collections: PropTypes.array,
        fetchedCollections: PropTypes.bool,
        fetchingCollections: PropTypes.bool
    }),
    shouldUpdateCollections: React.PropTypes.shape({
        shouldUpdateCollections: PropTypes.bool
    })
};

// Map credentials
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
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            firstName: response.firstName,
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

// Map collections
const collections = (state) => {
    if (state.collectionsHomeViewReducer.fetching === true) {
        return {
            fetchingCollections: true
        }
    }
    else if (state.collectionsHomeViewReducer.data) {
        const response = state.collectionsHomeViewReducer.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false
        }
    }
    else if (state.collectionsHomeViewReducer.fetched === false) {
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
    }
};

// Map shouldUpdate
const shouldUpdateFunction = (state) => {
    if (state.shouldUpdateCollectionsReducer) {
        const response = state.shouldUpdateCollectionsReducer;
        return {
            shouldUpdateCollections: response.shouldUpdate
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collections: collections(state),
    shouldUpdateCollections: shouldUpdateFunction(state)
});

export default connect(mapStateToProps)(HomeView);