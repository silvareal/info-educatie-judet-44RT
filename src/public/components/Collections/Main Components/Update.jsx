import React, {Component} from 'react';
import {Link} from 'react-router';
import {TextField, RaisedButton, CircularProgress} from 'material-ui';

import RichTextEditor from 'react-rte';
import PictureRow from '../Partials Components/PictureRow.jsx';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

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
                                            {this.props.__html.length > 5000 ?
                                                <div>
                                                    Write less, keep it simple !
                                                </div> : null
                                            }
                                            {this.props.collectionDescription && this.props.errors.collectionDescriptionRaw ? <div style={{color: 'red'}}>{this.props.errors.collectionDescriptionRaw}</div> : null}


                                        </td>
                                    </tr>

                                    <div>
                                        <RichTextEditor
                                            value={this.props.collectionDescription}
                                            onChange={this.props.onCollectionDescriptionChange}
                                            placeholder="Collection description"
                                        />
                                    </div>

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
                                                {picture.pictureDescriptionRaw && picture.pictureDescriptionRaw.length > 5000 ?
                                                    <div>
                                                        Please use a description that is shorther than 5000 characters
                                                    </div> : null
                                                }

                                                {picture.pictureDescription && this.props.pictureDescriptionError[i] == "Please use a valid description for this picture" ?
                                                    <div>
                                                        {this.props.pictureDescriptionError[i]}
                                                        <RichTextEditor
                                                            value={picture.pictureDescription}
                                                            onChange={this.props.handlePicturesDescriptionChange(i)}
                                                            placeholder="Collection description"
                                                        />
                                                    </div>
                                                    :
                                                    <div>
                                                        <RichTextEditor
                                                            value={picture.pictureDescription}
                                                            onChange={this.props.handlePicturesDescriptionChange(i)}
                                                            placeholder="Collection description"
                                                        />
                                                    </div>
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
/*
 /* */
/*

 */
export default Update