import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

class Login extends Component {
    render() {

        const styles = {
            button: {
                width: '256px',
            }
        };

        return (
            <Card className="container">
                <form action="/" onSubmit={this.props.onSubmit}>
                    <div className="login-header">Login</div>

                    {this.props.successMessage && <div className="success-message">{this.props.successMessage}</div>}
                    {this.props.errors.summary && <div className="error-message">{this.props.errors.summary}</div>}
                    <div>
                        <div className="input-field">
                            <TextField
                                floatingLabelText="Email"
                                name="email"
                                value={this.props.user.email}
                                onChange={this.props.onChange}
                                errorText={this.props.errors.email}
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
                            />
                        </div>

                        <div className="button-login-signup">
                            <RaisedButton
                                style={styles.button}
                                type="submit" label="Log in" primary/>
                        </div>

                        <CardText>Don t have an account? <Link to='/signup'>Create one</Link>.</CardText>
                    </div>
                </form>
            </Card>
        )
    }
}

export default Login;