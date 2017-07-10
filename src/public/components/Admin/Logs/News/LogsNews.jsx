import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Card,
    CardActions,
    CardHeader
} from 'material-ui';

class LogsNews extends Component {
    render() {

        const styles = {
            cardHeader: {
                textAlign: "center"
            },
            buttons: {
                padding: 20,
                background: "transparent",
                boxShadow: "none"
            }
        };

        return (
            <div>
                <div className="top-bar-spacing"/>
                <Card className="container-logs" style={{boxShadow: "none"}}>
                    <div className="cancel-padding-cardHeader">
                        <CardHeader
                            style={styles.cardHeader}
                            title={<div className="logs-header">Logs news</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs`}>
                                <RaisedButton
                                    primary={true}
                                    label="Back"
                                    buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                                    style={styles.buttons}
                                />
                            </Link>
                        </div>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/news/create`}>
                                <RaisedButton
                                    primary={true}
                                    label="Create logs"
                                    buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                                    style={styles.buttons}
                                />
                            </Link>
                        </div>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/news/update`}>
                                <RaisedButton
                                    primary={true}
                                    label="Update logs"
                                    buttonStyle={{backgroundColor: "#9b9b9b"}}
                                    style={styles.buttons}
                                />
                            </Link>
                        </div>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/news/delete`}>
                                <RaisedButton
                                    primary={true}
                                    label="Delete logs"
                                    buttonStyle={{backgroundColor: "#ee6e73"}}
                                    style={styles.buttons}
                                />
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default LogsNews;