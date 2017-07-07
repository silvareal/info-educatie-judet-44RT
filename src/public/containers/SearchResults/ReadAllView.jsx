import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadAll from '../../components/SearchResults/Main Components/ReadAll.jsx';
import * as searchActions from '../../actions/AppBar/searchActions.js';
import * as userActions from '../../actions/userCredentialsActions.js';
import LoadingIndicator from "../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let searchAllCollections = function (searchQuery) {
        dispatch(searchActions.onSearchAll(searchQuery))
    };

    let onLike = function (likedId) {
        dispatch(userActions.onLike(likedId))
    };

    let onUnlike = function (likedId) {
        dispatch(userActions.onUnlike(likedId))
    };

    let onCloseSnackBar = function () {
        dispatch(userActions.onCloseSnackBar())
    };

    return {
        searchAllCollections,
        onLike,
        onUnlike,
        onCloseSnackBar
    }
};

class ReadAllView extends Component {
    constructor(props) {
        super(props);

        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        if (typeof this.props.params._searchQuery === 'undefined' && typeof this.props.collections.collections === 'undefined') {
            this.context.router.replace('/collections');
        }
        else
            this.handlers.searchAllCollections(this.props.params._searchQuery);
    }

    render() {
        document.title = this.props.params._searchQuery;
        if (this.props.credentials.fetched === true)
        return <ReadAll
            collections={this.props.collections.collections}
            fetchedCollections={this.props.collections.fetchedCollections}
            fetchingCollections={this.props.collections.fetchingCollections}
            liked={this.props.credentials.liked}
            onLike={this.handlers.onLike}
            onUnlike={this.handlers.onUnlike}
            openSnackBarLikes={this.props.collections.openSnackBarLikes}
            onCloseSnackBar={this.handlers.onCloseSnackBar}
            dispatch={this.props.dispatch}
            context={this.context}
            admin={this.props.credentials.admin}
            userId={this.props.credentials.userId}
        />;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>
    }
}

ReadAllView.propTypes = {
    collections: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    fetchedCollections: PropTypes.bool,
    fetchingCollections: PropTypes.bool,
};

ReadAllView.contextTypes = {
    router: PropTypes.object.isRequired
};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: false,
            userId: ''
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            liked: state.userReducer.data.liked,
            admin: state.userReducer.data.admin,
            userId: state.userReducer.data.userId
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false,
            userId: ''
        }
};

const collections = (state) => {

    if (!state.searchReducer.allCollections)
        return {
            fetchingCollections: true,
            fetchedCollections: false
        };
    else if (state.searchReducer.allCollections && state.searchReducer.allCollections.length !== 0)
        return {
            collections: state.searchReducer.allCollections,
            fetchedCollections: true,
            fetchingCollections: false
        };
    else if (state.searchReducer.allCollections && state.searchReducer.allCollections.length === 0)
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collections: collections(state)
});

export default connect(mapStateToProps)(ReadAllView)