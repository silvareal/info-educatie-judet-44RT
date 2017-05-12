import React, {Component} from 'react'
import {Link} from 'react-router';

import {TextField, RaisedButton} from 'material-ui';

class Create extends Component {
    render(){
        return (
            <div>
                {this.props.successCreation === true ? <div className="alert alert-success">
                    <Link to={`/admin/${this.props.userId}/news`}>
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
                                {this.props.newsTitle.length > 100 ?
                                 <div>
                                        Please use a shorter title
                                    </div>: null}
                                <TextField type="text"
                                           floatingLabelText="Title"
                                           value={this.props.newsTitle}
                                           onChange={this.props.onNewsTitleChange}
                                           errorText={this.props.errors.newsTitle}
                                           required
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="input-field">
                                {this.props.newsCoverLink.length > 10000 ?
                                 <div>
                                        Please use a shorter link
                                    </div>:null
                                }
                                <TextField
                                    type="text"
                                    floatingLabelText="Cover of the news"
                                    value={this.props.newsCoverLink}
                                    onChange={this.props.onNewsCoverLinkChange}
                                    errorText={this.props.errors.newsCoverLink}
                                    required
                                />
                            </td>
                        </tr>
                            <tr>
                                <td className="input-field">
                                {this.props.newsDescription.length > 5000 ?
                                 <div>
                                        Please use a shorter description
                                    </div>:null
                                }
                                <TextField
                                    type="text"
                                    floatingLabelText="Description"
                                    value={this.props.newsDescription}
                                    onChange={this.props.onNewsDescriptionChange}
                                    errorText={this.props.errors.newsDescription}
                                    required
                                />
                                </td>
                            </tr>
                            {this.props.newsPictures.map((picture, i) => (
                                <tr key={i}>
                                <td className="input-field">
                                    {picture.newsPictureLink.length > 10000 ?
                                     <div>
                                            Please use a shorter link
                                        </div>: null}
                                    {this.props.newsPictureLinkError[i] == "Please use a shorter link" ?
                                     <TextField
                                         type="text"
                                         floatingLabelText="Picture link"
                                         value={picture.newsPictureLink}
                                         onChange={this.props.handleNewsPicturesLinkChange(i)}
                                         errorText={this.props.newsPictureLinkError[i]}
                                     />
                                        :
                                     <TextField
                                         type="text"
                                         floatingLabelText="Picture link"
                                         value={picture.newsPictureLink}
                                         onChange={this.props.handleNewsPicturesLinkChange(i)}
                                     />
                                    }
                                </td>
                                    { (i === 0) ? (
                                        <RaisedButton type="button"
                                                      primary={true}
                                                      label="I want to add more pictures"
                                                      onClick={this.props.handleAddNewsPictures(i)}
                                        />
                                    ) : null}

                                    <RaisedButton type="button"
                                                  secondary={true}
                                                  label="I want to remove this picture"
                                                  onClick={this.props.handleRemoveNewsPictures(i)}
                                    />

                            </tr>
                            ))}
                            <tr>
                            <td>
                                <RaisedButton
                                    label="Add article"
                                    primary={true}
                                    onClick={this.props.onSave}
                                />
                                <Link to={`/admin/${this.props.userId}/news`}>
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