import React, {Component} from 'react';
import {Link} from 'react-router';

import {RaisedButton} from 'material-ui';
import Auth from '../../../modules/Auth.js';

class Home extends Component {
    render() {
        return (
            <div className="parallax-home">
                <div className="top-bar-spacing"/>
                <div className="section-title">Latest news</div>
                <div className="container-home">
                    <div className="news-desktop">
                        <ul>
                            <li style={{padding: 20}}>
                                <Link to={`/news`}><RaisedButton label="Check out all news ever"
                                                                        style={{width: "100%"}}
                                                                        primary={true}/></Link>
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
                {/*
                    We use the same class names and style for both news and collections to avoid repeating ourselves
                */}
                <div className="section-title">Latest collections</div>
                <div className="container-home">
                    <div className="news-desktop">
                        <ul>
                            <li style={{padding: 20}}>
                                    <Link to={`/collections`}><RaisedButton label="Browse all collections ever added"
                                                                              style={{width: "100%"}}
                                                                              primary={true}/></Link>
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
            </div>
        )
    }
}

export default Home;
