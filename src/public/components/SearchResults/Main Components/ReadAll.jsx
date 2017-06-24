import React, {Component} from 'react';

import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoCollectionsFound from '../Partials Components/NoCollectionsFound.jsx';

import {Card} from 'material-ui';

class ReadAll extends Component {
    render() {

        let modeComponent = <LoadingIndicator/>;

        if (this.props.fetchingCollections === true) {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === true) {
            modeComponent =
                <ViewTable
                    collections={this.props.collections}/>
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === false) {
            modeComponent = <NoCollectionsFound/>
        }

        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Manage collections</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    {modeComponent}
                </Card>
            </div>
        );
    }
}

export default ReadAll