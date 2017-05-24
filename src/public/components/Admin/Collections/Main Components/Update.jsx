import React, {Component} from "react";
import {Link} from "react-router";

import RichTextEditor from 'react-rte';
import PictureRow from '../Partials Components/PictureRow.jsx';
import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import {
    FlatButton,
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

class Update extends Component {

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
        this.resetScroll();
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
        this.resetScroll();
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleNext();
        }
    };

    getStepContent(stepIndex) {

        let newsPictures = this.props.newsPictures;

        let rows;

        if (newsPictures) {
            rows = Object.keys(newsPictures).map((key) => {
                return (
                    <PictureRow
                        key={key}
                        pictureLink={newsPictures[key].pictureLink}
                    />
                )
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
                            />
                            <TextField
                                hintText="Cover photo link"
                                value={this.props.newsCoverLink}
                                onChange={this.props.onNewsCoverLinkChange}
                                errorText={this.props.errors.newsCoverLink}
                                onKeyDown={this.handleKeyPress}
                                multiLine={true}
                                className="step-textfields"
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
                    <div>
                        {this.props.newsPictures.map((newsPicture, i) => (
                            <div key={i}>
                                <div className="input-field">
                                    {this.props.newsPictureLinkError[i] === "Please use a link for the picture" ?
                                        <TextField hintText="Link here additional photos"
                                                   value={newsPicture.newsPictureLink}
                                                   onChange={this.props.handleNewsPicturesLinkChange(i)}
                                                   errorText={this.props.newsPictureLinkError[i]}
                                                   onKeyDown={this.handleKeyPress}
                                                   autoFocus={true}
                                                   multiLine={true}
                                                   className="step-textfields"
                                        />
                                        :
                                        <TextField hintText="Link here additional photos"
                                                   value={newsPicture.newsPictureLink}
                                                   onChange={this.props.handleNewsPicturesLinkChange(i)}
                                                   onKeyDown={this.handleKeyPress}
                                                   multiLine={true}
                                                   className="step-textfields"
                                        />
                                    }
                                </div>
                                <CardMedia>
                                    <img src={newsPicture.pictureLink} className="step-picture"/>
                                </CardMedia>
                                <RaisedButton type="button" primary={true} label="+"
                                              onClick={this.props.handleAddNewsPictures(i)}/>

                                { (i !== 0) ? (
                                    <RaisedButton type="button" secondary={true} label="-"
                                                  onClick={this.props.handleRemoveNewsPictures(i)}/>
                                ) : null}

                            </div>
                        ))}
                    </div>
                );
            case 2:
                return (
                    <div className="preview">
                        <div>The preview of what you wish to add is here</div>
                        <div>{this.props.newsTitle}</div>
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

        const {stepIndex} = this.state;

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
                                                    onClick={() => this.setState({stepIndex: 0})}
                                                    icon={this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                        <FontIcon className="material-icons"
                                                                  color={red500}>warning</FontIcon> :
                                                        <FontIcon className="material-icons">mode_edit</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                            <Step>
                                                <StepButton
                                                    onClick={() => this.setState({stepIndex: 1})}
                                                    icon={this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                        <FontIcon className="material-icons"
                                                                  color={red500}>warning</FontIcon> :
                                                        <FontIcon className="material-icons">add_a_photo</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                            <Step>
                                                <StepButton onClick={() => this.setState({stepIndex: 2})}
                                                            icon={this.props.pictureLinkError[0] === "Please use a link for the picture" ?
                                                                <FontIcon className="material-icons" color={red500}>warning</FontIcon> :
                                                                <FontIcon className="material-icons">done</FontIcon>}
                                                >
                                                </StepButton>
                                            </Step>
                                        </Stepper>
                                    </div>
                                }/>
                        </CardHeader>
                        {this.props.errorMessage !== '' && this.props.errorMessage !== 'Your collection was successfully updated!' && this.props.errorMessage !== "Fetched collection" ?
                            <div className="errors-collections">
                                {this.props.errorMessage}
                            </div> :
                            <div className="success-collections">
                                {this.props.errorMessage}
                            </div>
                        }
                        {this.props.errors.summary ?
                            <div className="errors-collections">
                                {this.props.errors.summary}
                            </div> : null
                        }
                        {this.props.errorMessage === 'Your collection was successfully updated!' ?
                            <div className="success-collections-create">
                                <Link to={`/admin/${this.props.adminId}/collections`}>
                                    <RaisedButton
                                        label="Finish"
                                        secondary={true}
                                        onTouchTap={this.resetScroll}
                                    />
                                </Link>
                            </div>: null
                        }
                        <div className="step-style">{this.getStepContent(stepIndex)}</div>
                        <CardActions className="step-actions">
                            {stepIndex === 0 ?
                                <Link to={`/admin/${this.props.adminId}/collections`}>
                                    <RaisedButton
                                        label="Cancel"
                                        secondary={true}/>
                                </Link>
                                :
                                <FlatButton
                                    label="Back"
                                    disabled={stepIndex === 0}
                                    onTouchTap={this.handlePrev}/>
                            }

                            <RaisedButton
                                label={stepIndex === 2 ? "Save" : "Next"}
                                primary={true}
                                onTouchTap={stepIndex === 2 ? this.props.onSave : this.handleNext}/>
                        </CardActions>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default Update