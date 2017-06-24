import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReadAll from '../../components/Collections/Main Components/ReadAll.jsx';
import {connect} from 'react-redux';
import * as collectionsActions from '../../actions/Collections/manageCollectionsReadAllActions.js';
import * as collectionsHomeViewActions from '../../actions/collectionsHomeViewActions.js';
import * as shouldUpdateActions from '../../actions/shouldUpdateActions.js';

let createHandler = function (dispatch) {
    let updateCollectionsStore = function () {
        dispatch(collectionsActions.getAllCollections());
        dispatch(collectionsHomeViewActions.getCollectionsHomeView());
    };

    let removeShouldUpdate = function () {
        dispatch(shouldUpdateActions.removeShouldUpdate())
    };

    let loadMore = function (loadAfter) {
        dispatch(collectionsActions.onLoadMore(loadAfter))
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
        if (this.props.collections.finished === false && document.title === "Manage collections" && this.props.collections.requesting === false) {
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 300) {
                this.handlers.loadMore(this.props.collections.loadAfter);
            }
        }
    };

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    componentDidMount() {
        this.resetScroll();

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
        document.title = "Manage collections";
        return (
            <ReadAll
                fetchedCollections={this.props.collections.fetchedCollections}
                fetchingCollections={this.props.collections.fetchingCollections}
                collections={this.props.collections.collections}
            />
        );
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

// Map collections
const collections = (state) => {
    if (state.manageCollectionsReadAllReducer.fetching === true) {
        return {
            fetchingCollections: true
        }
    }
    else if (state.manageCollectionsReadAllReducer.collections) {
        const response = state.manageCollectionsReadAllReducer.collections.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false,
            loadAfter: state.manageCollectionsReadAllReducer.loadAfter,
            finished: state.manageCollectionsReadAllReducer.finished,
            requesting: state.manageCollectionsReadAllReducer.requesting
        }
    }
    else if (state.manageCollectionsReadAllReducer.fetched === false) {
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
    shouldUpdateCollections: shouldUpdateFunction(state)
});

export default connect(mapStateToProps)(ReadAllView)