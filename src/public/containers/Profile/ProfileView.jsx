import React, {Component} from 'react'
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CardMedia, CardTitle} from 'material-ui';
import * as profileActions from '../../actions/Profile/profileActions.js'
import Profile from '../../components/Profile/Profile.jsx';

let createHandler = function (dispatch) {
    let getProfile = function (userName) {
        dispatch(profileActions.onGetProfile(userName))
    };

    let onFirstNameChange = function (firstName) {
        dispatch(profileActions.onFirstNameChange(firstName))
    };

    let onLastNameChange = function (lastName) {
        dispatch(profileActions.onLastNameChange(lastName))
    };

    let onBirthDateChange = function (birthDate) {
        dispatch(profileActions.onBirthDateChange(birthDate))
    };

    let onCityChange = function (city) {
        dispatch(profileActions.onCityChange(city))
    };

    let onCountryChange = function (country) {
        dispatch(profileActions.onCountryChange(country))
    };

    let onProfessionChange = function (profession) {
        dispatch(profileActions.onProfessionChange(profession))
    };

    let onCompanyNameChange = function (companyName) {
        dispatch(profileActions.onCompanyNameChange(companyName))
    };

    let onProfilePictureLinkChange = function (profilePictureLink) {
        dispatch(profileActions.onProfilePictureLinkChange(profilePictureLink))
    };

    let onProfileCoverChange = function (profileCover) {
        dispatch(profileActions.onProfileCoverChange(profileCover))
    };

    let onCancelEdit = function () {
        dispatch(profileActions.onUpdateProfileCancel())
    };

    let onUpdateProfile = function (viewerId,
                                    userId,
                                    firstName,
                                    lastName,
                                    birthDate,
                                    city,
                                    country,
                                    profession,
                                    companyName,
                                    profilePictureLink,
                                    profileCover,
                                    firstNameOld,
                                    lastNameOld,
                                    birthDateOld,
                                    cityOld,
                                    countryOld,
                                    professionOld,
                                    companyNameOld,
                                    profilePictureLinkOld,
                                    profileCoverOld) {
        dispatch(profileActions.onUpdateProfile(
            viewerId,
            userId,
            firstName,
            lastName,
            birthDate,
            city,
            country,
            profession,
            companyName,
            profilePictureLink,
            profileCover,
            firstNameOld,
            lastNameOld,
            birthDateOld,
            cityOld,
            countryOld,
            professionOld,
            companyNameOld,
            profilePictureLinkOld,
            profileCoverOld
        ))
    };

    return {
        getProfile,
        onFirstNameChange,
        onLastNameChange,
        onBirthDateChange,
        onCityChange,
        onCountryChange,
        onProfessionChange,
        onCompanyNameChange,
        onProfilePictureLinkChange,
        onProfileCoverChange,
        onCancelEdit,
        onUpdateProfile
    }
};

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    };

    componentDidMount() {
        this.handlers.getProfile(this.props.params.userName);
    };

    onFirstNameChange = (e) => {
        this.handlers.onFirstNameChange(e.target.value);
    };

    onLastNameChange = (e) => {
        this.handlers.onLastNameChange(e.target.value);
    };

    onBirthDateChange = (e, date) => {
        this.handlers.onBirthDateChange(date);
    };

    onCityChange = (e) => {
        this.handlers.onCityChange(e.target.value);
    };

    onCountryChange = (e) => {
        this.handlers.onCountryChange(e.target.value);
    };

    onProfessionChange = (e) => {
        this.handlers.onProfessionChange(e.target.value);
    };

    onCompanyNameChange = (e) => {
        this.handlers.onCompanyNameChange(e.target.value);
    };

    onProfilePictureLinkChange = (e) => {
        this.handlers.onProfilePictureLinkChange(e.target.value);
    };

    onProfileCoverChange = (e) => {
        this.handlers.onProfileCoverChange(e.target.value)
    };

    onCancelEdit = () => {
        this.handlers.onCancelEdit();
    };

    onSave = () => {

        //newState
        const viewerId = this.props.credentials.viewerId;
        const userId = this.props.profile.userId;
        const firstName = this.props.profile.firstName;
        const lastName = this.props.profile.lastName;
        const birthDate = this.props.profile.birthDate;
        const city = this.props.profile.city;
        const country = this.props.profile.country;
        const profession = this.props.profile.profession;
        const companyName = this.props.profile.companyName;
        const profilePictureLink = this.props.profile.profilePictureLink;
        const profileCover = this.props.profile.profileCover;

        //oldState
        const firstNameOld = this.props.profile.firstNameOld;
        const lastNameOld = this.props.profile.lastNameOld;
        const birthDateOld = this.props.profile.birthDateOld;
        const cityOld = this.props.profile.cityOld;
        const countryOld = this.props.profile.countryOld;
        const professionOld = this.props.profile.professionOld;
        const companyNameOld = this.props.profile.companyNameOld;
        const profilePictureLinkOld = this.props.profile.profilePictureLinkOld;
        const profileCoverOld = this.props.profile.profileCoverOld;

        this.handlers.onUpdateProfile(
            viewerId,
            userId,
            firstName,
            lastName,
            birthDate,
            city,
            country,
            profession,
            companyName,
            profilePictureLink,
            profileCover,
            firstNameOld,
            lastNameOld,
            birthDateOld,
            cityOld,
            countryOld,
            professionOld,
            companyNameOld,
            profilePictureLinkOld,
            profileCoverOld,

        );
    };

    render() {

        if (this.props.profile.errors && this.props.profile.errors.summary === "User is not a member") {
            document.title = "404 not found";
            return (
                <NotFoundPage />
            )
        }
        else {
            document.title = this.props.params.userName + ' - Profile';
            return (
                <Profile
                    profile={this.props.profile}
                    onFirstNameChange={this.onFirstNameChange}
                    onLastNameChange={this.onLastNameChange}
                    onBirthDateChange={this.onBirthDateChange}
                    onCityChange={this.onCityChange}
                    onCountryChange={this.onCountryChange}
                    onProfessionChange={this.onProfessionChange}
                    onCompanyNameChange={this.onCompanyNameChange}
                    onProfilePictureLinkChange={this.onProfilePictureLinkChange}
                    onProfileCoverChange={this.onProfileCoverChange}
                    onCancelEdit={this.onCancelEdit}
                    onSave={this.onSave}
                />
            )
        }
    };
}

ProfileView.propTypes = {
    credentials: React.PropTypes.shape({
        viewerId: PropTypes.string
    }),
    profile: React.PropTypes.shape({
        fetchedProfile: PropTypes.bool,
        fetchingProfile: PropTypes.bool,
        userId: PropTypes.string,
        userName: PropTypes.string,
        profilePictureLink: PropTypes.string,
        profilePictureLinkOld: PropTypes.string,
        profileCover: PropTypes.string,
        profileCoverOld: PropTypes.string,
        firstName: PropTypes.string,
        firstNameOld: PropTypes.string,
        lastName: PropTypes.string,
        lastNameOld: PropTypes.string,
        birthDate: PropTypes.string,
        birthDateOld: PropTypes.string,
        profession: PropTypes.string,
        professionOld: PropTypes.string,
        companyName: PropTypes.string,
        companyNameOld: PropTypes.string,
        country: PropTypes.string,
        countryOld: PropTypes.string,
        ownUser: PropTypes.bool,
        rows1: PropTypes.array,
        rows2: PropTypes.array
    })
};

const addDefaultPicture = (e) => {
    e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
};

const credentials = (state) => {
    if (state.userReducer.fetching === true) {
        return {
            guest: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            viewerId: response.userId,
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true
        };
};

const profile = (state) => {
    if (state.profileReducer.fetching === true) {
        return {
            fetchingProfile: true,
            fetchedProfile: false
        }
    }
    else if (state.profileReducer.fetching === false && state.profileReducer.fetched === true) {

        const statePath = state.profileReducer;

        const pictures = statePath.latestCollections;

        const rows1 = Object.keys(pictures).map((key) => {
            if (key < 2) {
                return (
                    <div className="profile-latest-collection" key={key}>
                        <Link to={`/collections/${pictures[key]._id}`}>
                            <CardMedia
                                style={{maxWidth: 640, maxHeight: "auto"}}
                                overlay={<CardTitle
                                    title={pictures[key].collectionName}
                                    subtitle={`By ` + pictures[key].userName}/>}>
                                <img onError={addDefaultPicture}
                                    src={pictures[key].picturesArray[0].pictureLink}
                                />
                            </CardMedia>
                        </Link>
                    </div>
                )
            }
        });

        const rows2 = Object.keys(pictures).map((key) => {
            if (key > 1) {
                return (
                    <div className="profile-latest-collection" key={key}>
                        <Link to={`/collections/${pictures[key]._id}`} key={key}>
                            <CardMedia
                                style={{maxWidth: 640, maxHeight: "auto"}}
                                overlay={<CardTitle
                                    title={pictures[key].collectionName}
                                    subtitle={`By ` + pictures[key].userName}/>}>
                                <img onError={addDefaultPicture}
                                    src={pictures[key].picturesArray[0].pictureLink}
                                />
                            </CardMedia>
                        </Link>
                    </div>
                )
            }
        });

        let errors = state.profileReducer.errors;
        if (errors)
            errors = {...errors, summary: state.profileReducer.message};

        return {
            fetchingProfile: false,
            fetchedProfile: true,
            rows1: rows1,
            rows2: rows2,
            userId: statePath.userId,
            userName: statePath.userName,
            profilePictureLink: statePath.profilePictureLink,
            profileCover: statePath.profileCover,
            firstName: statePath.firstName,
            lastName: statePath.lastName,
            birthDate: statePath.birthDate,
            profession: statePath.profession,
            companyName: statePath.companyName,
            city: statePath.city,
            country: statePath.country,
            ownUser: statePath.ownUser,
            profilePictureLinkOld: statePath.profilePictureLinkOld,
            profileCoverOld: statePath.profileCoverOld,
            firstNameOld: statePath.firstNameOld,
            lastNameOld: statePath.lastNameOld,
            birthDateOld: statePath.birthDateOld,
            professionOld: statePath.professionOld,
            companyNameOld: statePath.companyNameOld,
            cityOld: statePath.cityOld,
            countryOld: statePath.countryOld,
            errors: errors,
            successStatus: state.profileReducer.successStatus
        }
    }
    else if (state.profileReducer.fetching === false && state.profileReducer.fetched === false) {
        return {
            fetchingProfile: false,
            fetchedProfile: false
        }
    }
    else return {
            fetchingProfile: true,
            fetchedProfile: false
        }
};

const mapStateToProps = (state) => {
    return {
        credentials: credentials(state),
        profile: profile(state)
    }
};

export default connect(mapStateToProps)(ProfileView)