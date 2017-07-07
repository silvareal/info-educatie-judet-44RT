import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardMedia, CardTitle, CardActions, RaisedButton} from 'material-ui';

class ViewRow extends Component {

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
    };

    render() {
        return (
            <Card className="picture-separator" style={{boxShadow: "transparent"}}>
                <CardMedia
                    style={{cursor: 'pointer'}}
                    onClick={() => this.props.onClickNews(this.props.news._id)}
                    overlay={<CardTitle title={this.props.news.newsTitle}
                                        subtitle={"by " + this.props.news.userName}/>}
                >
                    <img onError={this.addDefaultPicture} src={this.props.news.newsCoverLink}/>
                </CardMedia>
                {this.props.admin === true ?
                    <CardActions>
                        <Link to={`/admin/${this.props.userId}/news/update/${this.props.news._id}`}>
                            <RaisedButton
                                type="button"
                                primary={true}
                                label="Update"
                                buttonStyle={{backgroundColor: "#9b9b9b"}}
                            />
                        </Link>
                        <Link to={`/admin/${this.props.userId}/news/delete/${this.props.news._id}`}>
                            <RaisedButton
                                type="button"
                                secondary={true}
                                label="Delete"
                                buttonStyle={{backgroundColor: "#ee6e73"}}
                            />
                        </Link>
                    </CardActions>
                    :
                    null
                }

            </Card>
        );
    }
}

export default ViewRow