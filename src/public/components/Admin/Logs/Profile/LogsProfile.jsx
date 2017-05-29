import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Card,
    CardHeader,
    CardActions,
    Divider,
    List,
    ListItem
} from 'material-ui';

class LogsNewsUpdate extends Component {
    render() {

        const styles = {
            cardHeader: {
                textAlign: "center"
            },
            buttons: {
                padding: 20,
                background: "transparent",
                boxShadow: "none"
            },
            divider: {
                height: 5,
                backgroundColor: "#42ab9e"
            }
        };

        let rows = Object.keys(this.props.logs).map((i) => {
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                    <div key={i}>
                        <ListItem primaryText={this.props.logs[i].userId}
                                  secondaryText="User's id"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText="New profile information"/>
                        <ListItem primaryText={this.props.logs[i].firstName}
                                  secondaryText="First name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].lastName}
                                  secondaryText="Last name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].birthDate}
                                  secondaryText="Birthday"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].profession}
                                  secondaryText="Job"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].companyName}
                                  secondaryText="Company name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].city}
                                  secondaryText="Lives in"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].country}
                                  secondaryText="Located in"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].profileCover}
                                  secondaryText="Profile cover link"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].profilePictureLink}
                                  secondaryText="Profile picture link"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText="Old profile information"/>
                        <ListItem primaryText={this.props.logs[i].firstNameOld}
                                  secondaryText="First name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].lastNameOld}
                                  secondaryText="Last name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].birthDateOld}
                                  secondaryText="Birthday"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].professionOld}
                                  secondaryText="Job"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].companyNameOld}
                                  secondaryText="Company name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].cityOld}
                                  secondaryText="Lives in"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].countryOld}
                                  secondaryText="Located in"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].profileCoverOld}
                                  secondaryText="Profile cover link"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].profilePictureLinkOld}
                                  secondaryText="Profile picture link"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText={date.toString()}
                                  secondaryText="Date and time"
                                  disabled={true}/>
                        <Divider/>
                        <Divider style={styles.divider}/>
                    </div>
                )
            }
        });

        return (
            <div className="break-word-logs">
                <div className="top-bar-spacing"/>
                <Card className="container-logs" style={{boxShadow: "none"}}>
                    <div className="cancel-padding-cardHeader">
                        <CardHeader
                            style={styles.cardHeader}
                            title={<div className="logs-header">Logs profile update</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs`}>
                                <RaisedButton
                                    primary={true}
                                    label="Back"
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                    style={styles.buttons}
                                />
                            </Link>
                        </div>
                    </CardActions>
                    <List>
                        {rows}
                    </List>
                </Card>

            </div>
        )
    }
}

export default LogsNewsUpdate;