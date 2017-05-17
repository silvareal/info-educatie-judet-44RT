import React, {Component, PropTypes} from "react";
import {Link} from "react-router";

import RichTextEditor from 'react-rte';

import {FlatButton, RaisedButton, Step, StepButton, Stepper, TextField} from "material-ui";
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';

class Create extends Component {

    static propTypes = {
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            stepIndex: 0,
        };
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        if (stepIndex < 2) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleNext();
        }
    };

    getStepContent(stepIndex) {

        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <div>
                            {this.props.collectionName.length > 100 ?
                                <div>
                                    Please use a name that is shorter than 100 characters
                                </div> : null}
                            <TextField
                                type="text" floatingLabelText="Name of the collection"
                                value={this.props.collectionName}
                                onChange={this.props.onCollectionChange}
                                errorText={this.props.errors.collectionName}
                                onKeyDown={this.handleKeyPress}
                                autoFocus={true}
                            />
                        </div>
                        <div>
                            {this.props.collectionDescriptionRender.length > 5000 ?
                                <div>
                                    Write less, keep it simple !
                                </div> : null
                            }
                            {this.props.errors.collectionDescription ? <div style={{color: 'red'}}>{this.props.errors.collectionDescription}</div> : null}
                            <RichTextEditor
                                value={this.props.collectionDescription}
                                onChange={this.props.onCollectionDescriptionChange}
                                placeholder="Collection description"
                            />
                        </div>
                        <div>

                            <div>
                                <div dangerouslySetInnerHTML={this.props.getHTML()} />
                            </div>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div>
                        {this.props.pictures.map((picture, i) => (
                            <div key={i}>
                                <div className="input-field">
                                    {picture.pictureName.length > 100 ?
                                        <div>
                                            Please use a name that is shorter than 100 characters
                                        </div> : null}
                                    {this.props.pictureNameError[i] == "Please use a valid name for this picture" ?
                                        <TextField type="text" floatingLabelText="Picture name"
                                                   value={picture.pictureName}
                                                   onChange={this.props.handlePicturesNameChange(i)}
                                                   errorText={this.props.pictureNameError[i]}
                                                   onKeyDown={this.handleKeyPress}
                                                   autoFocus={true}
                                        />
                                        :
                                        <TextField type="text" floatingLabelText="Picture name"
                                                   value={picture.pictureName}
                                                   onChange={this.props.handlePicturesNameChange(i)}
                                                   onKeyDown={this.handleKeyPress}
                                                   autoFocus={true}
                                        />
                                    }
                                </div>
                                <div className="input-field">
                                    {this.props.pictureLinkError[i] == "Please use a link for the picture" ?
                                        <TextField type="text" floatingLabelText="Picture link"
                                                   value={picture.pictureLink}
                                                   onChange={this.props.handlePicturesLinkChange(i)}
                                                   errorText={this.props.pictureLinkError[i]}
                                                   onKeyDown={this.handleKeyPress}
                                        />
                                        :
                                        <TextField type="text" floatingLabelText="Picture link"
                                                   value={picture.pictureLink}
                                                   onChange={this.props.handlePicturesLinkChange(i)}
                                                   onKeyDown={this.handleKeyPress}
                                        />
                                    }
                                    <img src={picture.pictureLink} style={{width: 100, height: 100}}/>
                                </div>
                                <div className="input-field">
                                    {picture.pictureDescription.length > 5000 ?
                                        <div>
                                            Please use a description that is shorther than 5000 characters
                                        </div> : null
                                    }
                                    {this.props.pictureDescriptionError[i] == "Please use a valid description for this picture" ?

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
                                </div>
                                { (i === 0) ? (
                                    <RaisedButton type="button" primary={true} label="+"
                                                  onClick={this.props.handleAddPictures(i)}/>
                                ) : null}

                                { (i != 0) ? (
                                    <RaisedButton type="button" secondary={true} label="-"
                                                  onClick={this.props.handleRemovePictures(i)}/>
                                ) : null}

                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div>
                        Preview todo
                    </div>
                );
            default:
                return 'Unknown error';
        }
    }

    render() {

        const {stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
                {this.props.successCreation === true ? <div className="alert alert-success">
                    <Link to="/manage">
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
                    </div> : null
                }
                <Stepper linear={false} activeStep={stepIndex}>
                    <Step>
                        <StepButton
                            onClick={() => this.setState({stepIndex: 0})}
                            icon={this.props.pictureLinkError[0] == "Please use a link for the picture" ?
                                <FontIcon className="material-icons" color={red500}>warning</FontIcon> :
                                <FontIcon className="material-icons">mode_edit</FontIcon>}
                        >
                            Step 1
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton
                            onClick={() => this.setState({stepIndex: 1})}
                            icon={this.props.pictureLinkError[0] == "Please use a link for the picture" ?
                                <FontIcon className="material-icons" color={red500}>warning</FontIcon> :
                                <FontIcon className="material-icons">add_a_photo</FontIcon>}
                        >
                            Step 2
                        </StepButton>
                    </Step>
                    <Step>
                        <StepButton onClick={() => this.setState({stepIndex: 2})}
                                    icon={this.props.pictureLinkError[0] == "Please use a link for the picture" ?
                                        <FontIcon className="material-icons" color={red500}>warning</FontIcon> :
                                        <FontIcon className="material-icons">done</FontIcon>}
                        >
                            Preview&Finish
                        </StepButton>
                    </Step>
                </Stepper>
                <div style={contentStyle}>
                    <div>{this.getStepContent(stepIndex)}</div>
                    <div style={{marginTop: 12}}>
                        <FlatButton label="Back" disabled={stepIndex === 0} onTouchTap={this.handlePrev}
                                    style={{marginRight: 12}}/>
                        <RaisedButton label={stepIndex === 2 ? "Add collection" : "Next"} primary={true}
                                      onTouchTap={stepIndex === 2 ? this.props.onSave : this.handleNext}/>
                        <Link to="/manage">
                            <RaisedButton label="Cancel and return" secondary={true}/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;