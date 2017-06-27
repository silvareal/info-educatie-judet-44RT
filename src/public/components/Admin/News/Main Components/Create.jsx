import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as createActions from '../../../../actions/Admin/News/manageNewsCreateActionsAdmin.js';
import RichTextEditor from 'react-rte';
import PictureRow from '../Partials Components/PictureRow.jsx';

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

    let onSlideIndexChange = function (stepIndex) {
        dispatch(createActions.onSlideIndexChange(stepIndex))
    };

    return {
        onSlideIndexChange
    }
};

class Create extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    handleNext = () => {
        let stepIndex = this.props.stepIndex;
        if (stepIndex < 2) {
            stepIndex++;
            this.handlers.onSlideIndexChange(stepIndex);
        }
        this.resetScroll();
    };

    handlePrev = () => {
        let stepIndex = this.props.stepIndex;
        if (stepIndex > 0) {
            stepIndex--;
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
                            {this.props.newsTitle.length > 100 ?
                                <div>
                                    Please use a name that is shorter than 100 characters
                                </div> : null}
                            <TextField
                                hintText="Article title"
                                value={this.props.newsTitle}
                                onChange={this.props.onNewsTitleChange}
                                errorText={this.props.errors.newsTitle}
                                onKeyDown={this.handleKeyPress}
                                autoFocus={true}
                                multiLine={true}
                                className="step-textfields"
                                inputStyle={{color: "#000000"}}
                                floatingLabelStyle={{color: "#ee6e73"}}
                                underlineFocusStyle={{borderColor: "#ee6e73"}}
                            />
                            <TextField
                                hintText="Cover photo link"
                                value={this.props.newsCoverLink}
                                onChange={this.props.onNewsCoverLinkChange}
                                errorText={this.props.errors.newsCoverLink}
                                onKeyDown={this.handleKeyPress}
                                multiLine={true}
                                className="step-textfields"
                                inputStyle={{color: "#000000"}}
                                floatingLabelStyle={{color: "#ee6e73"}}
                                underlineFocusStyle={{borderColor: "#ee6e73"}}
                            />
                        </div>
                        <div>
                            {this.props.__html.length > 5000 ?
                                <div>
                                    Write less, keep it simple !
                                </div> : null
                            }
                            {this.props.errors.newsDescriptionRaw ?
                                <div style={{color: 'red'}}>{this.props.errors.newsDescriptionRaw}</div> : null}
                            <RichTextEditor
                                value={this.props.newsDescription}
                                onChange={this.props.onNewsDescriptionChange}
                                placeholder="Article's description"
                                toolbarConfig={toolbarConfig}
                            />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="preview">
                        <div className="preview-title">The preview of what you wish to add is here</div>
                        <div>{this.props.newsTitle}</div>
                        <CardMedia>
                            <img src={this.props.newsCoverLink}/>
                        </CardMedia>
                        <div dangerouslySetInnerHTML={this.props.getHTML()}/>
                    </div>
                );
            default:
                return 'Unknown error';
        }
    }

    checkForErrors = (message) => {
        return message === "Check the specified fields for errors"
    };

    checkStepOneErrors = (errors) => {
        if (errors && Object.keys(errors).length === 0)
            return false;
        return true
    };

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
                                                    icon={this.checkStepOneErrors(this.props.errors) ?
                                                        <FontIcon className="material-icons"
                                                                  color={red500}>warning</FontIcon> :
                                                        <FontIcon className="material-icons">mode_edit</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                            <Step>
                                                <StepButton onClick={() => this.handlers.onSlideIndexChange(1)}
                                                            icon={this.checkForErrors(this.props.message) ?
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
                                <Link to={`/news`}>
                                    <RaisedButton label="Return"
                                                  primary={true}
                                                  onTouchTap={this.resetScroll}
                                                  buttonStyle={{backgroundColor: "#42ab9e"}}
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
                                <Link to={`/news`}>
                                    <RaisedButton
                                        label="Cancel"
                                        secondary={true}
                                        buttonStyle={{backgroundColor: "#ee6e73"}}/>
                                </Link>
                                :
                                <RaisedButton
                                    label="Back"
                                    primary={true}
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}
                                    buttonStyle={{backgroundColor: "#ee6e73"}}/>
                            }

                            <RaisedButton
                                label={stepIndex === 1 ? "Save article" : "Next"}
                                primary={true}
                                onTouchTap={stepIndex === 1 ? this.props.onSave : this.handleNext}
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
        stepIndex: state.manageNewsCreateReducerAdmin.stepIndex
    }
};

export default connect(mapStateToProps)(Create);