import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

class Login extends Component {
    render() {
        const styles = {
            button: {
                width: '100%',
            }
        };
        return (
            <div className="parallax-login">
                <div className="top-bar-spacing"/>
                <Card className="container-login" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <div className="content-login">
                        <form action="/" onSubmit={this.props.onSubmit}>
                            <div className="login-header">Login</div>

                            {this.props.errors.summary &&
                            <div className="error-message">{this.props.errors.summary}</div>}
                            <div>
                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Email"
                                        name="email"
                                        value={this.props.user.email}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors.email}
                                        autoFocus={true}
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

                                <div className="button-login-signup">
                                    <RaisedButton
                                        style={styles.button}
                                        buttonStyle={{backgroundColor: "#eb7077"}}
                                        type="submit" label="Log in" primary/>
                                </div>

                                <CardText>Don t have an account? <Link to='/signup'>Create one</Link>.</CardText>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Login;
