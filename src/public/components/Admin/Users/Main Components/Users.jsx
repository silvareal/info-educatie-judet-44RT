import React, {Component} from 'react';
import {
    RaisedButton,
    Card,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHeaderColumn,
    Snackbar,
    TextField,
    IconButton
} from 'material-ui';

import ActionSearch from 'material-ui/svg-icons/action/search';
import LoadingIndicator from '../../../Loading Indicator/LoadingIndicator.jsx';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            openSnack: true
        };
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };

    handleCellClick = (rowNumber) => {
        if (this.props.clicked[rowNumber] !== true) {
            this.props.cellClick(rowNumber);
            this.props.clicked[rowNumber] = true;
        }
        else {
            if (this.props.clicked[rowNumber] === true) {
                this.props.cellDeclick(rowNumber);
                this.props.clicked[rowNumber] = undefined;
            }
        }
    };

    render() {

        if (this.props.fetchedUsers)
        {
            return (
                <div>
                    <div className="top-bar-spacing"/>
                    <Card className="container-manage-users" style={{boxShadow: "none"}}>
                        {this.props.message}
                        <div className="top-actions">
                            <div className="capsules">
                                <TextField hintText="Email, username or id"
                                           value={this.props.searchQuery}
                                           onChange={this.props.onSearchQueryChange}
                                           onKeyDown={this.props.handleKeyPress}
                                />
                                <IconButton onTouchTap={this.props.onSearchUser}>
                                    <ActionSearch/>
                                </IconButton>
                            </div>
                        </div>
                        <form>
                            <div className="manage-users-desktop">
                                {this.props.searched ?
                                    <div className="center-users-mobile">
                                        <div>
                                            {this.props.rows2}
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Table multiSelectable={true} onCellClick={this.handleCellClick}>
                                            <TableHeader displaySelectAll={false}
                                                         adjustForCheckbox={false}>
                                                <TableRow>
                                                    <TableHeaderColumn colSpan="2" style={{textAlign: 'center'}}>
                                                        Manage users
                                                    </TableHeaderColumn>
                                                </TableRow>
                                                <TableRow>
                                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                                    <TableHeaderColumn>Is moderator</TableHeaderColumn>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {this.props.rows1}
                                            </TableBody>
                                        </Table>
                                        <Snackbar
                                            open={this.state.openSnack}
                                            onRequestClose={() => {
                                            }}
                                            onActionTouchTap={() => {
                                            }}
                                            message={<RaisedButton type="button" primary={true}
                                                                   style={{backgroundColor: "transparent"}}
                                                                   label="Give/Revoke moderator permissions"
                                                                   onTouchTap={this.props.addModerators}/>}/>
                                    </div>
                                }

                            </div>
                            <div className="center-users-mobile">
                                <div className="manage-users-mobile">
                                    {this.props.rows2}
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>
            )
        }
        else return(
            <div>
                <div className="top-bar-spacing"/>
                <Card className="container-manage-users" style={{boxShadow: "none"}}>
                    <LoadingIndicator/>
                </Card>
            </div>
        )
    }
}

export default Users;