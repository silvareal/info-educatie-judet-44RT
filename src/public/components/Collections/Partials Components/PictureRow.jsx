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

    render() {

        return (
            <div className="force-image-height">
                <CardMedia
                    style={{cursor: "pointer"}}
                    onClick={this.handleOpenModal}
                    overlay={<CardTitle title={this.props.pictureName}
                                        subtitle="Click for more details"/>}>
                    <img src={this.props.pictureLink}/>
                </CardMedia>
                <Dialog actions={<RaisedButton
                        onClick={this.handleCloseModal}
                        label="Close me"
                        primary={true}
                        buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        open={this.state.modalIsOpen}
                        title={this.props.pictureName}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseModal}>
                    <CardMedia>
                        <img src={this.props.pictureLink}/>
                    </CardMedia>
                    <div dangerouslySetInnerHTML={this.getHTML()}/>
                </Dialog>
            </div>
        )
    }
}

export default PictureRow