import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Card,
    CardActions,
    CardHeader
} from 'material-ui';

class Logs extends Component {

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
                            title={<div className="logs-header">Logs overview</div>}/>
                    </div>
                    <CardActions>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/login`}>
                                <RaisedButton
                                    primary={true}
                                    label="Login logs"
                                    style={styles.buttons}
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                />
                            </Link>
                            <Link to={`/admin/${this.props.userId}/logs/signup`}>
                                <RaisedButton
                                    primary={true}
                                    label="Logs signup"
                                    style={styles.buttons}
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                />
                            </Link>
                        </div>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/news`}>
                                <RaisedButton
                                    primary={true}
                                    label="Logs news"
                                    style={styles.buttons}
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                />
                            </Link>
                            <Link to={`/admin/${this.props.userId}/logs/collections`}>
                                <RaisedButton
                                    primary={true}
                                    label="Logs collections"
                                    style={styles.buttons}
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                />
                            </Link>
                        </div>
                        <div className="card-action-logs">
                            <Link to={`/admin/${this.props.userId}/logs/profile`}>
                                <RaisedButton
                                    primary={true}
                                    label="Logs profile update"
                                    style={styles.buttons}
                                    buttonStyle={{backgroundColor: "#42ab9e"}}
                                />
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            </div>
        )
    }

}

export default Logs;