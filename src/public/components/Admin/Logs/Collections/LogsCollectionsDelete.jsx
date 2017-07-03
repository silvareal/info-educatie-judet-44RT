import React, {Component} from 'react';
import {Link} from 'react-router';
import {stateToHTML} from 'draft-js-export-html';
import {convertFromRaw} from 'draft-js';
import {
    RaisedButton,
    List,
    ListItem,
    CardHeader,
    CardActions,
    Card,
    Divider
} from 'material-ui';

class LogsCollectionsDelete extends Component {
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
                let contentState = convertFromRaw(JSON.parse(this.props.logs[i].collectionDescriptionRaw));
                const html = stateToHTML(contentState);
                return (
                    <div key={i}>
                        <ListItem primaryText={this.props.logs[i].userId}
                                  secondaryText="Deleter's user id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].ownerId}
                                  secondaryText="Creator's user id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionId}
                                  secondaryText="Collection's id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].collectionName}
                                  secondaryText="Collection's name"
                                  disabled={true}/>
                        <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: html}}/>}
                                  secondaryText="Collection's description"
                                  disabled={true}/>
                        {Object.keys(this.props.logs[i].picturesArray).map((j) => {
                            counter++;
                            let contentState = convertFromRaw(JSON.parse(this.props.logs[i].picturesArray[j].pictureDescriptionRaw));
                            const html = stateToHTML(contentState);
                            return (
                                <div key={j}>
                                    <Divider/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureName}
                                              secondaryText={"Picture's " + counter + " name"}
                                              disabled={true}/>
                                    <ListItem primaryText={this.props.logs[i].picturesArray[j].pictureLink}
                                              secondaryText={"Picture's " + counter + " link"}
                                              disabled={true}/>
                                    <ListItem primaryText={<div dangerouslySetInnerHTML={{__html: html}}/>}
                                              secondaryText={"Picture's " + counter + " description"}
                                              disabled={true}/>
                                </div>
                            )
                        })}
                        {this.props.logs[i].tags ?
                            this.props.logs[i].tags.map((data, i) => {
                                return <ListItem
                                    key={i}
                                    primaryText={data.value}
                                    secondaryText="Tag"
                                    disabled={true}/>
                            })
                            :
                            null
                        }
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
                            title={<div className="logs-header">Logs delete collections</div>}/>
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

export default LogsCollectionsDelete;