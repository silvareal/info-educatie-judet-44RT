import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Drawer,
    MenuItem,
} from 'material-ui';

class Logs extends Component {
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
                <div className="logs-wrap">
                    <div>
                        <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                        <Link to={`/admin/${this.props.userId}/logs/login`}>
                            <RaisedButton
                                primary={true}
                                label="Login logs"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link to={`/admin/${this.props.userId}/logs/signup`}>
                            <RaisedButton
                                primary={true}
                                label="Logs signup"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link to={`/admin/${this.props.userId}/logs/news`}>
                            <RaisedButton
                                primary={true}
                                label="Logs news"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link to={`/admin/${this.props.userId}/logs/collections`}>
                            <RaisedButton
                                primary={true}
                                label="Logs collections"
                            />
                        </Link>
                    </div>
                    <div>
                        <Link to={`/admin/${this.props.userId}/logs/profile`}>
                            <RaisedButton
                                primary={true}
                                label="Logs profile update"
                            />
                        </Link>
                    </div>
                </div>
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

export default Logs;