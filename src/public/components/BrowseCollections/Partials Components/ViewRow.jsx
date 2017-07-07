import React, {Component} from 'react'
import {Link} from 'react-router'
import {Card, CardMedia, CardTitle, Chip, Checkbox, CardActions, RaisedButton} from 'material-ui';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Auth from '../../../modules/Auth.js'

class ViewRow extends Component {

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
    };

    render() {

        let isLiked = false;
        if (Auth.isUserAuthenticated())
        for (let i = 0; i < this.props.liked.length; i++) {
            if (this.props.liked[i].toString() === this.props.collection._id) {
                isLiked = true;
                break;
            }
        }

        const tags = this.props.collection.tags.map((data, i) => {
            if (i < 3)
                return <Link to={`/search/${data.value}`} key={i}>
                    <Chip style={{cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}
                          labelStyle={{maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                        {data.value}
                    </Chip>
                </Link>;
        });

        return (
            <Card className="picture-separator"
                  style={{minWidth: "50%", boxShadow: "transparent"}}>
                <CardMedia
                    style={{cursor: 'pointer'}}
                    onClick={() => this.props.onClickCollection(this.props.collection._id)}
                    overlay={<CardTitle title={this.props.collection.collectionName}
                                        subtitle={"by " + this.props.collection.userName}/>}
                >
                    <img onError={this.addDefaultPicture} src={this.props.collection.picturesArray[0].pictureLink}/>
                </CardMedia>
                <div className="heart-and-tags-container">
                    <div className="heart-red-color">
                        {Auth.isUserAuthenticated() ?
                            <Checkbox
                                label={"Likes: " + this.props.collection.likes}
                                checked={isLiked}
                                checkedIcon={<ActionFavorite/>}
                                uncheckedIcon={<ActionFavoriteBorder/>}
                                onClick={isLiked === false ? () => this.props.onLike(this.props.collection._id) : () => this.props.onUnlike(this.props.collection._id)}
                            />
                            :
                            <Checkbox
                                label={"Likes: " + this.props.collection.likes}
                                checked={isLiked}
                                checkedIcon={<ActionFavorite/>}
                                uncheckedIcon={<ActionFavoriteBorder/>}
                                onClick={() => this.props.context.router.push('/login')}
                            />
                        }
                    </div>
                    <div style={{display: "flex", flex: 1, maxWidth: "100%", overflow: "hidden"}}>
                        <div className="tags-container">
                            {tags}
                        </div>
                    </div>
                </div>
                {this.props.admin === true && Auth.isUserAuthenticated() ?
                    <CardActions >
                        <Link to={`/admin/${this.props.userId}/collections/update/${this.props.collection._id}`}>
                            <RaisedButton
                                type="button"
                                primary={true}
                                label="Update"
                                buttonStyle={{backgroundColor: "#9b9b9b"}}
                            />
                        </Link>
                        <Link to={`/admin/${this.props.userId}/collections/delete/${this.props.collection._id}`}>
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