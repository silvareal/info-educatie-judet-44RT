import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, Card, CardHeader, CardActions} from 'material-ui';

import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';

class Delete extends Component {

    componentDidMount() {
        this.resetScroll();
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    render() {
        if(this.props.response)
        {
            if (this.props.message === "The item you are searching for does not exist")
                return (
                    <div className="parallax-collections-delete">
                        <div className="top-bar-spacing"/>
                        {this.props.message}
                    </div>
                );
            else
                return (
                    <div className="parallax-collections-delete">
                        <div className="top-bar-spacing"/>
                        {this.props.message === "Collection was successfully deleted" ?
                            <Card className="container-collections-delete" style={{backgroundColor: 'none'}}>
                                <Card>
                                    <CardHeader>
                                        <div className="delete-header-success">{this.props.message}</div>
                                    </CardHeader>
                                    <CardActions>
                                        <div className="delete-actions">
                                            <Link
                                                to="/manage"
                                            >
                                                <RaisedButton label="Finish"
                                                              secondary={true}/>
                                            </Link>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Card>
                            :
                            <Card className="container-collections-delete" style={{backgroundColor: 'none'}}>
                                <Card>
                                    <CardHeader>
                                        <div className="delete-header">Delete this collection?</div>
                                    </CardHeader>
                                    <CardActions>
                                        <div className="delete-actions">
                                            <div>
                                                <RaisedButton
                                                    primary={true}
                                                    onClick={this.props.onDelete}
                                                    label="Yes"/>
                                            </div>
                                            <div>
                                                <Link
                                                    to="/manage">
                                                    <RaisedButton
                                                        secondary={true}
                                                        label="No"
                                                        onTouchTap={this.resetScroll}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Card>
                        }
                    </div>
                );
        }
        else return (
            <div className="parallax-collections-delete">
                <div className="top-bar-spacing"/>
                <LoadingIndicator/>
            </div>
        )
    }
}

export default Delete