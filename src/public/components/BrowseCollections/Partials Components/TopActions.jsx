import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';

class TopActions extends Component {
    render() {
        return (
            <div className="top-actions">
                <div className="capsules"/>
                <div className="capsules">
                    <Link
                        to={`/admin/${this.props.userId}/collections/create`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Add a new collection"
                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                        />
                    </Link>
                </div>
                <div className="capsules"/>
            </div>
        );
    }
}

export default TopActions