import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, Card, CardMedia, CardActions, CardTitle, Checkbox, Chip} from 'material-ui';
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
        const tags = this.props.collection.tags.map((data, i) => {
            return <Link to={`/search/${data.value}`} key={i}>
                <Chip style={{cursor: "pointer"}}>
                    {data.value}
                </Chip>
            </Link>;
        });
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
                <div style={{display: "flex", justifyContent: "space-between", padding: 8}}>
                    <div className="heart-red-color" style={{display: "flex", justifyContent: "flex-start", flex: 1}}>
                        <Checkbox
                            label={"Likes: " + this.props.collection.likes}
                            checked={isLiked}
                            checkedIcon={<ActionFavorite/>}
                            uncheckedIcon={<ActionFavoriteBorder/>}
                            onClick={isLiked === false ? () => this.props.onLike(this.props.collection._id) : () => this.props.onUnlike(this.props.collection._id)}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "flex-end", flex: 1}}>
                        {tags}
                    </div>
                </div>
                <CardActions>
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