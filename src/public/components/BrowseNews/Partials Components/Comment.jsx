import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {Card, List, ListItem, Avatar, FlatButton} from 'material-ui';
import * as readOneActions from '../../../actions/BrowseNews/browseNewsReadOneActions.js';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

let createHandler = function (dispatch) {
    let onDeleteComment = function (commentId) {
        dispatch(readOneActions.onDeleteComment(commentId));
    };
    return {
        onDeleteComment
    }
};

class Comment extends Component {

    constructor(props) {
        super(props);

        this.handlers = createHandler(this.props.dispatch);
    }
    
    render() {
        return (
            <List>
                <Card style={{marginBottom: "14px", padding: 20}}>
                    {this.props.profilePictureLink ?
                        <ListItem disabled={true}
                                  leftAvatar={<Link to={`/profile/${this.props.userName}`}><Avatar
                                      src={this.props.profilePictureLink}
                                  /></Link>}>
                            {this.props.firstName !== "undefined" ?
                                <div>
                                    <Link
                                        to={`/profile/${this.props.userName}`}>{this.props.firstName}@{this.props.userName}
                                    </Link>
                                    <div>{this.props.date}</div>
                                    {this.props.admin === true || this.props.moderator === true ?
                                        <div><FlatButton label="Delete"
                                                         onTouchTap={() => this.handlers.onDeleteComment(this.props._id)}/>
                                        </div>
                                        :
                                        null
                                    }
                                </div>

                                :
                                <div>
                                    <Link to={`/profile/${this.props.userName}`}>{this.props.userName}</Link>
                                    <div>{this.props.date}</div>
                                    {this.props.admin === true || this.props.moderator === true ?
                                        <div><FlatButton label="Delete"
                                                         onTouchTap={() => this.handlers.onDeleteComment(this.props._id)}/>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            }
                        </ListItem>
                        :
                        <ListItem disabled={true}
                                  leftIcon={
                                      <Link to={`/profile/${this.props.userName}`}>
                                          <ActionAccountCircle style={{width: 48, height: 48}}/>
                                      </Link>}>
                            {this.props.firstName !== "undefined" ?
                                <div>
                                    <Link
                                        to={`/profile/${this.props.userName}`}>{this.props.firstName}@{this.props.userName}
                                    </Link>
                                    <div>{this.props.date}</div>
                                    {this.props.admin === true || this.props.moderator === true ?
                                        <div><FlatButton label="Delete"
                                                         onTouchTap={() => this.handlers.onDeleteComment(this.props._id)}/>
                                        </div>
                                        :
                                        null
                                    }
                                </div>

                                :
                                <div>
                                    <Link to={`/profile/${this.props.userName}`}>{this.props.userName}</Link>
                                    <div>{this.props.date}</div>
                                    {this.props.admin === true || this.props.moderator === true ?
                                        <div><FlatButton label="Delete"
                                                         onTouchTap={() => this.handlers.onDeleteComment(this.props._id)}/>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            }
                        </ListItem>
                    }

                    <ListItem disabled={true}>
                        {this.props.comment}
                    </ListItem>
                </Card>
            </List>
        )
    }
}

export default connect()(Comment)