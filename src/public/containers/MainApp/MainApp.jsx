import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import AppBarPersonal from '../../components/MainApp Partials/AppBar.jsx';
import {RouteTransition} from 'react-router-transition';
import ScrollButton from './ScrollToTopButton.jsx'

class MainApp extends Component {
    render() {

        if (this.props.location.pathname !== '/collections#') {
            return (
                <RouteTransition
                    pathname={this.props.location.pathname}
                    atEnter={{opacity: 0.3}}
                    atLeave={{opacity: 0.3}}
                    atActive={{opacity: 1}}
                >
                    <div>
                        <AppBarPersonal
                            profilePictureLink={this.props.profilePictureLink}
                            userId={this.props.userId}
                            userName={this.props.userName}
                            isAdmin={this.props.admin}
                        />

                        {this.props.children}
                        <ScrollButton/>

                        <div className="footer">
                            <ul className="footer-left">
                                <li>
                                    <Link to={`/`}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/collections`}>

                                        Browse all collections
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/news`}>
                                        See all recent news
                                    </Link>
                                </li>
                            </ul>
                            <ul className="footer-right">
                                <li>
                                    <Link to={`/contact`}>
                                        Contact our team
                                    </Link>
                                </li>
                                <li>
                                    <a href={`https://github.com/saniagh/info-educatie-judet-44RT`}
                                       target="_blank">
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </RouteTransition>
            )
        }
        else return (
            <div>
                <AppBarPersonal
                    profilePictureLink={this.props.profilePictureLink}
                    userId={this.props.userId}
                    userName={this.props.userName}
                    isAdmin={this.props.admin}
                />

                {this.props.children}
                <ScrollButton/>

                <div className="footer">
                    <ul className="footer-left">
                        <li>
                            <Link to={`/`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to={`/collections`}>

                                Browse all collections
                            </Link>
                        </li>
                        <li>
                            <Link to={`/news`}>
                                See all recent news
                            </Link>
                        </li>
                    </ul>
                    <ul className="footer-right">
                        <li>
                            <Link to={`/contact`}>
                                Contact our team
                            </Link>
                        </li>
                        <li>
                            <a href={`https://github.com/saniagh/info-educatie-judet-44RT`}
                               target="_blank">
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

MainApp.propTypes = {
    userId: PropTypes.string,
    userName: PropTypes.string,
    profilePictureLink: PropTypes.string,
    isAdmin: PropTypes.bool,
    children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    if (state.userReducer.fetching === true) {
        return {
            guest: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            admin: response.admin,
            guest: false
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true
        };
}

export default connect(mapStateToProps)(MainApp);