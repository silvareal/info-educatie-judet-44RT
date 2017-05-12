import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types'

import Auth from '../modules/Auth';

const MainApp = ({children}) => (
    <div>
        <div className="top-bar">
            <div className="logo">
                <Link to="/">44RT</Link>
            </div>
            {Auth.isUserAuthenticated() ?

                (<div className="actions">
                    <Link to="/logout">Log out</Link>
                </div>)

                :

                (<div className="actions">
                    <Link to="/login">Log in</Link>
                    <Link to="/signup">Sign up</Link>
                </div>)

            }
        </div>
        {children}
    </div>
);

MainApp.propTypes = {
    children: PropTypes.object.isRequired
};

export default MainApp;
