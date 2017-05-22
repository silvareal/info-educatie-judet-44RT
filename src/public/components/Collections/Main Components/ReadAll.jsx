import React, { Component } from 'react';

import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';

class ReadAll extends Component {
    render(){
        return(
            <div>
                <TopActions
                            handleKeyPress={this.props.handleKeyPress}
                            searchQuery={this.props.searchQuery}
                            onQueryChange={this.props.onQueryChange}
                            onSearch={this.props.onSearch}
                />
                <ViewTable
                    collections={this.props.collections}
                    errorMessage={this.props.errorMessage}
                />
            </div>
        );
    }
}

export default ReadAll