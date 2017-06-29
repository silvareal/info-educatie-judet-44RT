import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, Card, CardMedia, CardActions, CardTitle, Checkbox} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

class ViewRow extends Component {
    render() {
        let isLiked = false;
        for (let i = 0; i < this.props.liked.length; i++)
            if (this.props.liked[i].toString() === this.props.collection._id) {
                isLiked = true;
                break;
            }
        return (
            <Card className="picture-separator">
                <CardMedia
                    style={{cursor: 'pointer'}}
                    onClick={() => this.props.onClickCollection(this.props.collection._id)}
                    mediaStyle={{minHeight: 300}}
                    overlay={<CardTitle title={this.props.collection.collectionName}
                                        subtitle={"by " + this.props.collection.userName}/>}
                >
                    <img src={this.props.collection.picturesArray[0].pictureLink}/>
                </CardMedia>
                <CardActions>
                    <div className="heart-red-color">
                        <Checkbox
                            label={"Likes: " + this.props.collection.likes}
                            checked={isLiked}
                            checkedIcon={<ActionFavorite/>}
                            uncheckedIcon={<ActionFavoriteBorder/>}
                            onClick={isLiked === false ? () => this.props.onLike(this.props.collection._id) : () => this.props.onUnlike(this.props.collection._id)}
                        />
                    </div>
                    <Link to={`/manage/readOne/${this.props.collection._id}/update`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Update"
                            buttonStyle={{backgroundColor: "#9b9b9b"}}
                        />
                    </Link>
                    <Link to={`/manage/readOne/${this.props.collection._id}/delete`}>
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Delete"
                            buttonStyle={{backgroundColor: "#ee6e73"}}
                        />
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

export default ViewRow