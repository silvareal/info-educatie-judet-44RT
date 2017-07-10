import React, {Component} from 'react';
import {CardMedia, CardTitle, Dialog} from 'material-ui';

class PictureRow extends Component {

    constructor(props){
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
                    onClick={this.handleOpenModal}
                    overlay={<CardTitle title={this.props.pictureName}/>}
                >
                    <img onError={this.addDefaultPicture} src={this.props.pictureLink}/>
                </CardMedia>
                <Dialog open={this.state.modalIsOpen}
                        title={this.props.pictureName}
                        autoScrollBodyContent={true}
                        onRequestClose={this.handleCloseModal}>
                    <CardMedia>
                        <img onError={this.addDefaultPicture} src={this.props.pictureLink}/>
                    </CardMedia>
                    <div dangerouslySetInnerHTML={this.getHTML()}
                         style={{wordBreak: "break-all"}}/>
                </Dialog>
            </div>
        )
    }
}
export default PictureRow;