import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadAll from '../../components/BrowseCollections/Main Components/ReadAll.jsx';
import * as collectionsActions from '../../actions/BrowseCollections/browseCollectionsReadAllActions.js';
import * as collectionsManageActions from '../../actions/Collections/manageCollectionsReadAllActions.js';
import * as collectionsHomeViewActions from '../../actions/collectionsHomeViewActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';
import * as collectionNamesActions from '../../actions/AppBar/collectionNamesActions.js';
import * as userActions from '../../actions/userCredentialsActions.js';
import LoadingIndicator from "../../components/Loading Indicator/LoadingIndicator.jsx";

let createHandler = function (dispatch) {
    let updateCollectionsStore = function () {
        dispatch(collectionsActions.getAllCollections());
        dispatch(collectionsManageActions.getAllCollections());
        dispatch(collectionsHomeViewActions.getCollectionsHomeView());
        dispatch(collectionNamesActions.getAllCollections());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate())
    };

    let loadMore = function (loadAfter) {
        dispatch(collectionsActions.onLoadMore(loadAfter))
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
        updateCollectionsStore,
        removeShouldUpdate,
        loadMore,
        onLike,
        onUnlike,
        onCloseSnackBar
    }
};

class ReadAllView extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    onLoadMoreCollections = () => {
        this.handlers.loadMore(this.props.collections.loadAfter)
    };

    componentDidMount() {
        if (this.props.shouldUpdateCollections && this.props.shouldUpdateCollections.shouldUpdateCollections) {
            this.handlers.updateCollectionsStore();
            this.handlers.removeShouldUpdate();
        }
    };

    render() {
        document.title = "Browse collections";
        if (this.props.credentials.fetched === true)
            return <ReadAll
                fetchedCollections={this.props.collections.fetchedCollections}
                fetchingCollections={this.props.collections.fetchingCollections}
                collections={this.props.collections.collections}
                liked={this.props.credentials.liked}
                onLike={this.handlers.onLike}
                onUnlike={this.handlers.onUnlike}
                openSnackBarLikes={this.props.collections.openSnackBarLikes}
                onCloseSnackBar={this.handlers.onCloseSnackBar}
                dispatch={this.props.dispatch}
                context={this.context}
                admin={this.props.credentials.admin}
                userId={this.props.credentials.userId}
                onLoadMoreCollections={this.onLoadMoreCollections}
                finished={this.props.collections.finished}
                router={this.props.router}
                location={this.props.location}
            />;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

ReadAllView.propTypes = {
    collections: React.PropTypes.shape({
        collections: PropTypes.array,
        fetchedCollections: PropTypes.bool,
        fetchingCollections: PropTypes.bool,
        loadAfter: PropTypes.number,
        finished: PropTypes.bool,
        requesting: PropTypes.bool
    }),
    shouldUpdateCollections: React.PropTypes.shape({
        shouldUpdateCollections: PropTypes.bool
    })
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

// Map collections
const collections = (state) => {
    if (state.browseCollectionsReadAllReducer.fetching === true) {
        return {
            fetchingCollections: true,
            fetchedCollections: false
        }
    }
    else if (state.browseCollectionsReadAllReducer.collections) {
        const response = state.browseCollectionsReadAllReducer.collections.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false,
            loadAfter: state.browseCollectionsReadAllReducer.loadAfter,
            finished: state.browseCollectionsReadAllReducer.finished,
            requesting: state.browseCollectionsReadAllReducer.requesting
        }
    }
    else if (state.browseCollectionsReadAllReducer.fetched === false) {
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
    }
};

// Map shouldUpdate
const shouldUpdateCollections = (state) => {
    if (state.shouldUpdateCollectionsReducer) {
        const response = state.shouldUpdateCollectionsReducer;
        return {
            shouldUpdateCollections: response.shouldUpdate
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collections: collections(state),
    shouldUpdateCollections: shouldUpdateCollections(state)
});

export default connect(mapStateToProps)(ReadAllView)