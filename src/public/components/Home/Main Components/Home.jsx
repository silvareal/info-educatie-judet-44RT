import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton, Snackbar} from 'material-ui';
import LoadingIndicator from '../../../components/Loading Indicator/LoadingIndicator.jsx';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    //the notification system here is a demonstration of how it must be used therefore not the place or final form of the notification Snackbar

    handleNotification = () => {
        this.setState({
            open: true
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.shouldUpdateCollections !== nextProps.shouldUpdateCollections && nextProps.shouldUpdateCollections === true)
            this.handleNotification();
    }

    render() {
        return (
            <div className="parallax-home">
                <div className="top-bar-spacing"/>
                <div className="section-title">Latest news</div>

                {this.props.fetchedNews ?
                    <div className="container-home">
                        <div className="news-desktop">
                            <ul>
                                <li style={{padding: 20}}>
                                    <Link to={`/news`}><RaisedButton label="Check out all news ever"
                                                                     style={{width: "100%"}}
                                                                     buttonStyle={{backgroundColor: "#eb7077"}}
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
                    :
                    <LoadingIndicator/>
                }

                <div className="section-title">Latest collections</div>
                {!this.props.fetchingCollections && this.props.fetchedCollections ?
                    <div className="container-home">
                        <div className="news-desktop">
                            <ul>
                                <li style={{padding: 20}}>
                                    <Link to={`/collections`}><RaisedButton label="Browse all collections ever added"
                                                                            style={{width: "100%"}}
                                                                            buttonStyle={{backgroundColor: "#eb7077"}}
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
                    :
                    <LoadingIndicator/>
                }

                <Snackbar open={this.state.open}
                          message="Times have changed, refresh to see the future"
                          autoHideDuration={6000}
                          onRequestClose={this.handleRequestClose}
                />

            </div>
        )
    }
}

export default Home;
