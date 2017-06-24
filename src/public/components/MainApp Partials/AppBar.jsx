import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {AutoComplete, Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import * as searchActions from '../../actions/AppBar/searchActions.js';
import {
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

    constructor(props) {
        super(props);

        this.handler = createHandler(this.props.dispatch);

        this.state = {
            isVisible: false,
            openMenu: false
        }
    }

    handleOpenMenu = (value) => {
        this.setState({
            openMenu: value,
        });
    };

    handleCloseMenu = () => {
        this.setState({
            openMenu: false
        })
    };

    hideAppBar = (e) => {
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
        this.context.router.replace(`/search/${this.props.searchFunction.searchQuery}`)
    };

    render() {
        let hide = this.state.isVisible ? "hidden" : "";
        return (
            <Toolbar className={"appBar " + hide}
                     style={{backgroundColor: "#f4f7f6", width: "100%"}}>
                <ToolbarGroup firstChild={true}>
                    <Link to={`/`}>
                        <ToolbarTitle text="4Art"/>
                    </Link>
                </ToolbarGroup>
                <ToolbarGroup>
                    <div style={{width: "31em"}}>
                        {this.state.isVisible ? null :
                            <AutoComplete
                                searchText={this.props.searchFunction.searchQuery}
                                dataSource={this.props.allCollections.allCollections}
                                hintText="Search collections"
                                onUpdateInput={this.onSearchQueryChange}
                                openOnFocus={true}
                                maxSearchResults={10}
                                filter={AutoComplete.fuzzyFilter}
                                fullWidth={true}
                                onKeyDown={this.handleKeyPress}
                                onNewRequest={() => this.onSearch()}
                            />
                        }
                    </div>
                </ToolbarGroup>
                <ToolbarGroup lastChild={true}>
                    {
                        Auth.isUserAuthenticated() ?
                            <div>
                                <IconMenu
                                    open={this.state.openMenu}
                                    onRequestChange={this.handleOpenMenu}
                                    iconButtonElement={
                                        <IconButton style={{padding: 0}}>
                                            <NavigationMoreVert color="black"/>
                                        </IconButton>}
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                                    <span onClick={this.handleCloseMenu}>
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
                                                                      leftIcon={<ActionExitToApp/>}/>
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
                </ToolbarGroup>
            </Toolbar>
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