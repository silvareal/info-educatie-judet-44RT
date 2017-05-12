import React, {Component} from 'react';
import {Card} from 'material-ui';
import {Link} from 'react-router';

import Auth from '../modules/Auth.js';

class Home extends Component {
    render() {
        return (
            <Card className="container">
                {Auth.isUserAuthenticated() ? <div>
                    <div><Link to="/manage">Manage</Link></div>
                    <div><Link to={`/profile/${this.props.userName}`}>Profile</Link></div>
                    {this.props.userId ? <div>
                        <Link to={`/admin/${this.props.userId}`}>Admin panel</Link>
                    </div> : null}
                </div>
                    : null}
            </Card>
        )
    }
}

export default Home;
