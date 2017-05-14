import React, { Component } from 'react';
import {
    Drawer,
    MenuItem,
    RaisedButton,
    Card
} from 'material-ui';
import {Link} from 'react-router'

import TopActions from './TopActions.jsx';
import ViewTable from './ViewTable.jsx';

class ReadAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };

    render(){
        return(
            <div>
                <Card className="container">
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </Card>
                <TopActions
                adminId={this.props.adminId}
                />
                <ViewTable
                    adminId={this.props.adminId}
                    collections={this.props.collections}
                    errorMessage={this.props.errorMessage}
                />
                <Drawer open={this.state.open}>
                    <h1>Admin panel</h1>
                    <MenuItem><Link to={`/admin/${this.props.adminId}`} activeStyle={{color: 'blue'}}>Admin
                        CP</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.adminId}/logs`} activeStyle={{color: 'blue'}}>Logs
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.adminId}/news`} activeStyle={{color: 'blue'}}>News
                        management component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.adminId}/users`} activeStyle={{color: 'blue'}}>Users
                        management
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.adminId}/collections`} activeStyle={{color: 'blue'}}>Collections
                        management</Link></MenuItem>
                </Drawer>
            </div>
        );
    }
}

export default ReadAll