import React, {Component} from 'react'

import Profile from '../../components/Profile/Profile.jsx';
import NotFoundPage from '../Error/NotFoundView.jsx';

import Auth from '../../modules/Auth.js';

class ProfileView extends Component {
    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem('successMessage');
        let successMessage = '';

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem('successMessage');
        }

        this.state = {
            errors: {},
            successMessage,
            userName: '',
            ownUser: '',
            birthDate: '',
            city: '',
            companyName: '',
            country: '',
            firstName: '',
            lastName: '',
            profession: '',
            profilePictureLink: '',
            profileCover: '',
            successUpdate: null,
            userId: '',
            collectionId: '',
            collectionName: '',
            pictureOneLink: '',
            latestCollection: {},
            //oldState if exists
            profilePictureLinkOld: '',
            profileCoverOld: '',
            firstNameOld: '',
            lastNameOld: '',
            birthDateOld: '',
            cityOld: '',
            countryOld: '',
            professionOld: '',
            companyNameOld: ''
        };
    };

    componentDidMount() {
        const userName = encodeURIComponent(this.props.params.userName);
        const formData = `userName=${userName}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/profile/profile');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {},
                    userId: xhr.response.user.userId,
                    userName: xhr.response.user.name,
                    ownUser: xhr.response.user.ownUser,
                    birthDate: xhr.response.user.birthDate,
                    city: xhr.response.user.city,
                    companyName: xhr.response.user.companyName,
                    country: xhr.response.user.country,
                    firstName: xhr.response.user.firstName,
                    lastName: xhr.response.user.lastName,
                    profession: xhr.response.user.profession,
                    profilePictureLink: xhr.response.user.profilePictureLink,
                    profileCover: xhr.response.user.profileCover,
                    latestCollection: xhr.response.user.latestCollection,
                    profilePictureLinkOld: xhr.response.user.profilePictureLink,
                    profileCoverOld: xhr.response.user.profileCover,
                    firstNameOld: xhr.response.user.firstName,
                    lastNameOld: xhr.response.user.lastName,
                    birthDateOld: xhr.response.user.birthDate,
                    cityOld: xhr.response.user.city,
                    countryOld: xhr.response.user.country,
                    professionOld: xhr.response.user.profession,
                    companyNameOld: xhr.response.user.companyName
                });
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);
    };

    onFirstNameChange = (e) => {
        this.setState({firstName: e.target.value});
    };

    onLastNameChange = (e) => {
        this.setState({lastName: e.target.value});
    };

    onBirthDateChange = (e, date) => {
        this.setState({birthDate: date});
    };

    onCityChange = (e) => {
        this.setState({city: e.target.value});
    };

    onCountryChange = (e) => {
        this.setState({country: e.target.value});
    };

    onProfessionChange = (e) => {
        this.setState({profession: e.target.value});
    };

    onCompanyNameChange = (e) => {
        this.setState({companyName: e.target.value})
    };

    onProfilePictureLinkChange = (e) => {
        this.setState({profilePictureLink: e.target.value})
    };

    onProfileCoverChange = (e) => {
        this.setState({profileCover: e.target.value})
    };

    onEdit = () => {
        this.setState({
            successUpdate: null
        });
    };

    onCancelEdit = () => {
        this.setState({
            firstName: this.state.firstNameOld,
            lastName: this.state.lastNameOld,
            birthDate: this.state.birthDateOld,
            city: this.state.cityOld,
            country: this.state.countryOld,
            profession: this.state.professionOld,
            companyName: this.state.companyNameOld,
            profilePictureLink: this.state.profilePictureLinkOld,
            profileCover: this.state.profileCoverOld,
            successUpdate: null
        });
    };

    onSave = () => {
        //newState
        const firstName = encodeURIComponent(this.state.firstName);
        const lastName = encodeURIComponent(this.state.lastName);
        const birthDate = encodeURIComponent(this.state.birthDate);
        const city = encodeURIComponent(this.state.city);
        const country = encodeURIComponent(this.state.country);
        const profession = encodeURIComponent(this.state.profession);
        const companyName = encodeURIComponent(this.state.companyName);
        const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);
        const profileCover = encodeURIComponent(this.state.profileCover);

        //oldState
        const firstNameOld = encodeURIComponent(this.state.firstNameOld);
        const lastNameOld = encodeURIComponent(this.state.lastNameOld);
        const birthDateOld = encodeURIComponent(this.state.birthDateOld);
        const cityOld = encodeURIComponent(this.state.cityOld);
        const countryOld = encodeURIComponent(this.state.countryOld);
        const professionOld = encodeURIComponent(this.state.professionOld);
        const companyNameOld = encodeURIComponent(this.state.companyNameOld);
        const profilePictureLinkOld = encodeURIComponent(this.state.profilePictureLinkOld);
        const profileCoverOld = encodeURIComponent(this.state.profileCoverOld);

        const formData = `firstName=${firstName}&lastName=${lastName}&birthDate=${birthDate}&city=${city}&country=${country}&profession=${profession}&companyName=${companyName}&profilePictureLink=${profilePictureLink}&profileCover=${profileCover}&firstNameOld=${firstNameOld}&lastNameOld=${lastNameOld}&birthDateOld=${birthDateOld}&cityOld=${cityOld}&countryOld=${countryOld}&professionOld=${professionOld}&companyNameOld=${companyNameOld}&profilePictureLinkOld=${profilePictureLinkOld}&profileCoverOld=${profileCoverOld}`;

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/profile/profile-edit');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    errors: {},
                    successUpdate: xhr.response.successStatus
                });
            } else {
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;

                this.setState({
                    errors
                });
            }
        });
        xhr.send(formData);

        this.setState({
            profilePictureLinkOld: this.state.profilePictureLink,
            profileCoverOld: this.state.profileCover,
            firstNameOld: this.state.firstName,
            lastNameOld: this.state.lastName,
            birthDateOld: this.state.birthDate,
            cityOld: this.state.city,
            countryOld: this.state.country,
            professionOld: this.state.profession,
            companyNameOld: this.state.companyName
        })
    };

    render() {
        if (this.state.errors.summary == "User is not a member") {
            document.title = "404 not found";
            return (
                <NotFoundPage />
            )
        }
        else {
            document.title = this.state.userName + ' - Profile';
            return (
                <Profile
                    latestCollection={this.state.latestCollection}
                    city={this.state.city}
                    companyName={this.state.companyName}
                    country={this.state.country}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    profession={this.state.profession}
                    profilePictureLink={this.state.profilePictureLink}
                    profileCover={this.state.profileCover}
                    userName={this.state.userName}
                    ownUser={this.state.ownUser}
                    successUpdate={this.state.successUpdate}
                    collectionId={this.state.collectionId}
                    collectionName={this.state.collectionName}
                    pictureOneLink={this.state.pictureOneLink}
                    onFirstNameChange={this.onFirstNameChange}
                    onLastNameChange={this.onLastNameChange}
                    onBirthDateChange={this.onBirthDateChange}
                    birthDate={JSON.stringify(this.state.birthDate)}
                    onCityChange={this.onCityChange}
                    onCountryChange={this.onCountryChange}
                    onProfessionChange={this.onProfessionChange}
                    onCompanyNameChange={this.onCompanyNameChange}
                    onProfilePictureLinkChange={this.onProfilePictureLinkChange}
                    onProfileCoverChange={this.onProfileCoverChange}
                    onEdit={this.onEdit}
                    onCancelEdit={this.onCancelEdit}
                    onSave={this.onSave}
                    errors={this.state.errors}
                />
            )
        }
    };
}

export default ProfileView