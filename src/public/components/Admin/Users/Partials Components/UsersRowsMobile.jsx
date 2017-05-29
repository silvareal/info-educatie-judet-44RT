import React, {Component} from 'react';
import {Link} from 'react-router';

import {Card, CardHeader, CardActions, RaisedButton, Dialog, List, ListItem} from 'material-ui';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';

class UsersRowsMobile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        }
    }

    handleOpen = () => {
        this.setState({
            isOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            isOpen: false
        })
    };

    render() {

        const date = new Date(this.props.user.birthDate);

        const formattedDate =
            <div>
                {date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <Card style={{backgroundColor: "transparent", boxShadow: "none"}}>
                {this.props.mobileAddModerators ?
                    <CardHeader
                        className="mobile-header-users"
                        title={
                            <div className="user-header">
                                <Link to={`/profile/${this.props.user.name}`}
                                      style={{textDecoration: "none"}}>
                                    {this.props.user.email}
                                </Link>
                            </div>}

                        subtitle={this.props.user.moderator === true ? "User is a moderator" : "User is NOT a moderator"}
                        avatar={this.props.user.profilePictureLink ? this.props.user.profilePictureLink :
                            <ActionAccountCircle/>}
                    />
                    :
                    <CardHeader
                        className="mobile-header-users"
                        title={
                            <div className="user-header">
                                <Link to={`/profile/${this.props.user.name}`}
                                      style={{textDecoration: "none"}}>
                                    {this.props.user.email}
                                </Link>
                            </div>}

                        subtitle={this.props.user.banned === true ? "User is banned" : "User is NOT banned"}
                        avatar={this.props.user.profilePictureLink ? this.props.user.profilePictureLink :
                            <ActionAccountCircle/>}
                    />
                }

                <CardActions>
                    {this.props.mobileAddModerators ?
                        <RaisedButton primary={true}
                                      style={{backgroundColor: "transparent", boxShadow: "none"}}
                                      label="Give/Revoke moderator permissions"
                                      onTouchTap={this.props.mobileAddModerators(this.props.index)}
                                      className="action-buttons-users"
                                      buttonStyle={{backgroundColor: "#eb7077"}}
                                      labelStyle={{color: "#ffffff"}}
                        />
                        :
                        <RaisedButton primary={true}
                                      style={{backgroundColor: "transparent", boxShadow: "none"}}
                                      label="Ban/Unban user"
                                      onTouchTap={this.props.mobileBanUser(this.props.userId)}
                                      className="action-buttons-users"
                                      buttonStyle={{backgroundColor: "#eb7077"}}
                                      labelStyle={{color: "#ffffff"}}
                        />
                    }

                    <RaisedButton primary={true}
                                  style={{backgroundColor: "transparent", boxShadow: "none"}}
                                  label="Details"
                                  onTouchTap={this.handleOpen}
                                  className="action-buttons-users"
                                  buttonStyle={{backgroundColor: "#42ab9e"}}
                                  labelStyle={{color: "#ffffff"}}
                    />
                </CardActions>
                <Dialog
                    title={<div className="dialog-break-word">{"Details about: " + this.props.user.email}</div>}
                    modal={false}
                    open={this.state.isOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <List>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.firstName}</div>}
                                  secondaryText="First name"/>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.lastName}</div>}
                                  secondaryText="Last name"/>
                        <ListItem disabled={true} primaryText={formattedDate}
                                  secondaryText="Birthday"/>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.profession}</div>}
                                  secondaryText="Job"/>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.companyName}</div>}
                                  secondaryText="Company name"/>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.city}</div>}
                                  secondaryText="Lives in"/>
                        <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.user.country}</div>}
                                  secondaryText="Located in"/>
                    </List>
                </Dialog>
            </Card>
        )
    }

}

export default UsersRowsMobile;