import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Card,
    CardHeader,
    CardActions,
    List,
    ListItem,
    Divider
} from 'material-ui';

class LogsCollectionsUpdate extends Component {
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
            let counter = 0;
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                    <div key={i}>
                        <ListItem primaryText={this.props.logs[i].collectionId}
                                  secondaryText="Collection's id"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText="Collection's new information"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText={this.props.logs[i].userId}
                                  secondaryText="Owner's user id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionName}
                                  secondaryText="Collection's name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionDescriptionRaw}
                                  secondaryText="Collection's description in raw format"
                                  disabled={true}/>
                        {Object.keys(this.props.logs[i].picturesArray).map((j) => {
                            counter++;
                            return (
                                <div key={j}>
                                    <Divider/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureName}
                                              secondaryText={"Picture's " + counter + " name"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureLink}
                                              secondaryText={"Picture's " + counter + " link"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureDescriptionRaw}
                                              secondaryText={"Picture's " + counter + " description in raw format"}
                                              disabled={true}/>
                                </div>
                            )
                        })}
                        {counter = 0}
                        <Divider/>
                        <ListItem primaryText="Collection's old information"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText={this.props.logs[i].userIdOld}
                                  secondaryText="Owner's user id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionNameOld}
                                  secondaryText="Collection's name"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionDescriptionRawOld}
                                  secondaryText="Collection's description in raw format"
                                  disabled={true}/>
                        {Object.keys(this.props.logs[i].picturesArrayOld).map((j) => {
                            counter++;
                            return (
                                <div key={j}>
                                    <Divider/>
                                    <ListItem primaryText={this.props.logs[i].picturesArrayOld[j].pictureName}
                                              secondaryText={"Picture's " + counter + " name"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArrayOld[j].pictureLink}
                                              secondaryText={"Picture's " + counter + " link"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArrayOld[j].pictureDescriptionRaw}
                                              secondaryText={"Picture's " + counter + " description in raw format"}
                                              disabled={true}/>
                                </div>
                            )
                        })}
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
                            title={<div className="logs-header">Logs update collections</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/collections`}>
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

export default LogsCollectionsUpdate;