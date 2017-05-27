import React, {Component} from 'react';

import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';

import {Card} from 'material-ui';

class ReadAll extends Component {
    render() {
        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Browse collections</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    <TopActions
                        handleKeyPress={this.props.handleKeyPress}
                        searchQuery={this.props.searchQuery}
                        onQueryChange={this.props.onQueryChange}
                        onSearch={this.props.onSearch}
                    />
                    {this.props.fetchedCollections ?
                        <ViewTable
                            collections={this.props.collections}
                            errorMessage={this.props.errorMessage}
                        />
                        :
                        <LoadingIndicator/>
                    }
                </Card>
            </div>
        );
    }
}

export default ReadAll