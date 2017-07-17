import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Card,
    CardActions,
    CardHeader,
    List,
    ListItem,
    Divider
} from 'material-ui';

class LogsCollectionsCreate extends Component {
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
                                  secondaryText="Creator's user id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionName}
                                  secondaryText="Collection's name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].createdByAdmin.toString()}
                                  secondaryText="Created by admin ?"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText={date.toString()}
                                  secondaryText="Date and time"
                                  disabled={true}/>
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
                            title={<div className="logs-header">Logs create collections</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/collections`}>
                                <RaisedButton
                                    primary={true}
                                    label="Back"
                                    buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
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

export default LogsCollectionsCreate;