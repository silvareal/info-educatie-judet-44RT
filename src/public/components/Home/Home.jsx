import React, {Component} from 'react';
import {Link} from 'react-router';

import {RaisedButton} from 'material-ui';
import Auth from '../../modules/Auth.js';

class Home extends Component {
    render() {
        return (
            <div className="parallax">
                <div className="parallax-spacing"/>
                <div className="latest-news">Latest news</div>
                <div className="parallax-spacing"/>
                <div className="news-container">
                    <div className="news-desktop">
                        <ul>
                            <li style={{padding: 20}}>
                                <RaisedButton label="Write for us!" style={{width: "100%"}} primary={true}/>
                            </li>
                            {this.props.rowsNews1}
                        </ul>
                        <ul>
                            {this.props.rowsNews2}
                        </ul>
                    </div>
                    <div className="news-mobile">
                        <ul>
                            {this.props.rowsNews3}
                        </ul>
                    </div>
                </div>
                <div className="parallax-spacing"/>
                {/*
                    We use the same class names and style for both news and collections to avoid repeating ourselves
                */}
                <div className="latest-news">Latest collections</div>
                <div className="parallax-spacing"/>
                <div className="news-container">
                    <div className="news-desktop">
                        <ul>
                            <li style={{padding: 20}}>
                                {Auth.isUserAuthenticated() ?
                                    <Link to={`/manage/create`}><RaisedButton label="Add a collection"
                                                                              style={{width: "100%"}}
                                                                              primary={true}/></Link>
                                    :
                                    <Link to={`/login`}><RaisedButton label="Login to add collections!"
                                                                      style={{width: "100%"}} primary={true}/></Link>
                                }
                            </li>
                            {this.props.rowsCollections1}
                        </ul>
                        <ul>
                            {this.props.rowsCollections2}
                        </ul>
                    </div>
                    <div className="news-mobile">
                        <ul>
                            {this.props.rowsCollections3}
                        </ul>
                    </div>
                </div>
                <div className="parallax-spacing"/>
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
                                target="_blank"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Home;
