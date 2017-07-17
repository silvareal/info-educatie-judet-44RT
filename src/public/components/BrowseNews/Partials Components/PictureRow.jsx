import React, {Component} from 'react';
import {CardMedia, CardTitle, Dialog} from 'material-ui';

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
                    onTouchTap={this.handleOpenModal}
                    overlay={<CardTitle title={this.props.pictureName}/>}
                >
                    <img src={this.props.pictureLink}/>
                </CardMedia>
                <Dialog repositionOnUpdate={false}
                        autoDetectWindowHeight={false}
                        open={this.state.modalIsOpen}
                        title={this.props.pictureName}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseModal}>
                    <CardMedia>
                        <img src={this.props.pictureLink}/>
                    </CardMedia>
                    <div dangerouslySetInnerHTML={this.getHTML()}
                         style={{wordWrap: "break-word", wordBreak: 'break-word', overflowWrap: 'break-word'}}/>
                </Dialog>
            </div>
        )
    }
}
export default PictureRow;