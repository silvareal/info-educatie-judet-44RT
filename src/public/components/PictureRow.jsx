import React, {Component} from 'react';

class PictureRow extends Component {

    getHTML = () => {
        return {__html: this.props.pictureDescriptionRender};
    };

    render() {
        return (
            <div>
                <div>
                    Picture name: {this.props.pictureName}
                </div>
                <div>
                    <img src={this.props.pictureLink} />
                </div>
                <div dangerouslySetInnerHTML={this.getHTML()} />
            </div>
        )
    }
}
export default PictureRow;