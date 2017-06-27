import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoCollectionsFound from '../Partials Components/NoCollectionsFound.jsx';
import {Card, Dialog, RaisedButton} from 'material-ui';
import ReadOneView from '../../../containers/Collections/ReadOneView.jsx';
import * as readOneActions from '../../../actions/Collections/manageCollectionsReadOneActions.js';

let createHandler = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(readOneActions.getCollection(collectionId))
    };

    return {
        getCollection
    }
};

class ReadAll extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
        this.state = {
            open: false,
            collectionId: ""
        }
    }

    handleClose = () => {
        this.setState({open: false});
    };

    onClickCollection = (collectionId) => {
        this.handlers.getCollection(collectionId);
        this.setState({
            collectionId: collectionId,
            open: true
        })
    };

    render() {

        let modeComponent = <LoadingIndicator/>;

        if (this.props.fetchingCollections === true) {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === true) {
            modeComponent =
                <ViewTable
                    collections={this.props.collections}
                    onClickCollection={this.onClickCollection}
                />
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === false) {
            modeComponent = <NoCollectionsFound/>
        }

        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Manage collections</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    <TopActions/>
                    {modeComponent}
                    <Dialog
                        actions={<RaisedButton onClick={this.handleClose} label="Close me" primary={true}/>}
                        contentStyle={{width: "90%", height: "90%", maxWidth: 'none', maxHeight: 'none'}}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <ReadOneView collectionId={this.state.collectionId}/>
                    </Dialog>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    if (state.manageCollectionsReadAllReducer.fetching === true) {
        return {
            fetchingCollections: true,
            fetchedCollections: false
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

export default connect(mapStateToProps)(ReadAll)