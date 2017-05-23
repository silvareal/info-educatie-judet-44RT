import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class Delete extends Component {
    render() {
        if (this.props.message == "The item you are searching for does not exist")
            return (
                <div>
                    {this.props.message}
                </div>
            );
        else
            return (
                <div>
                {this.props.message == "Collection was successfully deleted" ? <div>
                    <div>
                        <Link
                            to={`/admin/${this.props.adminId}/collections`}
                        >
                        <RaisedButton
                            type="button"
                            label="Back"
                            primary={true}
                        />
                        </Link>
                        {this.props.message}
                    </div>
                </div>
                    :
                 <div>
                        <p>Are you sure you want to delete this collection?</p>
                        <div>
                            <div>
                                <RaisedButton
                                    primary={true}
                                    onClick={this.props.onDelete}
                                    label="Yes"/>
                            </div>
                            <div>
                                <Link
                                    to={`/admin/${this.props.adminId}/collections`}>
                                    <RaisedButton
                                        secondary={true}
                                        label="No"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                }

            </div>
            );
    }
}

export default Delete