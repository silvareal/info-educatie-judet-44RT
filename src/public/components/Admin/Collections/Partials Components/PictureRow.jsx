import React, {Component} from 'react';

class PictureRow extends Component {
    render() {
        return (
            <div>
                <div>
                    Picture name: {this.props.pictureName}
                </div>
                <div>
                    <img src={this.props.pictureLink} />
                </div>
                <div>
                    Picture description: {this.props.pictureDescription}
                </div>
            </div>
        )
    }
}
export default PictureRow;