import React, { Component } from 'react'
import { Card } from 'material-ui'

class NotAuthorizedPage extends Component {
    render(){
        return(
            <div>
                <Card className="container">
                    <div>
                        You're not authorized to see this page.
                    </div>
                </Card>
            </div>
        )
    }
}

export default NotAuthorizedPage;