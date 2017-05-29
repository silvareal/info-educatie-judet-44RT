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

class LogsNewsDelete extends Component {
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
                        <ListItem primaryText={this.props.logs[i].newsId}
                                  secondaryText="Article's id"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].newsTitle}
                                  secondaryText="Article's title"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].newsDescriptionRaw}
                                  secondaryText="Article's description in raw format"
                                  disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].newsCoverLink}
                                  secondaryText="Article's cover photo link"
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
                            title={<div className="logs-header">Logs delete news articles</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/news`}>
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

export default LogsNewsDelete;