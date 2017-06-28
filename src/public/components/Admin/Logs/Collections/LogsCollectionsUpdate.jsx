import React, {Component} from 'react';
import {Link} from 'react-router';
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
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
            let counter1 = 0, counter2 = 0;
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {

                let contentState = convertFromRaw(JSON.parse(this.props.logs[i].collectionDescriptionRaw));
                const html = stateToHTML(contentState);
                let contentStateOld = convertFromRaw(JSON.parse(this.props.logs[i].collectionDescriptionRawOld));
                const htmlOld = stateToHTML(contentStateOld);

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
                        <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: html}}/>}
                                  secondaryText="Collection's description"
                                  disabled={true}/>
                        {Object.keys(this.props.logs[i].picturesArray).map((j) => {
                            counter1++;
                            let contentState = convertFromRaw(JSON.parse(this.props.logs[i].picturesArray[j].pictureDescriptionRaw));
                            const html = stateToHTML(contentState);
                            return (
                                <div key={j}>
                                    <Divider/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureName}
                                              secondaryText={"Picture's " + counter1 + " name"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureLink}
                                              secondaryText={"Picture's " + counter1 + " link"}
                                              disabled={true}/>
                                    <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: html}}/>}
                                              secondaryText={"Picture's " + counter1 + " description"}
                                              disabled={true}/>
                                </div>
                            )
                        })}
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
                        <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: htmlOld}}/>}
                                  secondaryText="Collection's description"
                                  disabled={true}/>
                        {Object.keys(this.props.logs[i].picturesArrayOld).map((j) => {
                            counter2++;
                            let contentState = convertFromRaw(JSON.parse(this.props.logs[i].picturesArrayOld[j].pictureDescriptionRaw));
                            const html = stateToHTML(contentState);
                            return (
                                <div key={j}>
                                    <Divider/>
                                    <ListItem primaryText={this.props.logs[i].picturesArrayOld[j].pictureName}
                                              secondaryText={"Picture's " + counter2 + " name"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArrayOld[j].pictureLink}
                                              secondaryText={"Picture's " + counter2 + " link"}
                                              disabled={true}/>
                                    <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: html}}/>}
                                              secondaryText={"Picture's " + counter2 + " description"}
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