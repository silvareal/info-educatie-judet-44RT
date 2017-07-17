import React, {Component} from 'react';
import {Link} from 'react-router';

import ContentSend from 'material-ui/svg-icons/content/send';

import {
    TextField,
    Avatar,
    Card,
    List,
    ListItem
} from 'material-ui';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

class CommentForm extends Component {

    render() {
        return (
            <List>
                <Card style={{margin: "0 auto 20px auto"}}>
                    {this.props.profilePictureLink ?
                        <ListItem disabled={true}
                                  leftAvatar={
                                      <Link to={`/profile/${this.props.userName}`}>
                                          <Avatar
                                              src={this.props.profilePictureLink }/>
                                      </Link>}
                                  rightIcon={<ContentSend onTouchTap={this.props.onSave}
                                                          hoverColor="#9b9b9b"
                                                          color="#000000"/>}
                        >
                            {this.props.commentAdded === false ? "Comments can only have 1000 characters and they cannot be empty" : null}
                            <TextField
                                style={{width: "100%"}}
                                hintText="Add comment..."
                                value={this.props.comment}
                                onChange={this.props.onCommentChange}
                                errorText={this.props.commentAdded === false ? "Comment not valid" : null}
                                onKeyDown={this.props.handleKeyPress}
                                multiLine={true}
                                rowsMax={2}
                                inputStyle={{color: "#000000", opacity: 0.8}}
                                floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                            />
                        </ListItem>
                        :
                        <ListItem disabled={true}
                                  leftIcon={<Link to={`/profile/${this.props.userName}`}>
                                      <ActionAccountCircle style={{width: 48, height: 48}}/>
                                  </Link>}
                                  rightIcon={<ContentSend onTouchTap={this.props.onSave}
                                                          hoverColor="#9b9b9b"
                                                          color="#000000"/>}
                        >
                            {this.props.commentAdded === false ? "Comments can only have 1000 characters and they cannot be empty" : null}
                            <TextField
                                style={{width: "100%"}}
                                hintText="Add comment..."
                                value={this.props.comment}
                                onChange={this.props.onCommentChange}
                                errorText={this.props.commentAdded === false ? "Comment not valid" : null}
                                onKeyDown={this.props.handleKeyPress}
                                multiLine={true}
                                rowsMax={2}
                                inputStyle={{color: "#000000", opacity: 0.8}}
                                floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                            />
                        </ListItem>
                    }
                </Card>
            </List>
        )
    }

}

export default CommentForm;