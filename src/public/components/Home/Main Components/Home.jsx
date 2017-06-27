import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton, Snackbar} from 'material-ui';
import LoadingIndicator from '../../../components/Loading Indicator/LoadingIndicator.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as homeViewActions from '../../../actions/newsHomeViewActions.js';

let createHandler = function (dispatch) {

    let onCloseSnackBar = function () {
        dispatch(homeViewActions.onCloseSnackBar())
    };

    return {
        onCloseSnackBar
    }
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onCloseSnackBar = () => {
        this.handlers.onCloseSnackBar();
    };

    render() {
        return (
            <div className="parallax-home">
                <div className="top-bar-spacing"/>
                <div className="section-title">Latest news</div>

                {this.props.fetchedNews === true ?
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
                    null
                }
                {
                    this.props.fetchedNews === false && this.props.fetchingNews === true ?
                        <LoadingIndicator/>
                        :
                        null
                }
                {
                    this.props.fetchedNews === false && this.props.fetchingNews === true ?
                        <div>
                            No news around
                        </div>
                        :
                        null
                }

                <div className="section-title">Latest collections</div>
                {this.props.fetchedCollections === true ?
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
                    null
                }
                {
                    this.props.fetchingCollections === true && this.props.fetchedCollections === false ?
                        <LoadingIndicator/>
                        :
                        null
                }
                {
                    this.props.fetchingCollections === false && this.props.fetchedCollections === false ?
                        <div>
                            No collections so far
                        </div>
                        :
                        null
                }

                <Snackbar message="Comment successfully added"
                          open={this.props.openSnackBar}
                          autoHideDuration={6000}
                          onRequestClose={this.onCloseSnackBar}
                />

            </div>
        )
    }
}

Home.propTypes = {
    openSnackBar: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        openSnackBar: state.newsHomeViewReducer.openSnackBar
    }
};

export default connect(mapStateToProps)(Home)