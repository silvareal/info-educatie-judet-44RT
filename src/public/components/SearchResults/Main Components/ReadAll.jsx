import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoCollectionsFound from '../Partials Components/NoCollectionsFound.jsx';
import {Card, Dialog, RaisedButton, Snackbar} from 'material-ui';
import ReadOneView from '../../../containers/BrowseCollections/ReadOneView.jsx'
import * as readOneActions from '../../../actions/BrowseCollections/browseCollectionsReadOneActions.js';

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
                    liked={this.props.liked}
                    onLike={this.props.onLike}
                    onUnlike={this.props.onUnlike}
                    context={this.props.context}
                    admin={this.props.admin}
                    userId={this.props.userId}/>
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === false) {
            modeComponent = <NoCollectionsFound/>
        }

        let openSnackBarLikes;

        if (typeof this.props.openSnackBarLikes === 'undefined')
            openSnackBarLikes = false;
        else if (typeof this.props.openSnackBarLikes !== 'undefined')
            openSnackBarLikes = this.props.openSnackBarLikes;

        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Manage collections</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    {modeComponent}

                    <Dialog
                        actions={<RaisedButton
                            onTouchTap={this.handleClose}
                            label="Close me"
                            primary={true}
                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        contentStyle={{width: "90%", height: "90%", maxWidth: 'none', maxHeight: 'none'}}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                        autoScrollBodyContent={true}
                    >
                        <ReadOneView collectionId={this.state.collectionId}
                                     dispatch={this.props.dispatch}
                        />
                    </Dialog>
                    <Snackbar message="Oops, something went wrong"
                              open={openSnackBarLikes}
                              onRequestClose={this.props.onCloseSnackBar}
                    />

                </Card>
            </div>
        );
    }
}

export default connect()(ReadAll)