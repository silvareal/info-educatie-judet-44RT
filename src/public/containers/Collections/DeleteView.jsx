import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Delete from '../../components/Collections/Main Components/Delete.jsx';
import NotFoundView from "../Error/NotFoundView.jsx";
import {connect} from 'react-redux';
import * as deleteActions from '../../actions/Collections/manageCollectionsDeleteActions.js'

let createHandlers = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(deleteActions.onDeleteInitiate(collectionId))
    };

    let onDelete = function (collectionId, collectionName, collectionDescriptionRaw, picturesArray) {
        dispatch(deleteActions.onDeleteExecute(collectionId, collectionName, collectionDescriptionRaw, picturesArray))
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
        this.handlers.getCollection(this.props.params._id);
    };

    onDelete = () => {
        if (this.props.response === true) {
            const collectionId = this.props.params._id;
            const collectionName = this.props.collectionName;
            const collectionDescriptionRaw = this.props.collectionDescriptionRaw;
            const pictures = this.props.pictures;
            this.handlers.onDelete(collectionId, collectionName, collectionDescriptionRaw, pictures);
        }
    };

    render() {
        if (this.props.collectionName)
            document.title = "Delete - " + this.props.collectionName;
        else document.title = "404 not found";
        if (this.props.response === "Error")
            return <NotFoundView/>;
        return (
            <Delete
                response={this.props.response}
                message={this.props.message}
                onDelete={this.onDelete}/>
        )
    }
}

DeleteView.propTypes = {
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
};

const mapStateToProps = (state) => {
    const statePath = state.manageCollectionsDeleteReducer;
    return {
        response: statePath.response,
        message: statePath.message,
        collectionName: statePath.collectionName,
        collectionDescriptionRaw: statePath.collectionDescriptionRaw,
        pictures: statePath.pictures
    }
};

export default connect(mapStateToProps)(DeleteView);