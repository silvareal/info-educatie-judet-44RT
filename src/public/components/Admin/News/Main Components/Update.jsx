import React, {Component} from "react";
import {Link} from "react-router";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as updateActions from '../../../../actions/Admin/News/manageNewsUpdateActionsAdmin.js';
import RichTextEditor from 'react-rte';
import NotFoundView from '../../../../containers/Error/NotFoundView.jsx';
import {smoothScroll} from '../../../../containers/MainApp/functions.js';
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

import LoadingIndicator from '../../../Loading Indicator/LoadingIndicator.jsx';

let createHandler = function (dispatch) {

    let onSlideIndexChange = function (stepIndex) {
        dispatch(updateActions.onSlideIndexChange(stepIndex))
    };

    return {
        onSlideIndexChange
    }
};

class Update extends Component {

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
        smoothScroll();
    };

    handlePrev = () => {
        let stepIndex = this.props.stepIndex;
        if (stepIndex > 0) {
            stepIndex--;
            this.handlers.onSlideIndexChange(stepIndex);
        }
        smoothScroll();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleNext();
        }
    };

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
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
                                inputStyle={{color: "#000000", opacity: 0.8}}
                                floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                            />
                            <TextField
                                hintText="Cover photo link"
                                value={this.props.newsCoverLink}
                                onChange={this.props.onNewsCoverLinkChange}
                                errorText={this.props.errors.newsCoverLink}
                                onKeyDown={this.handleKeyPress}
                                multiLine={true}
                                className="step-textfields"
                                inputStyle={{color: "#000000", opacity: 0.8}}
                                floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
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
                            <img onError={this.addDefaultPicture} src={this.props.newsCoverLink}/>
                        </CardMedia>
                        <div dangerouslySetInnerHTML={this.props.getHTML()}
                             style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>
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
        if (Object.keys(errors).length === 0)
            return false;
        return true
    };

    render() {

        const {stepIndex} = this.props;
        if (this.props.fetchedNews === true && this.props.fetchingNews === false) {
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
                                                        onTouchTap={() => this.handlers.onSlideIndexChange(0)}
                                                        icon={this.checkStepOneErrors(this.props.errors) ?
                                                            <FontIcon className="material-icons"
                                                                      color={red500}>warning</FontIcon> :
                                                            <FontIcon
                                                                className="material-icons">mode_edit</FontIcon>}
                                                    >
                                                    </StepButton>
                                                </Step>
                                                <Step>
                                                    <StepButton onTouchTap={() => this.handlers.onSlideIndexChange(1)}
                                                                icon={this.checkForErrors(this.props.message) ?
                                                                    <FontIcon className="material-icons"
                                                                              color={red500}>warning</FontIcon> :
                                                                    <FontIcon
                                                                        className="material-icons">done</FontIcon>}
                                                    >
                                                    </StepButton>
                                                </Step>
                                            </Stepper>
                                        </div>
                                    }/>
                            </CardHeader>
                            {this.props.successUpdate === true ?
                                <div className="success-collections">
                                    Collection was successfully updated
                                </div> :
                                <div className="errors-collections">
                                    {this.props.message}
                                </div>
                            }
                            {this.props.errors.summary ?
                                <div className="errors-collections">
                                    {this.props.errors.summary}
                                </div> : null
                            }
                            {this.props.successUpdate === true ?
                                <div className="success-collections-create">
                                    <Link to={`/news`}>
                                        <RaisedButton
                                            label="Finish"
                                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                                            primary={true}
                                        />
                                    </Link>
                                </div> : null
                            }
                            <div className="step-style">{this.getStepContent(stepIndex)}</div>
                            <CardActions className="step-actions">
                                {stepIndex === 0 ?
                                    <Link to={`/news`}>
                                        <RaisedButton
                                            label="Cancel"
                                            buttonStyle={{backgroundColor: "#ee6e73"}}
                                            secondary={true}/>
                                    </Link>
                                    :
                                    <RaisedButton
                                        label="Back"
                                        primary={true}
                                        buttonStyle={{backgroundColor: "#ee6e73"}}
                                        disabled={stepIndex === 0}
                                        onTouchTap={this.handlePrev}/>
                                }

                                <RaisedButton
                                    label={stepIndex === 1 ? "Save" : "Next"}
                                    primary={true}
                                    onTouchTap={stepIndex === 1 ? this.props.onSave : this.handleNext}
                                    buttonStyle={{backgroundColor: "#9b9b9b"}}/>
                            </CardActions>
                        </Card>
                    </Card>
                </div>
            )
        }
        else if (this.props.fetchedNews === false && this.props.fetchingNews === true)
            return (
                <div className="parallax-collections-create">
                    <div className="top-bar-spacing"/>
                    <LoadingIndicator/>
                </div>
            );
        else if (this.props.fetchedNews === false && this.props.fetchingNews === false)
            return <NotFoundView/>
    }
}

Update.propTypes = {
    stepIndex: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        stepIndex: state.manageNewsUpdateReducerAdmin.stepIndex
    }
};

export default connect(mapStateToProps)(Update)