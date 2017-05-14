import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Drawer,
    MenuItem,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeaderColumn
} from 'material-ui';

class LogsLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };

    render() {

        let rows = Object.keys(this.props.logs).map((i) => {
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                    <TableRow key={i}>
                        <TableRowColumn>{this.props.logs[i].userId}</TableRowColumn>
                        <TableRowColumn>{date.toString()}</TableRowColumn>
                    </TableRow>
                )
            }
        });

        return (
            <div>
                <div className="logs-wrap">
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </div>

                <Table
                    selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>The user _id</TableHeaderColumn>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {rows}
                    </TableBody>
                </Table>

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

export default LogsLogin;