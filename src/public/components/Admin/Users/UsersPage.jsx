import React, {Component} from 'react';
import {
    Drawer,
    RaisedButton,
    MenuItem,
    Card,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeaderColumn
} from 'material-ui';
import {Link} from 'react-router';

class UsersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
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
        let users = this.props.users;
        return (
            <div>
                <Card className="container">
                    {this.props.message}
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                    <form onSubmit={this.props.addModerators}>
                        <Table multiSelectable={true} onCellClick={this.handleCellClick}>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Id</TableHeaderColumn>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>Username</TableHeaderColumn>
                                    <TableHeaderColumn>Moderator(Y/N)</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.keys(users).map((i) => (
                                    <TableRow key={i}>
                                        <TableRowColumn>{users[i]._id}</TableRowColumn>
                                        <TableRowColumn>{users[i].email}</TableRowColumn>
                                        <TableRowColumn>{users[i].name}</TableRowColumn>
                                        <TableRowColumn>{users[i].moderator === false ? "N" : "Y"}</TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <RaisedButton type="button" primary={true} label="Give/Revoke moderator permissions"
                                      onTouchTap={this.props.addModerators}/>
                    </form>
                </Card>
                <Drawer open={this.state.open}>
                    <h1>Admin panel</h1>
                    <MenuItem><Link to={`/admin/${this.props.userId}`} activeStyle={{color: 'blue'}}>Admin
                        CP</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/logs`} activeStyle={{color: 'blue'}}>Logs
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/news`} activeStyle={{color: 'blue'}}>News
                        management component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/users`} activeStyle={{color: 'blue'}}>Users
                        management
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/collections`} activeStyle={{color: 'blue'}}>Collections
                        management</Link></MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default UsersPage;