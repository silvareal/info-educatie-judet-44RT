import React, {Component} from 'react';
import {
    Tabs,
    Tab,
    Card,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    Dialog,
    RaisedButton,
    TextField,
    DatePicker
} from 'material-ui';

import {Link} from 'react-router';


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open1: false,
            open2: false
        };
    }

    handleOpen1 = () => {
        this.setState({open1: true});
    };

    handleClose1 = () => {
        this.setState({open1: false});
    };

    handleOpen2 = () => {
        this.setState({open2: true});
    };

    handleClose2 = () => {
        this.setState({open2: false});
    };

    //combine saving to localStorage of backup credentials with the modal open effect.
    //when canceled, the component must have the same state as before and we set it with the data stored in localStorage before the edit attempt.
    combineOpenFunctions1 = () => {
        this.props.onEdit();
        this.handleOpen1();
    };

    combineOpenFunctions2 = () => {
        this.props.onEdit();
        this.handleOpen2();
    };

    combineCloseFunctions1 = () => {
        this.props.onCancelEdit();
        this.handleClose1();
    };

    combineCloseFunctions2 = () => {
        this.props.onCancelEdit();
        this.handleClose2();
    };

    render() {
        const actions1 = [
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose1}
                onClick={this.props.onCancelEdit}
            />,
            <RaisedButton
                label="Save"
                primary={true}
                onTouchTap={this.handleClose1}
                onClick={this.props.onSave}
            />,
        ];

        const actions2 = [
            <RaisedButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose2}
                onClick={this.props.onCancelEdit}
            />,
            <RaisedButton
                label="Save"
                primary={true}
                onTouchTap={this.handleClose2}
                onClick={this.props.onSave}
            />
        ];

        const DateTimeFormat = global.Intl.DateTimeFormat;

        if (this.props.ownUser == true) {
            return (
                <div className="profile-wrap">
                    <Card className="profile-left">
                        <div className="profile-picture-wrap">
                            <img
                                src={this.props.profilePictureLink}
                                alt=""
                                style={{width: 100 + '%', height: 100 + '%'}}
                                onClick={this.combineOpenFunctions1}
                            />
                        </div>
                        <Dialog
                            title="Change profile picture"
                            actions={actions1}
                            modal={false}
                            open={this.state.open1}
                            onRequestClose={this.combineCloseFunctions1}
                        >
                            <TextField
                                type="text"
                                floatingLabelText="Profile picture link"
                                value={this.props.profilePictureLink}
                                onChange={this.props.onProfilePictureLinkChange}
                            />
                        </Dialog>
                        <div className="user-name-wrap">{this.props.userName}</div>

                        <div className="latest-post">
                            {this.props.latestCollection[0] ?
                                <Link to={`/manage/readOne/${this.props.latestCollection[0]._id}`}>
                                    <header>Latest post</header>
                                    <img
                                        src={this.props.latestCollection[0].picturesArray[0].pictureLink}
                                        alt={this.props.latestCollection[0].collectionName}
                                    />
                                </Link> : null
                            }
                        </div>
                    </Card>
                    <Card className="profile-right">
                        <div className="cover-wrap">
                            <img
                                src={this.props.profileCover}
                                alt=""
                                style={{width: 100 + '%', height: 100 + '%'}}
                                onClick={this.combineOpenFunctions2}
                            />
                        </div>
                        <Dialog
                            title="Change cover picture"
                            actions={actions2}
                            modal={false}
                            open={this.state.open2}
                            onRequestClose={this.combineCloseFunctions2}
                        >
                            <TextField
                                type="text"
                                floatingLabelText="Cover pictue link"
                                value={this.props.profileCover}
                                onChange={this.props.onProfileCoverChange}
                            />
                        </Dialog>
                        <Tabs>
                            <Tab label="Overview"
                                 onClick={this.props.onCancelEdit}>
                                <div className="content-wrap">
                                    <Table
                                        selectable={false}>
                                        <TableHeader displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Details about
                                                    : {this.props.userName}: </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>First name</TableRowColumn>
                                                <TableRowColumn>{this.props.firstName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Last name</TableRowColumn>
                                                <TableRowColumn>{this.props.lastName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Birthday</TableRowColumn>
                                                <TableRowColumn>{this.props.birthDate}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>City</TableRowColumn>
                                                <TableRowColumn>{this.props.city}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Country</TableRowColumn>
                                                <TableRowColumn>{this.props.country}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Profession</TableRowColumn>
                                                <TableRowColumn>{this.props.profession}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Company name</TableRowColumn>
                                                <TableRowColumn>{this.props.companyName}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </Tab>
                            <Tab label="Edit profile"
                                 onClick={this.props.onEdit}>
                                <div className="content-wrap">
                                    <Table selectable={false}>
                                        <TableHeader displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Editing profile</TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="First name"
                                                               value={this.props.firstName}
                                                               onChange={this.props.onFirstNameChange}
                                                               errorText={this.props.errors.firstName}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="Last name"
                                                               value={this.props.lastName}
                                                               onChange={this.props.onLastNameChange}
                                                               errorText={this.props.errors.lastName}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <DatePicker
                                                        autoOk={true}
                                                        hintText="Your birthdate"
                                                        firstDayOfWeek={0}
                                                        formatDate={new DateTimeFormat('en-US', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        }).format}
                                                        onChange={this.props.onBirthDateChange}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="City"
                                                               value={this.props.city}
                                                               onChange={this.props.onCityChange}
                                                               errorText={this.props.errors.city}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="Country"
                                                               value={this.props.country}
                                                               onChange={this.props.onCountryChange}
                                                               errorText={this.props.errors.country}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="Profession"
                                                               value={this.props.profession}
                                                               onChange={this.props.onProfessionChange}
                                                               errorText={this.props.errors.profession}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>
                                                    <TextField type="text"
                                                               floatingLabelText="Company name"
                                                               value={this.props.companyName}
                                                               onChange={this.props.onCompanyNameChange}
                                                               errorText={this.props.errors.companyName}
                                                    />
                                                </TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <RaisedButton
                                        label="Save changes"
                                        primary={true}
                                        onClick={this.props.onSave}/>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            );
        }
        else {
            //the user is not the one visiting this profile
            return (
                <div className="profile-wrap">
                    <Card className="profile-left">
                        <div className="profile-picture-wrap">
                            <img
                                src={this.props.profilePictureLink}
                                alt=""
                                style={{width: 100 + '%', height: 100 + '%'}}
                            />
                        </div>

                        <div className="user-name-wrap">{this.props.userName}</div>

                        <div className="latest-post">
                            {this.props.latestCollection[0] ?
                                <Link to={`/manage/readOne/${this.props.latestCollection[0]._id}`}>
                                    <header>Latest post</header>
                                    <img src={this.props.latestCollection[0].picturesArray[0].pictureLink}
                                         alt={this.props.latestCollection[0].collectionName}/>
                                </Link> : null
                            }
                        </div>
                    </Card>
                    <Card className="profile-right">
                        <div className="cover-wrap">
                            <img
                                src={this.props.profileCover}
                                alt=""
                                style={{width: 100 + '%', height: 100 + '%'}}
                            />
                        </div>
                        <Tabs>
                            <Tab label="Overview"
                                 onClick={this.props.onCancelEdit}>
                                <div className="content-wrap">
                                    <Table
                                        selectable={false}
                                    >
                                        <TableHeader displaySelectAll={false}>
                                            <TableRow>
                                                <TableHeaderColumn>Details about
                                                    : {this.props.userName}: </TableHeaderColumn>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableRowColumn>First name</TableRowColumn>
                                                <TableRowColumn>{this.props.firstName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Last name</TableRowColumn>
                                                <TableRowColumn>{this.props.lastName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Birthday</TableRowColumn>
                                                <TableRowColumn>{this.props.birthDate}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>City</TableRowColumn>
                                                <TableRowColumn>{this.props.city}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Country</TableRowColumn>
                                                <TableRowColumn>{this.props.country}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Profession</TableRowColumn>
                                                <TableRowColumn>{this.props.profession}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>Company name</TableRowColumn>
                                                <TableRowColumn>{this.props.companyName}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                            </Tab>
                        </Tabs>
                    </Card>
                </div>
            )
        }
    }
}

export default Profile