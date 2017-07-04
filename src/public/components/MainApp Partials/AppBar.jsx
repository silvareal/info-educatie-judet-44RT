import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {} from 'material-ui';
import * as searchActions from '../../actions/AppBar/searchActions.js';
import {
    Avatar,
    IconMenu,
    IconButton,
    ListItem,
    Divider,
    List,
    FlatButton,
    AutoComplete,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    CardMedia,
    Drawer
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
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Auth from '../../modules/Auth';

let createHandler = function (dispatch) {

    let onSearchQueryChange = function (searchQuery) {
        dispatch(searchActions.onSearchQueryChange(searchQuery))
    };

    let searchAllCollections = function (searchQuery) {
        dispatch(searchActions.onSearchAll(searchQuery))
    };

    return {
        onSearchQueryChange,
        searchAllCollections
    }
};

class AppBarPersonal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handler = createHandler(this.props.dispatch);

        this.state = {
            openMenu: false,
            openSearch: false
        }
    }

    handleOpenMenu = () => {
        this.setState({
            openMenu: true
        });
    };

    handleCloseMenu = () => {
        this.setState({
            openMenu: false
        })
    };

    handleOpenSearch = () => {
        this.setState({
            openSearch: true
        })
    };

    handleCloseSearch = () => {
        this.setState({
            openSearch: false
        })
    };

    onSearchQueryChange = (searchText) => {
        this.handler.onSearchQueryChange(searchText)
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    };

    onSearch = () => {
        this.handler.searchAllCollections(this.props.searchFunction.searchQuery);
        this.context.router.push(`/search/${this.props.searchFunction.searchQuery}`)
    };

    render() {
        return (
            <div>
                <div className="logo-wrap-desktop">
                    <CardMedia onClick={() => this.context.router.push('/')}
                               style={{cursor: "pointer"}}>
                        <img src="/images/logo.png"
                             className="logo"
                        />
                    </CardMedia>
                </div>
                <div className="top-bar-actions-desktop">
                    <List className="top-bar-left-actions">

                        <Link to={`/`}
                              className="top-bar-actions-button-style"
                              activeClassName="active-link-classname">
                            <ListItem
                                primaryText="Home"
                                disabled={true}
                                style={{
                                    fontSize: 24,
                                    color: "gray"
                                }}/>
                        </Link>

                        <Link to={`/collections`}
                              className="top-bar-actions-button-style"
                              activeClassName="active-link-classname">
                            <ListItem primaryText="Collections"
                                      disabled={true}
                                      style={{
                                          fontSize: 24,
                                          color: "gray"
                                      }}/>
                        </Link>
                        <Link to={`/news`}
                              className="top-bar-actions-button-style"
                              activeClassName="active-link-classname">
                            <ListItem primaryText="News"
                                      disabled={true}
                                      style={{
                                          fontSize: 24,
                                          color: "gray"
                                      }}/>
                        </Link>

                    </List>
                    <List style={{width: "25%"}}>
                        <ListItem
                            className="top-bar-search"
                            primaryText={
                                <AutoComplete
                                    searchText={this.props.searchFunction.searchQuery}
                                    dataSource={this.props.allCollections.allCollections}
                                    hintText="Search collections"
                                    onUpdateInput={this.onSearchQueryChange}
                                    openOnFocus={!!this.props.searchFunction.searchQuery}
                                    maxSearchResults={10}
                                    filter={AutoComplete.fuzzyFilter}
                                    fullWidth={true}
                                    onKeyDown={this.handleKeyPress}
                                    onNewRequest={() => this.onSearch()}
                                />}
                            leftIcon={<ActionSearch/>}
                            disabled={true}>

                        </ListItem>
                    </List>

                    <List className="top-bar-right-actions">

                        {Auth.isUserAuthenticated() ?
                            null
                            :
                            <Link to={`/login`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname"
                            >
                                <ListItem primaryText="Login"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                        }

                        {Auth.isUserAuthenticated() ?
                            null
                            :
                            <Link to={`/signup`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname"
                            >
                                <ListItem primaryText="Sign Up"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                        }

                        {Auth.isUserAuthenticated() ?
                            <Link to={`/manage`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname"
                            >
                                <ListItem primaryText="Manage"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                            :
                            null
                        }

                        {Auth.isUserAuthenticated() ?
                            <Link to={`/profile/${this.props.userName}`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="Profile"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                            :
                            null
                        }

                        {this.props.isAdmin === true ?

                            <Link to={`/admin/${this.props.userId}`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="Control Panel"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray",
                                              lineHeight: 1
                                          }}/>
                            </Link>
                            :
                            null
                        }

                        {Auth.isUserAuthenticated() ?
                            <Link to={`/logout`}>
                                <ListItem primaryText="Logout"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray",
                                              lineHeight: 1
                                          }}/>
                            </Link>
                            :
                            null
                        }

                    </List>
                </div>
                <Toolbar className="top-bar-actions-mobile"
                         style={{
                             backgroundColor: "#f4f7f6",
                             width: "100%",
                             zIndex: 99,
                             height: 50
                         }}>
                    <div style={{position: "absolute", top: 10}}
                         onClick={this.handleOpenMenu}
                    >
                        <NavigationMenu style={{height: 30, width: 28}}/>
                    </div>
                    <ToolbarGroup/>
                    <ToolbarGroup>
                        <Link to={`/`}>
                            <div style={{display: "flex"}}>
                                <img src="/images/logo.png" style={{width: 50, height: 50}}/>
                            </div>
                        </Link>
                    </ToolbarGroup>
                    <ToolbarGroup/>
                    <div style={{position: "absolute", top: 10, right: 24}}
                         onClick={this.handleOpenSearch}>
                        <ActionSearch style={{height: 30, width: 28}}/>
                    </div>
                </Toolbar>

                <Drawer open={this.state.openSearch}
                        openSecondary={true}
                        docked={false}
                        onRequestChange={() => this.handleCloseSearch()}>
                    {this.state.openSearch ?
                        <List>
                            <ListItem
                                className="top-bar-search-mobile"
                                primaryText={
                                    <AutoComplete
                                        searchText={this.props.searchFunction.searchQuery}
                                        dataSource={this.props.allCollections.allCollections}
                                        hintText="Search collections"
                                        onUpdateInput={this.onSearchQueryChange}
                                        openOnFocus={!!this.props.searchFunction.searchQuery}
                                        maxSearchResults={10}
                                        filter={AutoComplete.fuzzyFilter}
                                        fullWidth={true}
                                        onKeyDown={this.handleKeyPress}
                                        onNewRequest={() => this.onSearch()}
                                    />}
                                leftIcon={<ActionSearch/>}
                                disabled={true}>

                            </ListItem>
                        </List>
                        :
                        null
                    }
                </Drawer>

                <Drawer open={this.state.openMenu}
                        docked={false}
                        onRequestChange={() => this.handleCloseMenu()}>
                    {Auth.isUserAuthenticated() ?
                        <span onClick={this.handleCloseMenu}>
                        <List>
                            <Link to={`/profile/${this.props.userName}`}>
                                {this.props.profilePictureLink ?
                                    <ListItem primaryText="Profile"
                                              leftAvatar={
                                                  <Avatar src={this.props.profilePictureLink}/>}/>
                                    :
                                    <ListItem primaryText="Profile"
                                              leftIcon={<ActionAccountCircle/>}/>}
                            </Link>
                        </List>
                        <Divider />
                        <List>
                            <Link to={`/`}
                                  activeClassName="active-link-classname">
                                <ListItem
                                    primaryText="Home"
                                    leftIcon={<ActionHome/>}/>
                            </Link>

                            <Link to={`/manage`}
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="Manage"
                                          leftIcon={<ImageCollections/>}/>
                            </Link>

                        </List>
                        <Divider/>
                        <List>
                            <Link to={`/collections`}
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="Collections"
                                          leftIcon={<ImageCollections/>}/>
                            </Link>

                            <Link to={`/news`}
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="News"
                                          leftIcon={<ActionAnnouncement/>}/>
                            </Link>

                        </List>
                        <Divider/>
                            {this.props.isAdmin === true ?
                                <span>
                                <List>
                                    <Link to={`/admin/${this.props.userId}`}
                                          activeClassName="active-link-classname">
                                        <ListItem primaryText="Control Panel"
                                                  leftIcon={<ActionSupervisorAccount/>}/>
                                    </Link>

                                    <Link to={`/admin/${this.props.userId}/collections`}
                                          activeClassName="active-link-classname">
                                        <ListItem primaryText="Manage collections"
                                                  leftIcon={<ImageCollections/>}/>
                                    </Link>

                                    <Link to={`/news`}
                                          activeClassName="active-link-classname">
                                        <ListItem primaryText="Manage news"
                                                  leftIcon={<ActionAnnouncement/>}/>
                                    </Link>

                                    <Link to={`/admin/${this.props.userId}/logs`}
                                          activeClassName="active-link-classname">
                                        <ListItem primaryText="Action logs"
                                                  leftIcon={<AVLibraryBooks/>}/>
                                    </Link>

                                    <Link to={`/admin/${this.props.userId}/users`}
                                          activeClassName="active-link-classname">
                                        <ListItem primaryText="Manage users"
                                                  leftIcon={<ActionPermContactCalendar/>}/>
                                    </Link>
                                </List>
                                <Divider/>
                            </span> : null
                            }
                            <List>
                            <Link to={`/logout`}>
                                <ListItem primaryText="Logout"
                                          leftIcon={<ActionExitToApp/>}/>
                            </Link>
                        </List>
                    </span>
                        :
                        <span onClick={this.handleCloseMenu}>
                            <List>

                            <Link to={`/`}
                                      activeClassName="active-link-classname">
                                <ListItem
                                    primaryText="Home"
                                    leftIcon={<ActionHome/>}/>
                            </Link>

                                <Divider/>

                            <Link to={`/collections`}
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="Collections"
                                          leftIcon={<ImageCollections/>}/>
                            </Link>

                            <Link to={`/news`}
                                  activeClassName="active-link-classname">
                                <ListItem primaryText="News"
                                          leftIcon={<ActionAnnouncement/>}/>
                            </Link>

                                <Divider/>

                            <Link to={`/login`}>
                                <ListItem primaryText="Login"/>
                            </Link>

                            <Link to={`/Sign Up`}>
                                <ListItem primaryText="Sign Up"/>
                            </Link>

                        </List>
                        </span>
                    }

                </Drawer>
            </div>
        )
    }
}

AppBarPersonal.propTypes = {
    allCollections: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

AppBarPersonal.contextTypes = {
    router: PropTypes.object.isRequired
};

const allCollections = (state) => {
    if (state.collectionNamesReducer.fetching === true) {
        return {
            fetchingOwnCollections: true,
            allCollections: []
        }
    }
    else if (state.collectionNamesReducer.collections) {
        const response = state.collectionNamesReducer.collections.data.collections;
        let allCollections = Object.keys(response).map((key) => {
            return response[key].collectionName
        });
        return {
            allCollections: allCollections
        }
    }
    else if (state.collectionNamesReducer.fetched === false) {
        return {
            fetchedOwnCollections: false,
            fetchingOwnCollections: false
        }
    }
};

const searchFunction = (state) => {
    return {
        searchQuery: state.searchReducer.searchQuery,
        allCollections: state.searchReducer.allCollections,
        message: state.searchReducer.message
    }
};

const mapStateToProps = (state) => ({
    allCollections: allCollections(state),
    searchFunction: searchFunction(state)
});

export default connect(mapStateToProps)(AppBarPersonal)