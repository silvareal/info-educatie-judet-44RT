import React, {Component} from 'react';
import {Link} from 'react-router';

import {
    AppBar,
    Avatar,
    IconMenu,
    IconButton,
    ListItem,
    Divider,
    List,
    FlatButton
} from 'material-ui';
import ImageCollections from 'material-ui/svg-icons/image/collections';
import ActionSupervisorAccount from 'material-ui/svg-icons/action/supervisor-account';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert'
import AVLibraryBooks from 'material-ui/svg-icons/av/library-books';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';

import Auth from '../../modules/Auth';

class AppBarPersonal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        }
    }

    hideAppBar = () => {
        let {isVisible} = this.state;

        window.scrollY > this.scroll ?
            !isVisible && this.setState({
                isVisible: true
            })
            :
            isVisible && this.setState({
                isVisible: false
            });
        this.scroll = window.scrollY;

    };

    componentDidMount() {
        window.addEventListener('scroll', this.hideAppBar);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.hideAppBar)
    }

    render() {

        let hide = this.state.isVisible ? "hidden" : "";

        return (
            <AppBar
                className={"appBar " + hide}
                style={{backgroundColor: "#3460f1"}}
                title={<Link to={`/`} style={{color: "white"}}>4Art</Link>}
                showMenuIconButton={false}
                iconElementRight={
                    Auth.isUserAuthenticated() ?
                        <div>
                            <IconMenu
                                open={this.props.openMenu}
                                onRequestChange={this.props.handleOnRequestChange}
                                iconButtonElement={
                                    <IconButton style={{padding: 0}}>
                                        <NavigationMoreVert color="#ffffff"/>
                                    </IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                    <span onClick={this.props.handleCloseMenu}>
                                    <List>
                                        <Link to={`/profile/${this.props.userName}`}
                                              onClick={this.props.resetScroll}
                                        >
                                            {this.props.profilePictureLink ?
                                                <ListItem primaryText="My profile"
                                                          leftAvatar={<Avatar
                                                              src={this.props.profilePictureLink}/>}
                                                />
                                                :
                                                <ListItem primaryText="My profile"
                                                          leftIcon={<ActionAccountCircle/>}/>}
                                            </Link>
                                    </List>
                                        <Divider />
                                    <List>
                                        <Link to={`/`}
                                              activeClassName="active-link-classname"
                                              onClick={this.props.resetScroll}
                                        >
                                            <ListItem
                                                primaryText="Home"
                                                leftIcon={<ActionHome/>}
                                            />
                                        </Link>
                                        <Link to={`/manage`}
                                              activeClassName="active-link-classname"
                                              onClick={this.props.resetScroll}
                                        >
                                            <ListItem primaryText="Manage collections"
                                                      leftIcon={<ImageCollections/>}
                                            />
                                        </Link>
                                    </List>
                                        <Divider/>
                                        <List>
                                            <Link to={`/collections`}
                                                  activeClassName="active-link-classname"
                                                  onClick={this.props.resetScroll}
                                            >
                                            <ListItem primaryText="Browse all collections"
                                                      leftIcon={<ImageCollections/>}
                                            />
                                        </Link>
                                            <Link to={`/news`}
                                                  activeClassName="active-link-classname"
                                                  onClick={this.props.resetScroll}
                                            >
                                            <ListItem primaryText="Browse all news articles"
                                                      leftIcon={<ActionAnnouncement/>}
                                            />
                                        </Link>
                                        </List>
                                        <Divider/>
                                        {this.props.isAdmin === true ?
                                            <span>
                                                <List>
                                                    <Link to={`/admin/${this.props.userId}`}
                                                          activeClassName="active-link-classname"
                                                          onClick={this.props.resetScroll}
                                                    >
                                                                <ListItem primaryText="Admin Panel"
                                                                          leftIcon={<ActionSupervisorAccount/>}
                                                                />
                                                    </Link>
                                                    <Link to={`/admin/${this.props.userId}/collections`}
                                                          activeClassName="active-link-classname"
                                                          onClick={this.props.resetScroll}
                                                    >
                                                            <ListItem primaryText="Manage all collections"
                                                                      leftIcon={<ImageCollections/>}
                                                            />
                                                    </Link>
                                                    <Link to={`/admin/${this.props.userId}/news`}
                                                          activeClassName="active-link-classname"
                                                          onClick={this.props.resetScroll}
                                                    >
                                                            <ListItem primaryText="Manage news"
                                                                      leftIcon={<ActionAnnouncement/>}
                                                            />
                                                    </Link>
                                                    <Link to={`/admin/${this.props.userId}/logs`}
                                                          activeClassName="active-link-classname"
                                                          onClick={this.props.resetScroll}
                                                    >
                                                            <ListItem primaryText="Action logs"
                                                                      leftIcon={<AVLibraryBooks/>}
                                                            />
                                                    </Link>
                                                    <Link to={`/admin/${this.props.userId}/users`}
                                                          activeClassName="active-link-classname"
                                                          onClick={this.props.resetScroll}
                                                    >
                                                            <ListItem primaryText="Manage users"
                                                                      leftIcon={<ActionPermContactCalendar/>}
                                                            />
                                                    </Link>
                                                </List>
                                                <Divider/>
                                            </span> : null
                                        }
                                        <List>
                                            <Link to={`/logout`}
                                                  onClick={this.props.resetScroll}
                                            >
                                                            <ListItem primaryText="Logout"
                                                                      leftIcon={<ActionExitToApp/>}
                                                            />
                                                    </Link>
                                        </List>
                                        </span>
                            </IconMenu>
                        </div> :
                        <div style={{display: "flex", justifyContent: "center", flex: 1}}>
                            <Link to={`/login`}>
                                <FlatButton label="Login"
                                />
                            </Link>
                            <Link to={`/signup`}>
                                <FlatButton label="Sign up"
                                />
                            </Link>
                        </div>
                }
            />

        )
    }
}

export default AppBarPersonal;