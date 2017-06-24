import React, {Component} from 'react';
import {Card, CardText} from 'material-ui';

class NoCommentsFound extends Component {
    render() {
        return (
            <Card>
                <CardText>
                    No comments to be shown.
                </CardText>
            </Card>
        )
    }
}

export default NoCommentsFound