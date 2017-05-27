import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardMedia, CardTitle, CardActions, RaisedButton} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <Card className="picture-separator">
                <Link
                    to={`/admin/${this.props.adminId}/news/readOne/${this.props.news._id}`}
                    target="_blank">
                    <CardMedia
                        mediaStyle={{minHeight: 300}}
                        overlay={<CardTitle title={this.props.news.newsTitle}
                                            subtitle={"by " + this.props.news.userName}/>}
                    >
                        <img src={this.props.news.newsCoverLink}/>
                    </CardMedia>
                </Link>
                <CardActions>
                    <Link to={`/admin/${this.props.adminId}/news/update/${this.props.news._id}`}
                          target="_blank">
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Update"
                        />
                    </Link>
                    <Link to={`/admin/${this.props.adminId}/news/delete/${this.props.news._id}`}
                          target="_blank">
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Delete"
                        />
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

export default ViewRow