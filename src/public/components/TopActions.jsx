import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class TopActions extends Component {
    render() {
        return (
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
        );
    }
}

export default TopActions