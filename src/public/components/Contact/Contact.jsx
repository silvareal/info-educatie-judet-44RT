import React, {Component} from 'react';

import {TextField, Card, CardActions, RaisedButton} from 'material-ui';

class Contact extends Component {
    render() {
        const styles = {
            cardText: {
                textAlign: "center",
                background: "transparent",
                height: "100%"
            },
            card: {
                background: "transparent",
                boxShadow: "none",
                height: "100%"
            },
            cardInput: {
                padding: 20
            },
            textField: {
                width: "100%"
            }
        };
        return (
            <div className="parallax-contact">
                <div className="top-bar-spacing"/>
                <Card className="container-contact" style={styles.card}>
                    <Card style={styles.card}>
                        <div style={styles.cardText}>
                            <div className="contact-header">
                                Contact
                            </div>
                            <Card style={styles.cardInput}>
                                {this.props.success ?
                                    <div className="success-message-contact">
                                        Feedback successfully added!
                                    </div> : null}
                                <TextField value={this.props.feedback}
                                           onChange={this.props.onFeedbackChange}
                                           errorText={this.props.errors && this.props.errors.feedback ? this.props.errors.feedback : null}
                                           hintText="Write us anything you want to see improve or added"
                                           multiLine={true}
                                           rows={1}
                                           rowsMax={20}
                                           style={styles.textField}
                                />
                                <CardActions>
                                    <RaisedButton label="Send feedback"
                                                  primary={true}
                                                  onTouchTap={this.props.onSave}/>
                                </CardActions>
                            </Card>
                        </div>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default Contact