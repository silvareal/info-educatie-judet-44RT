import React, {Component} from 'react';
import {Link} from 'react-router';
import {TextField, RaisedButton, CircularProgress} from 'material-ui';

class Update extends Component {
    render() {
        if (this.props.errorMessage == "The item you are searching for does not exist")
            return (
                <div>
                    <Link to="/manage">
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Return"
                        />
                    </Link>
                    {this.props.errorMessage}
                </div>
            );
        else
            return (
                <div>
                    <div>
                        <Link to="/manage">
                            <RaisedButton
                                type="button"
                                secondary={true}
                                label="Return"
                            />
                        </Link>
                        {this.props.errorMessage == 'Fetching' ? <CircularProgress/> : null}
                        {this.props.errorMessage == "Your collection was successfully updated!" ?
                            <div>
                                {this.props.errorMessage}
                            </div>
                            : <form>
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td className="input-field">
                                            {this.props.collectionName.length > 100 ?
                                                <div>
                                                    Please use a name that is shorter than 100 characters
                                                </div> : null}
                                            <TextField
                                                type="text"
                                                value={this.props.collectionName}
                                                floatingLabelText="Collection name"
                                                onChange={this.props.onCollectionChange}
                                                errorText={this.props.errors.collectionName}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="input-field">
                                            {this.props.collectionDescription.length > 5000 ?
                                                <div>
                                                    Please use a description that is shorther than 5000 characters
                                                </div> : null
                                            }
                                            <TextField
                                                type="text"
                                                value={this.props.collectionDescription}
                                                floatingLabelText="Collection description"
                                                onChange={this.props.onCollectionDescriptionChange}
                                                errorText={this.props.errors.collectionDescription}
                                                required
                                            />
                                        </td>
                                    </tr>
                                    {this.props.pictures.map((picture, i) => (
                                        <tr key={i}>
                                            <td className="input-field">
                                                {picture.pictureName.length > 100 ?
                                                    <div>
                                                        Please use a name that is shorter than 100 characters
                                                    </div> : null}
                                                {this.props.pictureNameError[i] == "Please use a valid name for this picture" ?
                                                    <TextField
                                                        key={i}
                                                        type="text"
                                                        floatingLabelText="Picture name"
                                                        value={picture.pictureName}
                                                        onChange={this.props.handlePicturesNameChange(i)}
                                                        errorText={this.props.pictureNameError[i]}
                                                    />
                                                    :
                                                    <TextField
                                                        type="text"
                                                        floatingLabelText="Picture name"
                                                        value={picture.pictureName}
                                                        onChange={this.props.handlePicturesNameChange(i)}
                                                    />
                                                }
                                            </td>
                                            <td className="input-field">
                                                {this.props.pictureLinkError[i] == "Please use a link for the picture" ?
                                                    <TextField
                                                        key={i}
                                                        type="text"
                                                        floatingLabelText="Picture link"
                                                        value={picture.pictureLink}
                                                        onChange={this.props.handlePicturesLinkChange(i)}
                                                        errorText={this.props.pictureLinkError[i]}
                                                    /> :
                                                    <TextField
                                                        type="text"
                                                        floatingLabelText="Picture link"
                                                        value={picture.pictureLink}
                                                        onChange={this.props.handlePicturesLinkChange(i)}
                                                    />
                                                }
                                                <img src={picture.pictureLink} style={{width: 100, height: 100}}/>
                                            </td>
                                            <td className="input-field">
                                                {picture.pictureDescription.length > 5000 ?
                                                    <div>
                                                        Please use a description that is shorther than 5000 characters
                                                    </div> : null
                                                }
                                                {this.props.pictureDescriptionError[i] == "Please use a valid description for this picture" ?
                                                    <TextField
                                                        key={i}
                                                        type="text"
                                                        floatingLabelText="Picture description"
                                                        value={picture.pictureDescription}
                                                        onChange={this.props.handlePicturesDescriptionChange(i)}
                                                        errorText={this.props.pictureDescriptionError[i]}
                                                    />
                                                    :
                                                    <TextField
                                                        type="text"
                                                        floatingLabelText="Picture description"
                                                        value={picture.pictureDescription}
                                                        onChange={this.props.handlePicturesDescriptionChange(i)}
                                                    />
                                                }
                                            </td>
                                            { (i === 0) ? (
                                                <RaisedButton
                                                    key={i}
                                                    type="button"
                                                    primary={true}
                                                    label="I want to add more pictures"
                                                    onClick={this.props.handleAddPictures(i)}
                                                />
                                            ) : null}

                                            { (i != 0) ? (
                                                <RaisedButton
                                                    key={i}
                                                    type="button"
                                                    secondary={true}
                                                    label="I want to remove this picture"
                                                    onClick={this.props.handleRemovePictures(i)}
                                                />
                                            ) : null}

                                        </tr>
                                    ))}
                                    <tr>
                                        <td>
                                            <Link
                                                to={`/manage/readOne/${this.props.collectionId}/update`}
                                            >
                                                <RaisedButton
                                                    type="button"
                                                    primary={true}
                                                    label="Save changes"
                                                    onClick={this.props.onSave}
                                                />
                                            </Link>
                                            <Link
                                                to="/manage"
                                            >
                                                <RaisedButton
                                                    type="button"
                                                    secondary={true}
                                                    label="Cancel editing"
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </form>
                        }
                    </div>
                </div>
            )
    }
}

export default Update