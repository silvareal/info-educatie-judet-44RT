import * as types from '../actionTypes.js';
import axios from 'axios';
import Auth from '../../modules/Auth.js';
import qs from 'qs';

// Initiated the Axios request
export function onGetProfileInitiate() {
    return {type: types.GET_PROFILE_INITIATED}
}

// Successfully retrieved the profile
export function onGetProfileSuccess(userId, userName, profilePictureLink, profileCover, firstName, lastName, birthDate, profession, companyName, city, country, latestCollections, ownUser) {
    return {
        type: types.GET_PROFILE_SUCCESS,
        userId: userId,
        userName: userName,
        profilePictureLink: profilePictureLink,
        profileCover: profileCover,
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        profession: profession,
        companyName: companyName,
        city: city,
        country: country,
        latestCollections: latestCollections,
        ownUser: ownUser
    }
}

// Failed to retrieve the profile
export function onGetProfileFailure() {
    return {type: types.GET_PROFILE_FAILURE}
}

// Function for retrieving the profile
export function onGetProfile(userName) {
    return function (dispatch) {
        dispatch(onGetProfileInitiate());
        return axios ({
            method: 'post',
            url: '/profile/profile',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'userName': userName
            })
        }).then((response) => {
            const user = response.data.user;
            dispatch(onGetProfileSuccess(
                user.userId,
                user.name,
                user.profilePictureLink,
                user.profileCover,
                user.firstName,
                user.lastName,
                user.birthDate,
                user.profession,
                user.companyName,
                user.city,
                user.country,
                user.latestCollections,
                user.ownUser
            ))
        }).catch((err) => {
            console.log(err);
            dispatch(onGetProfileFailure());
        })
    }
}

// Handle firstName onChange event
export function onFirstNameChange(firstName) {
    return function (dispatch) {
        dispatch({
            type: types.ON_FIRST_NAME_CHANGE,
            firstName: firstName
        })
    }
}

// Handle lastName onChange event
export function onLastNameChange(lastName) {
    return function (dispatch) {
        dispatch({
            type: types.ON_LAST_NAME_CHANGE,
            lastName: lastName
        })
    }
}

// Handle birthDate onChange event
export function onBirthDateChange(birthDate) {
    return function (dispatch) {
        dispatch({
            type: types.ON_BIRTH_DATE_CHANGE,
            birthDate: birthDate
        })
    }
}

// Handle city onChange event
export function onCityChange(city) {
    return function (dispatch) {
        dispatch({
            type: types.ON_CITY_CHANGE,
            city: city
        })
    }
}

// Handle country onChange event
export function onCountryChange(country) {
    return function (dispatch) {
        dispatch({
            type: types.ON_COUNTRY_CHANGE,
            country: country
        })
    }
}

// Handle profession onChange event
export function onProfessionChange(profession) {
    return function (dispatch) {
        dispatch({
            type: types.ON_PROFESSION_CHANGE,
            profession: profession
        })
    }
}

// Handle companyName onChange event
export function onCompanyNameChange(companyName) {
    return function (dispatch) {
        dispatch({
            type: types.ON_COMPANY_NAME_CHANGE,
            companyName: companyName
        })
    }
}

// Handle profilePictureLink onChange event
export function onProfilePictureLinkChange(profilePictureLink) {
    return function (dispatch) {
        dispatch({
            type: types.ON_PROFILE_PICTURE_LINK_CHANGE,
            profilePictureLink: profilePictureLink
        })
    }
}

// Handle profileCover onChange event
export function onProfileCoverChange(profileCover) {
    return function (dispatch) {
        dispatch({
            type: types.ON_PROFILE_COVER_CHANGE,
            profileCover: profileCover
        })
    }
}

// Initiated the Axios request
export function onUpdateProfileInitiate() {
    return {type: types.ON_UPDATE_PROFILE_INITIATE}
}

// Cancelled updating profile
export function onUpdateProfileCancel() {
    return function (dispatch) {
        dispatch({type: types.ON_UPDATE_PROFILE_CANCEL})
    }
}

// Successfully updated the profile
export function onUpdateProfileSuccess(successStatus) {
    return {type: types.ON_UPDATE_PROFILE_SUCCESS, successStatus: successStatus}
}

// Failed to update the profile
export function onUpdateProfileFailure(errors, message) {
    return {type: types.ON_UPDATE_PROFILE_FAILURE, errors: errors, message: message}
}

// Function for updating the profile
export function onUpdateProfile(
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
) {
    return function (dispatch) {
        dispatch(onUpdateProfileInitiate());
        return axios({
            method: 'post',
            url: '/profile/profile-edit',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'viewerId': viewerId,
                'userId': userId,
                'firstName': firstName,
                'lastName': lastName,
                'birthDate': birthDate,
                'city': city,
                'country': country,
                'profession': profession,
                'companyName': companyName,
                'profilePictureLink': profilePictureLink,
                'profileCover': profileCover,
                'firstNameOld': firstNameOld,
                'lastNameOld': lastNameOld,
                'birthDateOld': birthDateOld,
                'cityOld': cityOld,
                'countryOld': countryOld,
                'professionOld': professionOld,
                'companyNameOld': companyNameOld,
                'profilePictureLinkOld': profilePictureLinkOld,
                'profileCoverOld': profileCoverOld
            })
        }).then((response) => {
            dispatch(onUpdateProfileSuccess(response.data.successStatus))
        }).catch((err) => {
            dispatch(onUpdateProfileFailure(err.response.data.errors, err.response.data.message))
        })
    }
}

// Open profilePicture modal
export function openProfilePictureModal() {
    return function (dispatch) {
        dispatch({type: types.ON_OPEN_PROFILE_PICTURE_MODAL, openProfilePicture: true})
    }
}

// Close profilePicture modal
export function closeProfilePictureModal() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_PROFILE_PICTURE_MODAL, openProfilePicture: false})
    }
}

// Open profileCover modal
export function openProfileCoverModal() {
    return function (dispatch) {
        dispatch({type: types.ON_OPEN_COVER_PICTURE_MODAL, openCoverPicture: true})
    }
}

// Close profileCover modal
export function closeProfileCoverModal() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_COVER_PICTURE_MODAL, openCoverPicture: false})
    }
}

// Slide Index change handler
export function onSlideIndexChange(stepIndex) {
    return function (dispatch) {
        dispatch({type: types.ON_SLIDE_INDEX_PROFILE_CHANGE, stepIndex: stepIndex})
    }
}

// Close the SnackBar
export function closeSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_CLOSE_SNACK_BAR, openSnackBar: false})
    }
}