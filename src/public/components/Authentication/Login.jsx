import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

class Login extends Component {

    render() {
        const styles = {
            button: {
                width: '100%'
            }
        };
        return (
            <div>
                <div className="top-bar-spacing"/>
                <Card className="container-login" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                    <div className="content-login">
                        <form action="/" onSubmit={this.props.onSubmit}>
                            <div className="login-header">Login</div>

                            {this.props.errors && this.props.errors.summary &&
                            <div className="error-message">{this.props.errors.summary}</div>}
                            {this.props.message ?
                                <div className="error-message">{this.props.message}</div>
                                :
                                null
                            }
                            <div>
                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Email"
                                        name="email"
                                        value={this.props.user.email}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors ? this.props.errors.email : null}
                                        autoFocus={true}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#000000", opacity: 0.8}}
                                        floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                        underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                                    />
                                </div>

                                <div className="input-field">
                                    <TextField
                                        floatingLabelText="Password"
                                        type="password"
                                        name="password"
                                        value={this.props.user.password}
                                        onChange={this.props.onChange}
                                        errorText={this.props.errors ? this.props.errors.password : null}
                                        style={{minWidth: "100%"}}
                                        inputStyle={{color: "#000000", opacity: 0.8}}
                                        floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                        underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                                    />
                                </div>

                                <div className="button-login-signup">
                                    <RaisedButton
                                        onClick={this.props.onSubmit}
                                        style={styles.button}
                                        labelStyle={{color: "#ffffff"}}
                                        buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                                        label="Log in"
                                        type="submit"
                                    />
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
