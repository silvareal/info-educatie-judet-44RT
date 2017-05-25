import React, {Component} from 'react';
import {Link} from 'react-router';

import Home from '../../components/Home/Main Components/Home.jsx';
import Auth from '../../modules/Auth.js'

import {Card, CardMedia, CardTitle, CardActions, TextField, ListItem, List, Avatar} from 'material-ui';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

let socket = io.connect();

class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            userId: null,
            news: [],
            collections: [],
            firstName: '',
            collectionId: "",
            newsId: "",
            guest: null,
            finished: null,
            profilePictureLink: '',
            //Due to concat not working or myself not using it correctly, I've manually set the initial state of this array
            comments: [
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
            ]
        };
    }

    getCredentials = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/credentials');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //Check for guest
                xhr.response.guest ?
                    this.setState({
                        guest: xhr.response.guest,
                        finished: true
                    })
                    :
                    this.setState({
                        finished: true,
                        guest: xhr.response.guest,
                        userName: xhr.response.userName,
                        userId: xhr.response.userId,
                        firstName: xhr.response.firstName,
                        profilePictureLink: xhr.response.profilePictureLink
                    })
            }
        });
        xhr.send();
    };

    getNews = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/news');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    news: xhr.response.news
                })
            }
        });
        xhr.send();
    };

    getCollections = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/home/collections');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    collections: xhr.response.collections
                })
            }
        });
        xhr.send();
    };

    componentDidMount() {
        this.getCredentials();
        this.getNews();
        this.getCollections();
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
            collectionId: this.state.collections[i]._id
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
            const userName = encodeURIComponent(this.state.userName);
            const firstName = encodeURIComponent(this.state.firstName);
            const comment = encodeURIComponent(this.state.comments[i].value);
            const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

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
                userName: this.state.userName,
                firstName: this.state.firstName,
                userId: this.state.userId,
                profilePictureLink: this.state.profilePictureLink
            });
        }
        else {
            const newsId = encodeURIComponent(this.state.newsId);
            const userName = encodeURIComponent(this.state.userName);
            const firstName = encodeURIComponent(this.state.firstName);
            const comment = encodeURIComponent(this.state.comments[i].value);
            const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

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
                userName: this.state.userName,
                firstName: this.state.firstName,
                userId: this.state.userId,
                profilePictureLink: this.state.profilePictureLink
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
                            {this.state.finished === true && this.state.guest === false && this.state.profilePictureLink ?
                                <CardActions>
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <div className="avatar-cells-home">
                                            <ListItem disabled={true}
                                                      leftAvatar={
                                                          <Link to={`/profile/${this.state.userName}`}>
                                                              <Avatar
                                                                  src={this.state.profilePictureLink}/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                              hoverColor="green"/>}
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

                            {!this.state.profilePictureLink && this.state.finished === true && this.state.guest === false ?
                                <CardActions>
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <div className="avatar-cells-home">
                                            <ListItem disabled={true}
                                                      leftIcon={
                                                          <Link to={`/profile/${this.state.userName}`}>
                                                              <ActionAccountCircle/>
                                                          </Link>}
                                                      rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                              hoverColor="green"/>}
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
                            {this.state.finished === true && this.state.guest === false && this.state.profilePictureLink ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftAvatar={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <Avatar
                                                              src={this.state.profilePictureLink}/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                          hoverColor="green"/>}
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

                            {!this.state.profilePictureLink && this.state.finished === true && this.state.guest === false ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftIcon={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <ActionAccountCircle/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                          hoverColor="green"/>}
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
                        {this.state.finished === true && this.state.guest === false ?
                            <CardActions>
                                <List style={{paddingTop: 0, paddingBottom: 0}}>
                                    <ListItem disabled={true}
                                              rightIcon={<ContentSend onClick={this.onSave(key)}
                                                                      hoverColor="green"/>}
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

        let collections = this.state.collections;

        let rowsCollections1, rowsCollections2, rowsCollections3;

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
                            {this.state.finished === true && this.state.guest === false && this.state.profilePictureLink ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftAvatar={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <Avatar
                                                              src={this.state.profilePictureLink}/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                          hoverColor="green"/>}
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

                            {!this.state.profilePictureLink && this.state.finished === true && this.state.guest === false ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftIcon={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <ActionAccountCircle/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                          hoverColor="green"/>}
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
                            {this.state.finished === true && this.state.guest === false && this.state.profilePictureLink ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftAvatar={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <Avatar
                                                              src={this.state.profilePictureLink}/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                          hoverColor="green"/>}
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

                            {!this.state.profilePictureLink && this.state.finished === true && this.state.guest === false ?
                                <CardActions className="avatar-cells-home">
                                    <List style={{paddingTop: 0, paddingBottom: 0}}>
                                        <ListItem disabled={true}
                                                  leftIcon={
                                                      <Link to={`/profile/${this.state.userName}`}>
                                                          <ActionAccountCircle/>
                                                      </Link>}
                                                  rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                          hoverColor="green"/>}
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
                        {this.state.finished === true && this.state.guest === false ?
                            <CardActions className="avatar-cells-home">
                                <List style={{paddingTop: 0, paddingBottom: 0}}>
                                    <ListItem disabled={true}
                                              rightIcon={<ContentSend onClick={this.onSave(key + 4)}
                                                                      hoverColor="green"/>}
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
        document.title = "4Art";
        return (
            <Home
                userName={this.state.userName}
                userId={this.state.userId}
                rowsNews1={rowsNews1}
                rowsNews2={rowsNews2}
                rowsNews3={rowsNews3}
                rowsCollections1={rowsCollections1}
                rowsCollections2={rowsCollections2}
                rowsCollections3={rowsCollections3}
            />
        )
    }
}

export default HomeView;