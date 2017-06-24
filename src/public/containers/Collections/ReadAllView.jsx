import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReadAll from '../../components/Collections/Main Components/ReadAll.jsx';
import Auth from '../../modules/Auth.js';
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

        this.state = {
            errorMessage: '',
            searchErrorMessage: '',
            searchQuery: '',
            searching: false,
            requesting: false
        };
    };

    onScroll = () => {
        if (this.props.collections.finished === false && document.title === "Manage collections" && this.state.searching === false && this.props.collections.requesting === false) {
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

    onQueryChange = (e) => {
        if (e.target.value.length === 0) {
            this.setState({searchQuery: e.target.value, searching: false, collections: this.state.collectionsPreSearch})
        }
        else
            this.setState({searchQuery: e.target.value});
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    };

    onSearch = () => {

        //if the search box is not empty
        if (this.state.searchQuery) {

            const searchQuery = encodeURIComponent(this.state.searchQuery);

            const formData = `searchQuery=${searchQuery}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/crud/searchCollections');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    //no collections found
                    if (xhr.response.errorMessage) {
                        this.setState({searchErrorMessage: xhr.response.errorMessage, collections: []});
                    }
                    else {
                        this.setState({collections: xhr.response.collections})
                    }
                }
            });
            xhr.send(formData);
            this.setState({searching: true});
        }
        else {
            this.setState({collections: this.state.collectionsPreSearch});
        }
    };

    render() {
        document.title = "Manage collections";
        return (
            <ReadAll
                fetchedCollections={this.props.collections.fetchedCollections}
                fetchingCollections={this.props.collections.fetchingCollections}
                handleKeyPress={this.handleKeyPress}
                onQueryChange={this.onQueryChange}
                searchQuery={this.state.searchQuery}
                collections={this.props.collections.collections}
                errorMessage={this.state.errorMessage}
                onSearch={this.onSearch}
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