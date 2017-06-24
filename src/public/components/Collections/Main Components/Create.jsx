import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router";
import {connect} from 'react-redux';
import * as createCollectionsActions from '../../../actions/Collections/manageCollectionsCreateActions.js'
import RichTextEditor from 'react-rte';
import PictureRow from '../Partials Components/PictureRow.jsx';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import {
    RaisedButton,
    Step,
    StepButton,
    Stepper,
    TextField,
    Card,
    CardHeader,
    CardTitle,
    CardActions,
    CardMedia
} from "material-ui";
import FontIcon from 'material-ui/FontIcon';
import {red500} from 'material-ui/styles/colors';

let createHandler = function (dispatch) {
    let getInitialState = function () {
        dispatch(createCollectionsActions.onCreateComponentInitiate())
    };

    let onSlideIndexChange = function (stepIndex) {
        dispatch(createCollectionsActions.onSlideIndexChange(stepIndex))
    };

    return {
        getInitialState,
        onSlideIndexChange
    }
};

class Create extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        this.handlers.getInitialState();
    }

    handleNext = () => {
        let stepIndex = this.props.stepIndex;
        if (stepIndex < 2) {
            stepIndex ++;
            this.handlers.onSlideIndexChange(stepIndex);
        }
        this.resetScroll();
    };

    handlePrev = () => {
        let stepIndex = this.props.stepIndex;
        if (stepIndex > 0) {
            stepIndex --;
            this.handlers.onSlideIndexChange(stepIndex);
        }
        this.resetScroll();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleNext();
        }
    };

    getStepContent(stepIndex) {

        let pictures = this.props.pictures;

        let contentState;

        let rows;

        if (pictures) {
            rows = Object.keys(pictures).map((key) => {
                if (pictures[key].pictureDescriptionRaw) {
                    contentState = convertFromRaw(JSON.parse(pictures[key].pictureDescriptionRaw));
                    return (
                        <PictureRow
                            key={key}
                            pictureName={pictures[key].pictureName}
                            pictureLink={pictures[key].pictureLink}
                            pictureDescription={stateToHTML(contentState)}
                        />
                    )
                }
            });
        }

        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                {label: 'Bold', style: 'BOLD'},
                {label: 'Italic', style: 'ITALIC'},
                {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_DROPDOWN: [
                {label: 'Normal text', style: 'unstyled'},
                {label: 'Medium text', style: 'header-two'},
                {label: 'Large text', style: 'header-one'}
            ],
            BLOCK_TYPE_BUTTONS: [
                {label: 'UL', style: 'unordered-list-item'},
                {label: 'OL', style: 'ordered-list-item'}
            ]
        };

        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <div>
                            {(this.props.collectionName && this.props.collectionName.length  > 100) ?
                                <div>
                                    Please use a name that is shorter than 100 characters
                                </div> : null}
                            <TextField
                                hintText="Give your collection a cool name"
                                value={this.props.collectionName}
                                onChange={this.props.onCollectionNameChange}
                                errorText={this.props.message === "Another collection with the same name exists" ? this.props.message : this.props.errors.collectionName}
                                onKeyDown={this.handleKeyPress}
                                autoFocus={true}
                                multiLine={true}
                                className="step-textfields"
                                inputStyle={{color: "#000000"}}
                                floatingLabelStyle={{color: "#ee6e73"}}
                                underlineFocusStyle={{borderColor: "#ee6e73"}}
                            />
                        </div>
                        <div>
                            {this.props.__html && this.props.__html.length > 5000 ?
                                <div>
                                    Write less, keep it simple !
                                </div> : null
                            }
                            {this.props.errors && this.props.errors.collectionDescriptionRaw ?
                                <div style={{color: 'red'}}>{this.props.errors.collectionDescriptionRaw}</div> : null}
                            <RichTextEditor
                                value={this.props.collectionDescription}
                                onChange={this.props.onCollectionDescriptionChange}
                                placeholder="Collection description"
                                toolbarConfig={toolbarConfig}
                            />
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
                                    {this.props.pictureNameError && this.props.pictureNameError[i] === "Please use a valid name for this picture" ?
                                        <TextField hintText="Give your pictures a cool name"
                                                   value={picture.pictureName}
                                                   onChange={this.props.handlePicturesNameChange(i)}
                                                   errorText={this.props.pictureNameError[i]}
                                                   onKeyDown={this.handleKeyPress}
                                                   multiLine={true}
                                                   className="step-textfields"
                                                   inputStyle={{color: "#000000"}}
                                                   floatingLabelStyle={{color: "#ee6e73"}}
                                                   underlineFocusStyle={{borderColor: "#ee6e73"}}
                                        />
                                        :
                                        <TextField hintText="Give your work of art a cool name"
                                                   value={picture.pictureName}
                                                   onChange={this.props.handlePicturesNameChange(i)}
                                                   onKeyDown={this.handleKeyPress}
                                                   multiLine={true}
                                                   className="step-textfields"
                                                   inputStyle={{color: "#000000"}}
                                                   floatingLabelStyle={{color: "#ee6e73"}}
                                                   underlineFocusStyle={{borderColor: "#ee6e73"}}
                                        />
                                    }
                                </div>
                                <div className="input-field">
                                    {this.props.pictureLinkError && this.props.pictureLinkError[i] === "Please use a link for the picture" ?
                                        <TextField hintText="Give us the link of your work of art"
                                                   value={picture.pictureLink}
                                                   onChange={this.props.handlePicturesLinkChange(i)}
                                                   errorText={this.props.pictureLinkError[i]}
                                                   onKeyDown={this.handleKeyPress}
                                                   multiLine={true}
                                                   className="step-textfields"
                                                   inputStyle={{color: "#000000"}}
                                                   floatingLabelStyle={{color: "#ee6e73"}}
                                                   underlineFocusStyle={{borderColor: "#ee6e73"}}
                                        />
                                        :
                                        <TextField hintText="Give us the link of your work of art"
                                                   value={picture.pictureLink}
                                                   onChange={this.props.handlePicturesLinkChange(i)}
                                                   onKeyDown={this.handleKeyPress}
                                                   multiLine={true}
                                                   className="step-textfields"
                                                   inputStyle={{color: "#000000"}}
                                                   floatingLabelStyle={{color: "#ee6e73"}}
                                                   underlineFocusStyle={{borderColor: "#ee6e73"}}
                                        />
                                    }
                                </div>
                                <CardMedia>
                                    <img src={picture.pictureLink} className="step-picture"/>
                                </CardMedia>
                                <div className="input-field">
                                    {picture.pictureDescriptionRaw && picture.pictureDescriptionRaw.length > 5000 ?
                                        <div>
                                            Please use a description that is shorther than 5000 characters
                                        </div> : null
                                    }
                                    {this.props.pictureDescriptionError && this.props.pictureDescriptionError[i] === "Please use a valid description for this picture" ?

                                        <div>
                                            {this.props.pictureDescriptionError[i]}
                                            <RichTextEditor
                                                value={picture.pictureDescription}
                                                onChange={this.props.handlePicturesDescriptionChange(i)}
                                                placeholder="Collection description"
                                                toolbarConfig={toolbarConfig}
                                            />
                                        </div>
                                        :
                                        <div>
                                            <RichTextEditor
                                                value={picture.pictureDescription}
                                                onChange={this.props.handlePicturesDescriptionChange(i)}
                                                placeholder="Collection description"
                                                toolbarConfig={toolbarConfig}
                                            />
                                        </div>
                                    }
                                </div>
                                <RaisedButton type="button" primary={true} label="+"
                                              onClick={this.props.handleAddPictures(i)}
                                              buttonStyle={{backgroundColor: "#42ab9e"}}/>

                                { (i !== 0) ? (
                                    <RaisedButton type="button" secondary={true} label="-"
                                                  onClick={this.props.handleRemovePictures(i)}
                                                  buttonStyle={{backgroundColor: "#ee6e73"}}/>
                                ) : null}

                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div className="preview">
                        <div className="preview-title">The preview of what you wish to add is here</div>
                        <div>{this.props.collectionName}</div>
                        <div dangerouslySetInnerHTML={this.props.getHTML()}/>
                        {rows}
                    </div>
                );
            default:
                return 'Unknown error';
        }
    }

    resetScroll = () => {
        window.scrollTo(0, 0);
    };

    render() {

        const {stepIndex} = this.props;

        return (
            <div className="parallax-collections-create">
                <div className="top-bar-spacing"/>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    <Card>
                        <CardHeader>
                            <CardTitle
                                title={
                                    <div className="top-actions-create">
                                        <Stepper linear={false} activeStep={stepIndex}>
                                            <Step>
                                                <StepButton
                                                    onClick={() => this.handlers.onSlideIndexChange(0)}
                                                    icon={this.props.pictureLinkError && this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                        <FontIcon className="material-icons"
                                                                  color={red500}>warning</FontIcon> :
                                                        <FontIcon className="material-icons">mode_edit</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                            <Step>
                                                <StepButton
                                                    onClick={() => this.handlers.onSlideIndexChange(1)}
                                                    icon={this.props.pictureLinkError && this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                        <FontIcon className="material-icons"
                                                                  color={red500}>warning</FontIcon> :
                                                        <FontIcon className="material-icons">add_a_photo</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                            <Step>
                                                <StepButton onClick={() => this.handlers.onSlideIndexChange(2)}
                                                            icon={this.props.pictureLinkError && this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                                <FontIcon className="material-icons" color={red500}>warning</FontIcon> :
                                                                <FontIcon className="material-icons">done</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                        </Stepper>
                                    </div>
                                }/>
                        </CardHeader>
                        {this.props.successCreation === true ?
                            <div className="success-collections-create">
                                <div>Item was added</div>
                                <Link to={`/manage`}>
                                    <RaisedButton label="Return"
                                                  primary={true}
                                                  buttonStyle={{backgroundColor: "#42ab9e"}}
                                                  onTouchTap={this.resetScroll}
                                    />
                                </Link>
                            </div> : null}
                        {this.props.message !== '' ?
                            <div className="errors-collections">
                                {this.props.message}
                            </div> : null
                        }
                        {this.props.errors && this.props.errors.summary ?
                            <div className="errors-collections">
                                {this.props.errors.summary}
                            </div> : null
                        }
                        <div className="step-style">{this.getStepContent(stepIndex)}</div>
                        <CardActions className="step-actions">
                            {stepIndex === 0 ?
                                <Link to={`/manage`}>
                                    <RaisedButton
                                        label="Cancel"
                                        secondary={true}
                                        buttonStyle={{backgroundColor: "#ee6e73"}}/>
                                </Link>
                                :
                                <RaisedButton
                                    label="Back"
                                    secondary={true}
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    buttonStyle={{backgroundColor: "#ee6e73"}}/>
                            }

                            <RaisedButton
                                label={stepIndex === 2 ? "Add collection" : "Next"}
                                primary={true}
                                onTouchTap={stepIndex === 2 ? this.props.onSave : this.handleNext}
                                buttonStyle={{backgroundColor: "#42ab9e"}}/>
                        </CardActions>
                    </Card>
                </Card>
            </div>
        )
    }
}

Create.propTypes = {
    stepIndex: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        stepIndex: state.manageCollectionsCreateComponentReducer.stepIndex
    }
};

export default connect(mapStateToProps)(Create);