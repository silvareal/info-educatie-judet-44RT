import React, { Component } from 'react';

import TopActions from './TopActions.jsx';
import ViewTable from './ViewTable.jsx';

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