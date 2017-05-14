import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Drawer,
    MenuItem
} from 'material-ui';

class LogsNewsUpdate extends Component {
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
                    <div
                        style={{padding: 30}}
                        key={i}
                        className="logs-display">
                        <div>
                            <div>User id: {this.props.logs[i].userId}</div>
                            <h1>New state:</h1>
                            <div>Profile cover link: {this.props.logs[i].profileCover}</div>
                            <div>Profile picture link: {this.props.logs[i].profilePictureLink}</div>
                            <div>First name: {this.props.logs[i].firstName}</div>
                            <div>Last name: {this.props.logs[i].lastName}</div>
                            <div>Birthdate: {this.props.logs[i].birthDate}</div>
                            <div>City: {this.props.logs[i].city}</div>
                            <div>Country: {this.props.logs[i].country}</div>
                            <div>Profession: {this.props.logs[i].profession}</div>
                            <div>Company name: {this.props.logs[i].companyName}</div>
                        </div>
                        <div>
                            <h1>Old state:</h1>
                            <div>Profile cover link: {this.props.logs[i].profileCoverOld}</div>
                            <div>Profile picture link: {this.props.logs[i].profilePictureLinkOld}</div>
                            <div>First name: {this.props.logs[i].firstNameOld}</div>
                            <div>Last name: {this.props.logs[i].lastNameOld}</div>
                            <div>Birthdate: {this.props.logs[i].birthDateOld}</div>
                            <div>City: {this.props.logs[i].cityOld}</div>
                            <div>Country: {this.props.logs[i].countryOld}</div>
                            <div>Profession: {this.props.logs[i].professionOld}</div>
                            <div>Company name: {this.props.logs[i].companyNameOld}</div>
                        </div>
                        <div>
                            <h1>Date and time:</h1>
                            <div>{date.toString()}</div>
                        </div>
                    </div>
                )
            }
        });

        return (
            <div>
                <div className="logs-wrap">
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </div>
                {rows}
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

export default LogsNewsUpdate;