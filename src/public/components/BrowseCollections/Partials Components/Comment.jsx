import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import * as readOneActionsUniversal from '../../../actions/Collections/manageCollectionsReadOneActions.js';
import {Card, List, ListItem, Avatar, FlatButton} from 'material-ui';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

let createHandler = function (dispatch) {
    let onDeleteComment = function (commentId) {
        dispatch(readOneActionsUniversal.onDeleteComment(commentId));
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

                    <ListItem disabled={true}
                              style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}>
                        {this.props.comment}
                    </ListItem>
                </Card>
            </List>
        )
    }
}

export default connect()(Comment)