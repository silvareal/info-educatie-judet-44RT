import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton} from 'material-ui';
class TopActions extends Component {
    render() {
        return (
            <div className="top-actions">
                <div className="capsules"/>
                <div className="capsules">
                    {this.props.admin === true ?
                        <Link
                            to={`/admin/${this.props.userId}/news/create`}>
                            <RaisedButton
                                type="button"
                                primary={true}
                                label="Add a new article"
                                buttonStyle={{backgroundColor: "#42ab9e"}}
                            />
                        </Link>
                        :
                        null
                    }
                </div>
                <div className="capsules"/>
            </div>
        );
    }
}

export default TopActions