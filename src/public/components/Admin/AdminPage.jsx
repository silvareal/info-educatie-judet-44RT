import React, {Component} from 'react';
import {
    Drawer,
    RaisedButton,
    MenuItem,
    Card,
} from 'material-ui';
import {Link} from 'react-router';

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };

    render() {
        return (
            <div>
                <Card className="container">
                    {this.props.message}
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </Card>
                <Drawer open={this.state.open}>
                    <h1>Admin panel</h1>
                    <MenuItem><Link to={`/admin/${this.props.userId}`} activeStyle={{color: 'blue'}}>Logs
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/news`} activeStyle={{color: 'blue'}}>News management component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/users`} activeStyle={{color: 'blue'}}>Users management
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/collections`} activeStyle={{color: 'blue'}}>Collections management</Link></MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default AdminPage;