import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

class SignUp extends Component {
    render() {
        const styles = {
            button: {
                width: '100%',
            }
        };
        return (
            <div className="parallax-signup">
                <div className="top-bar-spacing"/>
                <Card className="container-signup" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <div className="content-signup">
                        <form action="/" onSubmit={this.props.onSubmit}>
                            <div className="signup-header">Sign Up</div>

                            {this.props.errors.summary &&
                            <div className="error-message">{this.props.errors.summary}</div>}

                            <div>
                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Username"
                                        name="name"
                                        value={this.props.user.name}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors.name}
                                        autoFocus={true}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#ee6e73"}}
                                        floatingLabelStyle={{color: "#ee6e73"}}
                                        underlineFocusStyle={{borderColor: "#ee6e73"}}
                                    />
                                </div>

                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Email"
                                        name="email"
                                        value={this.props.user.email}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors.email}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#ee6e73"}}
                                        floatingLabelStyle={{color: "#ee6e73"}}
                                        underlineFocusStyle={{borderColor: "#ee6e73"}}
                                    />
                                </div>

                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Password"
                                        type="password"
                                        name="password"
                                        value={this.props.user.password}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors.password}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#ee6e73"}}
                                        floatingLabelStyle={{color: "#ee6e73"}}
                                        underlineFocusStyle={{borderColor: "#ee6e73"}}
                                    />
                                </div>

                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Confirm password"
                                        type="password"
                                        name="confirmPassword"
                                        value={this.props.user.confirmPassword}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors.confirmPassword}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#ee6e73"}}
                                        floatingLabelStyle={{color: "#ee6e73"}}
                                        underlineFocusStyle={{borderColor: "#ee6e73"}}
                                    />
                                </div>

                                <div className="button-line">
                                    <RaisedButton
                                        style={styles.button}
                                        buttonStyle={{backgroundColor: "#eb7077"}}
                                        labelStyle={{color: "#ffffff"}}
                                        type="submit" label="Create New Account" primary/>
                                </div>

                                <CardText style={{textAlign: "center"}}>Already a member? <Link to='/login'>Log
                                    in</Link></CardText>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        );
    }
}


export default SignUp;

