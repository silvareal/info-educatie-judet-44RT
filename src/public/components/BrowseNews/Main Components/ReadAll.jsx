import React, {Component} from 'react';
import {
    Drawer,
    MenuItem,
    RaisedButton,
    Card
} from 'material-ui';
import {Link} from 'react-router'

import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';

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

    render() {
        return (
            <div>
                <Card className="container">
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </Card>
                <TopActions
                    userId={this.props.userId}
                />
                <ViewTable
                    userId={this.props.userId}
                    news={this.props.news}
                    errorMessage={this.props.errorMessage}
                />
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
        );
    }
}

export default ReadAll