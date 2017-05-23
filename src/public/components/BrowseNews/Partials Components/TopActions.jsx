import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class TopActions extends Component {
    render() {
        return (
            <div>
                <Link
                    to={`/admin/${this.props.userId}/news/create`}>
                    <RaisedButton
                        type="button"
                        primary={true}
                        label="Add news to the homepage"
                    />
                </Link>
            </div>
        );
    }
}

export default TopActions