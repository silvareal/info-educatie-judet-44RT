import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReadAll from '../../../components/Admin/Collections/Main Components/ReadAll.jsx';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import {connect} from 'react-redux';
import * as readActions from '../../../actions/Admin/Collections/manageCollectionsReadAllActionsAdmin.js';
import * as collectionsHomeViewActions from '../../../actions/collectionsHomeViewActions.js';
import * as collectionsBrowseActions from '../../../actions/Browse/browseCollectionsReadAllActions.js';
import * as collectionsManageActions from '../../../actions/Collections/manageCollectionsReadAllActions.js';
import * as shouldUpdateActions from '../../../actions/shouldUpdateActions.js';

let createHandler = function (dispatch) {
    let updateCollectionsStore = function () {
        dispatch(readActions.getAllCollections());
        dispatch(collectionsManageActions.getAllCollections());
        dispatch(collectionsBrowseActions.getAllCollections());
        dispatch(collectionsHomeViewActions.getCollectionsHomeView());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate())
    };

    let loadMore = function (loadAfter) {
        dispatch(readActions.onLoadMore(loadAfter))
    };

    return {
        updateCollectionsStore,
        removeShouldUpdate,
        loadMore
    }
};

class ReadAllView extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    onScroll = () => {
        if (this.props.collections.finished === false && document.title === "Manage collections - Admin Controlled" && this.props.collections.requesting === false) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 300) {
                this.handlers.loadMore(this.props.collections.loadAfter);
            }
        }
    };

    componentDidMount() {
        if (this.props.shouldUpdateCollections && this.props.shouldUpdateCollections.shouldUpdateCollections) {
            this.handlers.updateCollectionsStore();
            this.handlers.removeShouldUpdate();
        }

        //the load more event listener
        window.addEventListener('scroll', this.onScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        document.title = "Manage collections - Admin Controlled";
        if (this.props.credentials.admin === true)
        return <ReadAll
            fetchedCollections={this.props.collections.fetchedCollections}
            fetchingCollections={this.props.collections.fetchingCollections}
            collections={this.props.collections.collections}
            adminId={this.props.params._id}
        />;
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

ReadAllView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
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

// Map credentials
const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

// Map collections
const collections = (state) => {
    if (state.manageCollectionsReadAllReducerAdmin.fetching === true) {
        return {
            fetchingCollections: true,
            fetchedCollections: false
        }
    }
    else if (state.manageCollectionsReadAllReducerAdmin.collections) {
        const response = state.manageCollectionsReadAllReducerAdmin.collections.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false,
            loadAfter: state.manageCollectionsReadAllReducerAdmin.loadAfter,
            finished: state.manageCollectionsReadAllReducerAdmin.finished,
            requesting: state.manageCollectionsReadAllReducerAdmin.requesting
        }
    }
    else if (state.manageCollectionsReadAllReducerAdmin.fetched === false) {
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
    }
};

// Map shouldUpdate
const shouldUpdateFunction = (state) => {
    if (state.shouldUpdateCollectionsReducer) {
        const response = state.shouldUpdateCollectionsReducer;
        return {
            shouldUpdateCollections: response.shouldUpdate
        }
    }
};

const mapStateToProps = (state) => ({
    collections: collections(state),
    shouldUpdateCollections: shouldUpdateFunction(state),
    credentials: credentials(state)
});

export default connect(mapStateToProps)(ReadAllView)