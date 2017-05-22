import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, TextField} from 'material-ui';

class TopActions extends Component {
    render() {
        return (
            <div style={{display: 'flex', flex: '1', justifyContent: 'center'}}>
                <div>
                <Link
                    to="/manage/create">
                    <RaisedButton
                        type="button"
                        primary={true}
                        label="Add a new collection"
                    />
                </Link>
                </div>
                <div>
                <TextField
                    type="text"
                    floatingLabelText="Search..."
                    value={this.props.searchQuery}
                    onChange={this.props.onQueryChange}
                    onKeyDown={this.props.handleKeyPress}
                />
                </div>
                <div>
                    <RaisedButton
                        type="button"
                        primary={true}
                        label="Search"
                        onTouchTap={this.props.onSearch}
                    />
                </div>
            </div>
        );
    }
}

export default TopActions