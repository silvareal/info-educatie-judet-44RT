import React, {Component} from 'react';
import {Card, CardMedia, CardHeader} from 'material-ui';
import {Link} from 'react-router';

import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ImageCollections from 'material-ui/svg-icons/image/collections';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement';

class AdminPage extends Component {

    render() {

        const styles = {

            cardMedia: {
                textAlign: "center"
            }
        };

        return (
            <div>
                <div className="top-bar-spacing"/>
                <Card className="container-admin-cp" style={{boxShadow: "none"}}>
                    <div className="mobile-header-admin-cp">
                        <CardHeader title=
                                        {
                                            <div className="user-header">
                                                Welcome {this.props.firstName ? this.props.firstName : this.props.userName}!
                                            </div>
                                        }
                                    avatar={this.props.profilePictureLink ? this.props.profilePictureLink :
                                        <ActionAccountCircle/>}
                        />
                    </div>
                    <div className="icons-container-admin-cp">
                        <CardMedia style={styles.cardMedia}>
                            <Link to={`/admin/${this.props.adminId}/users`}>
                                <div className="icons-content-admin-cp">
                                    <ActionAccountBox/>
                                </div>
                            </Link>
                            <Link to={`/admin/${this.props.adminId}/users`}>
                                <div className="action-header">Users management</div>
                            </Link>
                        </CardMedia>
                        <CardMedia style={styles.cardMedia}>
                            <Link to={`/admin/${this.props.adminId}/collections`}>
                                <div className="icons-content-admin-cp">
                                    <ImageCollections/>
                                </div>
                            </Link>
                            <Link to={`/admin/${this.props.adminId}/collections`}>
                                <div className="action-header">Collections management</div>
                            </Link>
                        </CardMedia>
                        <CardMedia style={styles.cardMedia}>
                            <Link to={`/news`}>
                                <div className="icons-content-admin-cp">
                                    <ActionAnnouncement/>
                                </div>
                            </Link>
                            <Link to={`/admin/${this.props.adminId}/news`}>
                                <div className="action-header">News management</div>
                            </Link>
                        </CardMedia>
                    </div>
                </Card>
            </
                div >
        )
    }
}

export default AdminPage;