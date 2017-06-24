import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReadAll from '../../components/SearchResults/Main Components/ReadAll.jsx';
import * as searchActions from '../../actions/AppBar/searchActions.js';

let createHandler = function (dispatch) {
    let searchAllCollections = function (searchQuery) {
        dispatch(searchActions.onSearchAll(searchQuery))
    };

    return {
        searchAllCollections
    }
};

class ReadAllView extends Component {
    constructor(props) {
        super(props);

        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        if (typeof this.props.collections === 'undefined' && this.props.params._searchQuery) {
            this.handlers.searchAllCollections(this.props.params._searchQuery)
        }
        else if (typeof this.props.params._searchQuery === 'undefined' && typeof this.props.collections === 'undefined') {
            this.context.router.replace('/collections');
        }
    }

    render() {
        return <ReadAll
            collections={this.props.collections}
            fetchedCollections={this.props.fetchedCollections}
            fetchingCollections={this.props.fetchingCollections}
        />
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

const mapStateToProps = (state) => {

    if (!state.searchReducer.allCollections)
        return {
            fetchingCollections: true,
            fetched: false
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

export default connect(mapStateToProps)(ReadAllView)