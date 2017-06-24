import React, {Component} from 'react';
import {Card, CardText} from 'material-ui'

class NoCollectionsFound extends Component {
    render() {
        return (
            <Card>
                <CardText>
                    No collections found
                </CardText>
            </Card>
        )
    }
}

export default NoCollectionsFound