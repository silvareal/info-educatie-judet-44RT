import React, {Component} from 'react'
import {Card} from 'material-ui'

class NotFoundPage extends Component {
    render() {
        document.title = "404 not found";
        return (
            <Card className="container">
                <div>
                    The page you are looking for doesn't exist.
                </div>
            </Card>
        )
    }
}

export default NotFoundPage