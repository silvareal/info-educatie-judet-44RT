import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText, RaisedButton, TextField} from 'material-ui';

class SignUp extends Component {
    render() {

        const styles = {
            button: {
                width: '256px',
            }
        };

        return (
            <Card className="container">
                <form action="/" onSubmit={this.props.onSubmit}>
                    <div className="signup-header">Sign Up</div>

                    {this.props.errors.summary && <div className="error-message">{this.props.errors.summary}</div>}

                    <div>
                        <div className="input-field">
                            <TextField
                                floatingLabelText="Username"
                                name="name"
                                value={this.props.user.name}
                                onChange={this.props.onChange}
                                errorText={this.props.errors.name}
                            />
                        </div>

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

                        <div className="button-line">
                            <RaisedButton
                                style={styles.button}
                                type="submit" label="Create New Account" primary/>
                        </div>

                        <CardText>Already a member? <Link to='/login'>Log in</Link></CardText>
                    </div>
                </form>
            </Card>
        );
    }
}


export default SignUp;
