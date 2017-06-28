import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableRowColumn,
    TableHeaderColumn,
    Card,
    CardHeader,
    CardActions,
    ListItem,
    Divider
} from 'material-ui';

class LogsSignup extends Component {

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

        let rows1 = Object.keys(this.props.logs).map((i) => {
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                    <TableRow key={i}>
                        <TableRowColumn>{this.props.logs[i].email}</TableRowColumn>
                        <TableRowColumn>{this.props.logs[i].userName}</TableRowColumn>
                        <TableRowColumn>{date.toString()}</TableRowColumn>
                    </TableRow>
                )
            }
        });

        let rows2 = Object.keys(this.props.logs).map((i) => {
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                    <span key={i}>
                    <ListItem primaryText={this.props.logs[i].email}
                              secondaryText="Email"
                              disabled={true}/>
                        <ListItem primaryText={this.props.logs[i].userName}
                                  secondaryText="Username"
                                  disabled={true}/>
                        <Divider/>
                        <ListItem primaryText={date.toString()}
                                  secondaryText="Date and time"
                                  disabled={true}/>
                      <Divider style={styles.divider}/>
                    </span>
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
                            title={<div className="logs-header">Logs signup</div>}/>
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

                    <div className="hide-table-mobile">
                        <Table
                            selectable={false}>
                            <TableHeader displaySelectAll={false}>
                                <TableRow>
                                    <TableHeaderColumn>Email</TableHeaderColumn>
                                    <TableHeaderColumn>Username</TableHeaderColumn>
                                    <TableHeaderColumn>Time</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {rows1}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="hide-list-desktop">
                        {rows2}
                    </div>
                </Card>
            </div>
        )
    }

}

export default LogsSignup;