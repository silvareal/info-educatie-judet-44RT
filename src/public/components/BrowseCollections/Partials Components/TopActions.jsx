import React, {Component} from 'react';
import {TextField, IconButton} from 'material-ui';
import ActionSearch from 'material-ui/svg-icons/action/search';

class TopActions extends Component {
    render() {
        return (
            <div className="top-actions">
                <div className="capsules"/>
                <div className="capsules" style={{justifyContent: "flex-end"}}>
                    <TextField
                        type="text"
                        hintText="Search..."
                        value={this.props.searchQuery}
                        onChange={this.props.onQueryChange}
                        onKeyDown={this.props.handleKeyPress}
                    />
                    <IconButton onTouchTap={this.props.onSearch}>
                        <ActionSearch/>
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default TopActions