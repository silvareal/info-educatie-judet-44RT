import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardMedia, CardTitle, CardActions, RaisedButton} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <Card className="picture-separator">
                <Link
                    to={`/news/${this.props.news._id}`}
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
                    <RaisedButton
                        label="Like placeholder"
                        primary={true}
                    />
                </CardActions>
            </Card>
        );
    }
}

export default ViewRow