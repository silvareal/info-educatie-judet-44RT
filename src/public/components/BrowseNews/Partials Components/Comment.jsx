import React, {Component} from 'react';
import {Link} from 'react-router';

import {Card, List, ListItem, Avatar, FlatButton} from 'material-ui';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

class Comment extends Component {
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
                                    <div><FlatButton label="Delete"
                                                     onTouchTap={() => this.props.handler.onDeleteComment(this.props._id)}/>
                                    </div>
                                </div>

                                :
                                <div>
                                    <Link to={`/profile/${this.props.userName}`}>{this.props.userName}</Link>
                                    <div>{this.props.date}</div>
                                    <div><FlatButton label="Delete"
                                                     onTouchTap={() => this.props.handler.onDeleteComment(this.props._id)}/>
                                    </div>
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
                                    <div><FlatButton label="Delete"
                                                     onTouchTap={() => this.props.handler.onDeleteComment(this.props._id)}/>
                                    </div>
                                </div>

                                :
                                <div>
                                    <Link to={`/profile/${this.props.userName}`}>{this.props.userName}</Link>
                                    <div>{this.props.date}</div>
                                    <div><FlatButton label="Delete"
                                                     onTouchTap={() => this.props.handler.onDeleteComment(this.props._id)}/>
                                    </div>
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

export default Comment;