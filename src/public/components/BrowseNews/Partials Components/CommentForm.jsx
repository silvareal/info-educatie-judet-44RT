import React, {Component} from 'react';
import {Link} from 'react-router';

import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

import {
    TextField,
    Avatar,
    Card,
    List,
    ListItem
} from 'material-ui';

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
                                  rightIcon={<ContentSend onClick={this.props.onSave}
                                                          hoverColor="#f3989b"
                                                          color="#eb7077"/>}
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
                                inputStyle={{color: "#000000"}}
                                floatingLabelStyle={{color: "#ee6e73"}}
                                underlineFocusStyle={{borderColor: "#ee6e73"}}
                            />
                        </ListItem>
                        :
                        <ListItem disabled={true}
                                  leftIcon={<Link to={`/profile/${this.props.userName}`}>
                                      <ActionAccountCircle style={{width: 48, height: 48}}/>
                                  </Link>}
                                  rightIcon={<ContentSend onClick={this.props.onSave}
                                                          hoverColor="#f3989b"
                                                          color="#eb7077"/>}
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
                                inputStyle={{color: "#000000"}}
                                floatingLabelStyle={{color: "#ee6e73"}}
                                underlineFocusStyle={{borderColor: "#ee6e73"}}
                            />
                        </ListItem>
                    }
                </Card>
            </List>
        )
    }

}

export default CommentForm;