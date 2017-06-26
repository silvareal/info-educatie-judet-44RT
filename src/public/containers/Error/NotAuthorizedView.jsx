import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText} from 'material-ui';

class NotAuthorizedView extends Component {
    render() {
        document.title = "401 not authorized";
        const styles = {
            text: {
                fontSize: 30,
                textAlign: "center"
            }
        };
        return (
            <div className="parallax-home">
                <div className="top-bar-spacing"/>
                <Card className="container-collections" style={{backgroundColor: "transparent", boxShadow: "none"}}>
                    <Card>
                        <CardText style={styles.text}>
                            You're not authorized to see this page
                            <br/>
                            <Link to={`/`}>Back to the homepage</Link>
                        </CardText>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default NotAuthorizedView;