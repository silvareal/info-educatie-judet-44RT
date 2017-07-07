import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AdminPage from '../../../components/Admin/Main Component/Admin.jsx';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';

class AdminView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        document.title = "Admin panel";
        if (this.props.admin) {
            return (
                <div>
                    <AdminPage
                        adminId={this.props.adminId}
                        userName={this.props.userName}
                        firstName={this.props.firstName}
                        profilePictureLink={this.props.profilePictureLink}
                        userId={this.props.params._id}
                    />
                </div>
            )
        }
        else return <NotAuthorizedView/>
    }
}

AdminView.propTypes = {
    admin: PropTypes.bool,
    userName: PropTypes.string,
    firstName: PropTypes.string,
    profilePictureLink: PropTypes.string,
    adminId: PropTypes.string
};

// Map credentials
const mapStateToProps = (state) => {
    if (state.userReducer.fetching === true) {
        return {
            guest: true,
            finished: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            admin: response.admin,
            adminId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            firstName: response.firstName,
            guest: response.guest,
            finished: true
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true,
            finished: true
        };
};

export default connect(mapStateToProps)(AdminView)