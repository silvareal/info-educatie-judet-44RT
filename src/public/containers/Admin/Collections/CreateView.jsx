import React, {Component} from 'react'

import Create from '../../../components/Admin/Collections/Main Components/Create.jsx'
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';
import Auth from '../../../modules/Auth.js';

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            successCreation: '',
            collectionName: '',
            collectionDescription: '',
            inputCount: 1,
            errorMessage: '',
            errors: {},
            errorsPicturesArray: {},
            pictureNameError: [],
            pictureDescriptionError: [],
            pictureLinkError: [],
            pictures: [{
                pictureName: '',
                pictureLink: '',
                pictureDescription: ''
            }],
            isAdmin: false
        };
    };

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    }

    onUserIdChange = (e) => {
        this.setState({userId: e.target.value});
    };

    onCollectionChange = (e) => {
        this.setState({collectionName: e.target.value});
    };

    onCollectionDescriptionChange = (e) => {
        this.setState({collectionDescription: e.target.value});
    };

    onPictureNameChange = (e) => {
        this.setState({pictureName: e.target.value});
    };

    onPictureLinkChange = (e) => {
        this.setState({pictureLink: e.target.value});
    };

    onPictureDescriptionChange = (e) => {
        this.setState({pictureDescription: e.target.value});
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
        if (this.state.inputCount < 4) {
            this.setState({
                inputCount: this.state.inputCount + 1,
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
            errorMessage: '',
            inputCount: this.state.inputCount - 1
        });
    };

    onSave = () => {
        //The next few lines will define the HTTP body message
        const userId = encodeURIComponent(this.state.userId);
        const collectionName = encodeURIComponent(this.state.collectionName);
        const collectionDescription = encodeURIComponent(this.state.collectionDescription);
        const picturesArray = encodeURIComponent(JSON.stringify(this.state.pictures));

        const formData = `userId=${userId}&collectionName=${collectionName}&collectionDescription=${collectionDescription}&picturesArray=${picturesArray}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/createCollection');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {

                //We will display a Success! message if the entry was added to the DB
                //We will also reset the fields
                this.setState({
                    errors: {},
                    successCreation: true,
                    errorMessage: '',
                    userId: '',
                    collectionName: '',
                    collectionDescription: '',
                    pictures: [
                        {
                            pictureName: '',
                            pictureLink: '',
                            pictureDescription: ''
                        }
                    ],
                    pictureNameError: '',
                    pictureDescriptionError: '',
                    pictureLinkError: ''
                });
            }
            else if (xhr.status === 400) {

                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                const errorsPicturesArray = xhr.response.errorsPicturesArray ? xhr.response.errorsPicturesArray : {};

                this.setState({
                    successCreation: false,
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
                    pictureDescriptionError: pictureDescriptionError,
                    pictureLinkError: pictureLinkError
                })
            }
        });

        //Send the data for insertion into the DB
        xhr.send(formData);
    };

    render() {
        if (this.state.isAdmin === true)
        {
            document.title = "Create collections - Admin Controlled";
            return (
                <Create
                    userId={this.state.userId}
                    adminId={this.props.params._id}
                    onUserIdChange={this.onUserIdChange}
                    collectionName={this.state.collectionName}
                    onCollectionChange={this.onCollectionChange}
                    collectionDescription={this.state.collectionDescription}
                    onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                    pictures={this.state.pictures}
                    errorMessage={this.state.errorMessage}
                    onPictureNameChange={this.onPictureNameChange}
                    onPictureLinkChange={this.onPictureLinkChange}
                    onPictureDescriptionChange={this.onPictureDescriptionChange}
                    handlePicturesNameChange={this.handlePicturesNameChange}
                    handlePicturesLinkChange={this.handlePicturesLinkChange}
                    handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                    handleAddPictures={this.handleAddPictures}
                    handleRemovePictures={this.handleRemovePictures}
                    onSave={this.onSave}
                    successCreation={this.state.successCreation}
                    errors={this.state.errors}
                    pictureNameError={this.state.pictureNameError}
                    pictureDescriptionError={this.state.pictureDescriptionError}
                    pictureLinkError={this.state.pictureLinkError}
                />)
        }
        else return <NotAuthorizedPage/>
    }
}

export default CreateView;