import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as usersActions from '../../../../actions/Admin/Users/manageUsersActionsAdmin.js';
import {
    Card,
    TextField,
    IconButton,
    Tabs,
    Tab
} from 'material-ui';

import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';

let createHandler = function (dispatch) {
    let onOpenSnackBar = function () {
        dispatch(usersActions.onOpenSnackBar())
    };

    let onCloseSnackBar = function () {
        dispatch(usersActions.onCloseSnackBar())
    };

    return {
        onOpenSnackBar,
        onCloseSnackBar
    }
};

class Users extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onOpenSnackBar = () => {
        this.handlers.onOpenSnackBar();
    };

    onCloseSnackBar = () => {
        this.handlers.onCloseSnackBar();
    };

    render() {
        return (
            <div>
                <div className="top-bar-spacing"/>
                <Card className="container-manage-users" style={{boxShadow: "none"}}>
                    <Tabs initialSelectedIndex={this.props.currentMode === 'Ban' ? 1 : 2}
                          inkBarStyle={{color: "red", backgroundColor: "red"}}
                          tabItemContainerStyle={{backgroundColor: "#000000"}}
                          style={{opacity: 0.8}}>
                        <Tab icon={<ActionPermContactCalendar/>}
                             onClick={() => this.props.changeAppMode('Moderators')}/>
                        <Tab icon={<ContentRemoveCircle/>} onClick={() => this.props.changeAppMode('Ban')}/>
                    </Tabs>
                    <div className="top-actions">
                        <div className="capsules">
                            <TextField hintText="Email, username or id"
                                       value={this.props.searchQuery}
                                       onChange={this.props.onSearchQueryChange}
                                       onKeyDown={this.props.handleKeyPress}
                                       inputStyle={{color: "#000000"}}
                                       floatingLabelStyle={{color: "#000000"}}
                                       underlineFocusStyle={{borderColor: "#000000"}}
                            />
                            <IconButton onTouchTap={this.props.onSearchUser}>
                                <ActionSearch/>
                            </IconButton>
                        </div>
                    </div>
                    <form>
                        {this.props.currentMode === 'Moderators' ?
                            <div className="center-users-mobile">
                                <div>
                                    {this.props.searchQuery !== "" && this.props.rowsModeratorsFound ? this.props.rowsModeratorsFound : this.props.rowsModerators}
                                </div>
                            </div>
                            :
                            <div className="center-users-mobile">
                                <div>
                                    {this.props.searchQuery !== "" && this.props.rowsBanFound ? this.props.rowsBanFound : this.props.rowsBan}
                                </div>
                            </div>
                        }
                    </form>
                </Card>
            </div>
        )
    }
}

export default Users;