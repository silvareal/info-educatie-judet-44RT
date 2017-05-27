import React, {Component} from 'react';
import {
    Tabs,
    Tab,
    Card,
    ListItem,
    List,
    Dialog,
    RaisedButton,
    TextField,
    DatePicker,
    CardMedia,
    CardTitle,
    CardText,
    Snackbar
} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';

import LoadingIndicator from '../Loading Indicator/LoadingIndicator.jsx';

import ImageCameraRoll from 'material-ui/svg-icons/image/camera-roll';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionSettings from 'material-ui/svg-icons/action/settings';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open1: false,
            open2: false,
            //initial index in the one containing credentials
            slideIndex: 1,
            openSnackbar: false
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

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    //combine saving to localStorage of backup credentials with the modal open effect.
    //when canceled, the component must have the same state as before and we set it with the data stored in localStorage before the edit attempt.
    combineOpenFunctions1 = (e) => {
        e.stopPropagation();
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

        const date = new Date(this.props.birthDate);

        const formattedDate =
            <div>
                {date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div className="parallax-profile">
                <div className="top-bar-spacing"/>
                {this.props.fetchedProfile ?
                    <Card className="container-profile" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                        <Card className="cover-container">
                            <CardMedia
                                onClick={this.props.ownUser ? this.combineOpenFunctions2 : null}
                                className="force-no-overlay-background"
                                overlay=
                                    {
                                        <Card style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                                            <CardMedia className="force-profile-picture-width">
                                                <img
                                                    onClick={this.props.ownUser ? this.combineOpenFunctions1 : null}
                                                    style={{borderRadius: "50%"}}
                                                    src={this.props.profilePictureLink ? this.props.profilePictureLink : "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"}/>
                                                <Dialog
                                                    title="Change profile picture"
                                                    actions={actions1}
                                                    modal={false}
                                                    open={this.state.open1}
                                                    onRequestClose={this.combineCloseFunctions1}
                                                    autoScrollBodyContent={true}
                                                >
                                                    <CardMedia>
                                                        <img
                                                            style={{borderRadius: "50%"}}
                                                            src={this.props.profilePictureLink ? this.props.profilePictureLink : "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"}/>
                                                    </CardMedia>
                                                    <TextField
                                                        floatingLabelText="Profile picture link"
                                                        value={this.props.profilePictureLink}
                                                        onChange={this.props.ownUser ? this.props.onProfilePictureLinkChange : null}
                                                        style={{width: "100%"}}
                                                    />
                                                </Dialog>
                                            </CardMedia>
                                        </Card>
                                    }>
                                <img
                                    src={this.props.profileCover ? this.props.profileCover : "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"}
                                    alt=""/>
                                <Dialog
                                    title="Change cover picture"
                                    actions={actions2}
                                    modal={false}
                                    open={this.state.open2}
                                    onRequestClose={this.combineCloseFunctions2}
                                    autoScrollBodyContent={true}
                                >
                                    <CardMedia>
                                        <img
                                            style={{borderRadius: "50%"}}
                                            src={this.props.profileCover ? this.props.profileCover : "https://www.petfinder.com/wp-content/uploads/2012/11/91615172-find-a-lump-on-cats-skin-632x475.jpg"}/>
                                    </CardMedia>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Cover pictue link"
                                        value={this.props.profileCover}
                                        onChange={this.props.ownUser ? this.props.onProfileCoverChange : null}
                                        style={{width: "100%"}}
                                    />
                                </Dialog>
                            </CardMedia>
                            <Card style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                                <CardTitle>
                                    {this.props.firstName ?
                                        <div className="profile-header">
                                            {this.props.firstName}
                                            <br/> {"@" + this.props.userName}</div>
                                        :
                                        <div className="profile-header">{this.props.userName}</div>}
                                </CardTitle>
                                <CardText>
                                    <Tabs onChange={this.handleChange}
                                          value={this.state.slideIndex}>
                                        <Tab icon={<ImageCameraRoll/>} value={0} onClick={this.props.onCancelEdit}/>
                                        <Tab icon={<ActionAccountBox/>} value={1} onClick={this.props.onCancelEdit}/>
                                        {this.props.ownUser ?
                                            <Tab icon={<ActionSettings/>} value={2} onClick={this.props.onEdit}/>
                                            :
                                            null
                                        }
                                    </Tabs>
                                    {this.props.ownUser ?
                                        <SwipeableViews index={this.state.slideIndex}
                                                        onChangeIndex={this.handleChange}
                                                        animateHeight={true}
                                        >
                                            <div>
                                                <div>
                                                    {this.props.rows ? this.props.rows : null}
                                                </div>
                                                <div className="mobile-whitespace-fill-profile">
                                                    {this.props.rows2 ? this.props.rows2 : null}
                                                </div>
                                            </div>
                                            <div>
                                                <List>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.firstName}</div>}
                                                              secondaryText="First name"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.lastName}</div>}
                                                              secondaryText="Last name"/>
                                                    <ListItem disabled={true} primaryText={formattedDate}
                                                              secondaryText="Birthday"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.profession}</div>}
                                                              secondaryText="Job"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.companyName}</div>}
                                                              secondaryText="Company name"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.city}</div>}
                                                              secondaryText="Lives in"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.country}</div>}
                                                              secondaryText="Located in"/>
                                                </List>
                                            </div>
                                            <div>
                                                <List>
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="First name"
                                                                             value={this.props.firstName}
                                                                             onChange={this.props.onFirstNameChange}
                                                                             errorText={this.props.errors.firstName}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Last name"
                                                                             value={this.props.lastName}
                                                                             onChange={this.props.onLastNameChange}
                                                                             errorText={this.props.errors.lastName}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <DatePicker
                                                                      autoOk={true}
                                                                      hintText={formattedDate ? formattedDate : "Your birthday"}
                                                                      firstDayOfWeek={0}
                                                                      formatDate={new DateTimeFormat('en-US', {
                                                                          day: 'numeric',
                                                                          month: 'long',
                                                                          year: 'numeric',
                                                                      }).format}
                                                                      onChange={this.props.onBirthDateChange}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Job"
                                                                             value={this.props.profession}
                                                                             onChange={this.props.onProfessionChange}
                                                                             errorText={this.props.errors.profession}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Company name"
                                                                             value={this.props.companyName}
                                                                             onChange={this.props.onCompanyNameChange}
                                                                             errorText={this.props.errors.companyName}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="City"
                                                                             value={this.props.city}
                                                                             onChange={this.props.onCityChange}
                                                                             errorText={this.props.errors.city}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Country"
                                                                             value={this.props.country}
                                                                             onChange={this.props.onCountryChange}
                                                                             errorText={this.props.errors.country}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <RaisedButton
                                                                      label="Save changes"
                                                                      primary={true}
                                                                      onClick={this.props.onSave}/>}
                                                    />
                                                </List>
                                            </div>
                                        </SwipeableViews>
                                        :
                                        <SwipeableViews index={this.state.slideIndex}
                                                        onChangeIndex={this.handleChange}
                                                        animateHeight={true}
                                        >
                                            <div>
                                                <div>
                                                    {this.props.rows ? this.props.rows : null}
                                                </div>
                                                <div className="mobile-whitespace-fill-profile">
                                                    {this.props.rows2 ? this.props.rows2 : null}
                                                </div>
                                            </div>
                                            <div>
                                                <List>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.firstName}</div>}
                                                              secondaryText="First name"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.lastName}</div>}
                                                              secondaryText="Last name"/>
                                                    <ListItem disabled={true} primaryText={formattedDate}
                                                              secondaryText="Birthday"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.profession}</div>}
                                                              secondaryText="Job"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.companyName}</div>}
                                                              secondaryText="Company name"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.city}</div>}
                                                              secondaryText="Lives in"/>
                                                    <ListItem disabled={true} primaryText={<div className="dialog-break-word">{this.props.country}</div>}
                                                              secondaryText="Located in"/>
                                                </List>
                                            </div>
                                        </SwipeableViews>
                                    }
                                </CardText>
                            </Card>
                        </Card>
                    </Card>
                    :
                    <LoadingIndicator/>
                }
                {this.props.successUpdate && this.props.successUpdate.toString() === "false" && this.props.ownUser ?
                    <Snackbar
                        open={true}
                        message="An error occurred"
                        onRequestClose={this.props.handleRequestClose}
                    />
                    :
                    null
                }
                {this.props.successUpdate && this.props.successUpdate.toString() === "true" && this.props.ownUser ?
                    <Snackbar
                        open={true}
                        message="Profile successfully updated!"
                        onRequestClose={this.props.handleRequestClose}
                    />
                    :
                    null
                }
            </div>
        );
    }
}

export default Profile