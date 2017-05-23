import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <div className="list">
                <div>
                    <div>
                        {this.props.news.newsTitle}
                    </div>
                    <Link
                        to={`/admin/${this.props.userId}/news/readOne/${this.props.news._id}`}>
                        <RaisedButton
                            type="button"
                            label="Read more"
                        />
                    </Link>
                    <Link to={`/admin/${this.props.userId}/news/update/${this.props.news._id}`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Update"
                        />
                    </Link>
                    <Link to={`/admin/${this.props.userId}/news/delete/${this.props.news._id}`}>
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Delete"
                        />
                    </Link>
                </div>
            </div>
        );
    }
}

export default ViewRow