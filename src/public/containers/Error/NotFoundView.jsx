import React, {Component} from 'react';
import {Link} from 'react-router';
import {Card, CardText} from 'material-ui';

class NotFoundView extends Component {
    render() {
        document.title = "404 not found";
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
                        The page you are looking for doesn't exist.
                            <br/>
                            <Link to={`/`}>Back to the homepage</Link>
                        </CardText>
                    </Card>
                </Card>
            </div>
        )
    }
}

export default NotFoundView