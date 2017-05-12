import React, {Component} from 'react';
import {Link} from 'react-router';

import {TextField, RaisedButton} from 'material-ui';

class Create extends Component {

    render() {
        return (
            <div>
                {this.props.successCreation === true ? <div className="alert alert-success">
                    <Link to={`/admin/${this.props.adminId}/collections`}>
                        Back
                    </Link>
                    Item was added</div> : null}
                {this.props.errorMessage != '' ?
                 <div>
                        {this.props.errorMessage}
                    </div> : null
                }
                {this.props.errors.summary ?
                 <div>
                        {this.props.errors.summary}
                    </div>:null
                }
                <form onSubmit={this.props.onSave}>
                    <table className="table">
                        <tbody>
                            <tr>
                            <td className="input-field">
                                <TextField type="text"
                                           floatingLabelText="User id"
                                           value={this.props.userId}
                                           onChange={this.props.onUserIdChange}
                                           errorText={this.props.errors.userId}
                                           required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="input-field">
                                {this.props.collectionName.length > 100 ?
                                 <div>
                                        Please use a name that is shorter than 100 characters
                                    </div>: null}
                                <TextField type="text"
                                           floatingLabelText="Name of the collection"
                                           value={this.props.collectionName}
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
                                    </div>:null
                                }
                                <TextField
                                    type="text"
                                    floatingLabelText="Collection description"
                                    value={this.props.collectionDescription}
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
                                        </div>: null}
                                    {this.props.pictureNameError[i] == "Please use a valid name for this picture" ?
                                     <TextField
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
                                         type="text"
                                         floatingLabelText="Picture link"
                                         value={picture.pictureLink}
                                         onChange={this.props.handlePicturesLinkChange(i)}
                                         errorText={this.props.pictureLinkError[i]}
                                     />
                                        :
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
                                        </div>:null
                                    }
                                    {this.props.pictureDescriptionError[i] == "Please use a valid description for this picture" ?
                                     <TextField
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
                                        <RaisedButton type="button"
                                                      primary={true}
                                                      label="I want to add more pictures"
                                                      onClick={this.props.handleAddPictures(i)}
                                        />
                                    ) : null}

                                    { (i != 0) ? (
                                        <RaisedButton type="button"
                                                      secondary={true}
                                                      label="I want to remove this picture"
                                                      onClick={this.props.handleRemovePictures(i)}
                                        />
                                    ) : null}

                            </tr>
                            ))}
                            <tr>
                            <td>
                                <RaisedButton
                                    label="Add collection"
                                    primary={true}
                                    onClick={this.props.onSave}
                                />
                                <Link to={`/admin/${this.props.adminId}/collections`}>
                                    <RaisedButton
                                        label="Cancel and return"
                                        secondary={true}
                                    />
                                </Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default Create;