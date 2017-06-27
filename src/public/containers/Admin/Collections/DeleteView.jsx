import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Delete from '../../../components/Admin/Collections/Main Components/Delete.jsx';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import {connect} from 'react-redux';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import * as deleteActions from '../../../actions/Admin/Collections/manageCollectionsDeleteActionsAdmin.js';

let createHandlers = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(deleteActions.onDeleteInitiate(collectionId))
    };

    let onDelete = function (collectionId, ownerId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, picturesArray) {
        dispatch(deleteActions.onDeleteExecute(collectionId, ownerId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, picturesArray))
    };

    return {
        getCollection,
        onDelete
    }
};

class DeleteView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandlers(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getCollection(this.props.params._collectionId);
    };

    onDelete = () => {
        if (this.props.collection.response === true) {
            const collectionId = this.props.params._collectionId;
            const ownerId = this.props.collection.userId;
            const userName = this.props.collection.userName;
            const profilePictureLink = this.props.collection.profilePictureLink;
            const collectionName = this.props.collection.collectionName;
            const collectionDescriptionRaw = this.props.collection.collectionDescriptionRaw;
            const pictures = this.props.collection.pictures;
            this.handlers.onDelete(collectionId, ownerId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures);
        }
    };

    render() {
        if (this.props.collection.collectionName)
            document.title = "Delete - " + this.props.collection.collectionName;
        else document.title = "404 not found";
        if (this.props.credentials.admin === true)
            return <Delete
                response={this.props.collection.response}
                adminId={this.props.params._id}
                message={this.props.collection.message}
                onDelete={this.onDelete}/>;
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;

    }
}

DeleteView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
    collection: React.PropTypes.shape({
        response: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        message: PropTypes.string,
        collection: React.PropTypes.shape({
            collectionName: PropTypes.string,
            collectionDescriptionRaw: PropTypes.string,
            pictures: React.PropTypes.shape({
                pictureName: PropTypes.string,
                pictureLink: PropTypes.string,
                pictureDescriptionRaw: PropTypes.string
            })
        })
    })
};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

const collection = (state) => {
    const statePath = state.manageCollectionsDeleteReducerAdmin;
    return {
        response: statePath.response,
        message: statePath.message,
        collectionName: statePath.collectionName,
        collectionDescriptionRaw: statePath.collectionDescriptionRaw,
        pictures: statePath.pictures,
        userId: statePath.userId,
        userName: statePath.userName,
        profilePictureLink: statePath.profilePictureLink
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    collection: collection(state)
});

export default connect(mapStateToProps)(DeleteView)