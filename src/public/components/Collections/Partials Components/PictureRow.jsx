import React, {Component} from 'react';
import {CardMedia, CardTitle, Dialog, RaisedButton} from 'material-ui';

class PictureRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false
        }
    }

    handleOpenModal = () => {
        this.setState({
            modalIsOpen: true
        })
    };

    handleCloseModal = () => {
        this.setState({
            modalIsOpen: false
        })
    };

    getHTML = () => {
        if (this.props.pictureDescription) {
            return {__html: this.props.pictureDescription};
        }
    };

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
    };

    render() {

        return (
            <div className="force-image-height">
                <CardMedia
                    style={{cursor: "pointer"}}
                    onTouchTap={this.handleOpenModal}
                    overlay={<CardTitle title={this.props.pictureName}
                                        subtitle="Click for more details"/>}>
                    <img onError={this.addDefaultPicture} src={this.props.pictureLink}/>
                </CardMedia>
                <Dialog
                    autoDetectWindowHeight={false}
                    repositionOnUpdate={false}
                    actions={<RaisedButton
                        onTouchTap={this.handleCloseModal}
                        label="Close me"
                        primary={true}
                        buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        open={this.state.modalIsOpen}
                        title={this.props.pictureName}
                        titleStyle={{boxShadow: "transparent"}}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseModal}>
                    <CardMedia>
                        <img onError={this.addDefaultPicture} src={this.props.pictureLink}/>
                    </CardMedia>
                    <div dangerouslySetInnerHTML={this.getHTML()}
                         style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>
                </Dialog>
            </div>
        )
    }
}

export default PictureRow