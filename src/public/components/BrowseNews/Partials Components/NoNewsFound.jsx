import React, {Component} from 'react';
import {Card, CardText} from 'material-ui'

class NoNewsFound extends Component {
    render() {
        return (
            <Card>
                <CardText>
                    No news articles found
                </CardText>
            </Card>
        )
    }
}

export default NoNewsFound