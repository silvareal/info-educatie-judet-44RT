import React, {Component} from 'react'

import Update from '../components/Update.jsx';
import Auth from '../modules/Auth.js';

class UpdateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            userId: '',
            errorMessage: '',
            collectionId: '',
            collectionName: '',
            collectionDescription: '',
            inputToRender: 1,
            errors: {},
            errorsPicturesArray: {},
            pictureNameError: [],
            pictureDescriptionError: [],
            pictureLinkError: [],
            pictures: [{
                pictureName: '',
                pictureDescription: '',
                pictureLink: ''
            }],
            //oldState
            collectionNameOld: '',
            collectionDescriptionOld: '',
            picturesOld: [{}]
        };
    };

    componentDidMount() {

        this.setState({
            errorMessage: "Fetching"
        });

        //The next few lines will define the HTTP body message
        const collectionId = encodeURIComponent(this.props.params._id);

        const formData = `collectionId=${collectionId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/crud/updateShow');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //We have checked the user's identity and have retrieved the data of the collection
                this.setState({
                    userId: xhr.response.userId,
                    errorMessage: 'Fetched collection',
                    collectionId: xhr.response.collection._id,
                    collectionName: xhr.response.collection.collectionName,
                    collectionDescription: xhr.response.collection.collectionDescription,
                    pictures: xhr.response.collection.picturesArray,
                    inputToRender: xhr.response.collection.picturesArray.length,
                    response: true,
                    collectionNameOld: xhr.response.collection.collectionName,
                    collectionDescriptionOld: xhr.response.collection.collectionDescription,
                    picturesOld: xhr.response.collection.picturesArray
                });

            } else if (xhr.status == 404) {
                //The user or collection does not exist
                //We show the corresponding error message
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false
                });
            }
            else {
                //Database error to be handled only by an admin
                this.setState({
                    errorMessage: xhr.response.message,
                    response: false
                });
            }
        });

        xhr.send(formData);
    };

    onCollectionChange = (e) => {
        this.setState({collectionName: e.target.value});
    };

    onCollectionDescriptionChange = (e) => {
        this.setState({collectionDescription: e.target.value});
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.setState({pictures: newPictures});
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.setState({pictures: newPictures});
    };

    handlePicturesDescriptionChange = (i) => (e) => {
        const newPictures = this.state.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureDescription: e.target.value};
        });
        this.setState({pictures: newPictures});
    };

    handleAddPictures = (i) => () => {
        if (this.state.inputToRender < 4) {
            this.setState({
                inputToRender: this.state.inputToRender + 1,
                pictures: this.state.pictures.concat([{
                    pictureName: '',
                    pictureLink: '',
                    pictureDescription: ''
                }])
            });
        }
        else {
            this.setState({errorMessage: "You can only add up to 4 pictures"})
        }
    };

    handleRemovePictures = (i) => () => {
        this.setState({
            pictures: this.state.pictures.filter((s, j) => i !== j),
            inputToRender: this.state.inputToRender - 1
        });
    };

    onSave = () => {
        if (this.state.response === true) {
            //The next few lines will define the HTTP body message
            const collectionId = encodeURIComponent(this.state.collectionId);
            const collectionName = encodeURIComponent(this.state.collectionName);
            const collectionDescription = encodeURIComponent(this.state.collectionDescription);
            const picturesArray = JSON.stringify(this.state.pictures);

            const collectionNameOld = encodeURIComponent(this.state.collectionNameOld);
            const collectionDescriptionOld = encodeURIComponent(this.state.collectionDescriptionOld);
            const picturesArrayOld = JSON.stringify(this.state.picturesOld);

            const formData = `collectionNameOld=${collectionNameOld}&collectionDescriptionOld=${collectionDescriptionOld}&picturesArrayOld=${picturesArrayOld}&collectionId=${collectionId}&collectionName=${collectionName}&collectionDescription=${collectionDescription}&picturesArray=${picturesArray}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/crud/updateSave');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status == 200) {
                    //The collection was updated and we must show a confirmation
                    //We will use state.errorMessage to do that
                    this.setState({
                        errorMessage: "Your collection was successfully updated!"
                    });
                }
                else if (xhr.status == 404) {
                    //Handle error in case the collection is missing
                    this.setState({
                        errorMessage: "The collection was not found. Maybe you deleted it?"
                    });
                }
                else if (xhr.status == 400) {
                    //Inserted data is not correct or database error

                    const errors = xhr.response.errors ? xhr.response.errors : {};
                    errors.summary = xhr.response.message;
                    const errorsPicturesArray = xhr.response.errorsPicturesArray ? xhr.response.errorsPicturesArray : {};

                    this.setState({
                        successUpdate: false,
                        errors,
                        errorsPicturesArray
                    });

                    let pictureNameError, pictureDescriptionError, pictureLinkError;

                    pictureNameError = this.state.errorsPicturesArray.map((a) => {
                        return a.pictureName;
                    });

                    pictureDescriptionError = this.state.errorsPicturesArray.map((a) => {
                        return a.pictureDescription
                    });

                    pictureLinkError = this.state.errorsPicturesArray.map((a) => {
                        return a.pictureLink
                    });

                    this.setState({
                        pictureNameError: pictureNameError,
                        pictureLinkError: pictureLinkError,
                        pictureDescriptionError: pictureDescriptionError
                    })
                }
            });
            xhr.send(formData);
        }
    };

    //Finish showing errors on update fields and then look into trying to update non-existent collections

    render() {
        if (this.state.collectionName)
            document.title = "Update - " + this.state.collectionName;
        else
            document.title = "404 not found";
        return (
            <Update
                collectionId={this.state.collectionId}
                collectionName={this.state.collectionName}
                onCollectionChange={this.onCollectionChange}
                collectionDescription={this.state.collectionDescription}
                errorMessage={this.state.errorMessage}
                errors={this.state.errors}
                pictureNameError={this.state.pictureNameError}
                pictureDescriptionError={this.state.pictureDescriptionError}
                pictureLinkError={this.state.pictureLinkError}
                onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                pictures={this.state.pictures}
                handlePicturesNameChange={this.handlePicturesNameChange}
                handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                handlePicturesLinkChange={this.handlePicturesLinkChange}
                handleAddPictures={this.handleAddPictures}
                handleRemovePictures={this.handleRemovePictures}
                onSave={this.onSave}
            />
        )
    }
}

export default UpdateView