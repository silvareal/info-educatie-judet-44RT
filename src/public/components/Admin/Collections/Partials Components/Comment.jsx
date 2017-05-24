import React, {Component} from 'react';

class Comment extends Component {

    render() {
        return(
            <div style={{border: "2px solid black", padding: 5}}>
                <div>
                    Comment: {this.props.comment}
                </div>
                <div>
                    Added on: {this.props.date}
                </div>
                <div>
                    By: {this.props.firstName !== "undefined" ?
                    <div>
                        {this.props.firstName} @ {this.props.userName}
                    </div>
                    :
                    <div>
                        {this.props.userName}
                    </div>
                }
                </div>
            </div>
        )
    }

}

export default Comment;