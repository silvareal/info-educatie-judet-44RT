import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, TextField} from 'material-ui';

class TopActions extends Component {
    render() {
        return (
            <div style={{display: 'flex', flex: '1', justifyContent: 'center'}}>
                <Link
                    to="/manage/create">
                    <RaisedButton
                        type="button"
                        primary={true}
                        label="Add a new collection"
                    />
                </Link>
                <TextField
                    type="text"
                    onChange={this.props.onSearchChange}
                />
            </div>
        );
    }
}

export default TopActions