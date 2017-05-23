import React, {Component} from 'react';

class PictureRow extends Component {
    render() {
        return (
            <div>
                <div>
                    <img src={this.props.newsPictureLink} />
                </div>
            </div>
        )
    }
}
export default PictureRow;