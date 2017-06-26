import * as types from '../../actions/actionTypes.js';

export default function profileReducer(state = {
    errors: {},
    message: '',
    successStatus: null,
    userId: '',
    userName: '',
    profilePictureLink: '',
    profileCover: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    profession: '',
    companyName: '',
    city: '',
    country: '',
    latestCollections: '',
    ownUser: null,
    profilePictureLinkOld: '',
    profileCoverOld: '',
    firstNameOld: '',
    lastNameOld: '',
    birthDateOld: '',
    professionOld: '',
    companyNameOld: '',
    cityOld: '',
    countryOld: '',
    slideIndex: 1,
    openProfilePicture: false,
    openCoverPicture: false,
    openSnackBar: false
}, action) {
    switch (action.type) {

        case types.GET_PROFILE_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.GET_PROFILE_SUCCESS: {
            return {
                ...state,
                fetching: false,
                fetched: true,
                userId: action.userId,
                userName: action.userName,
                profilePictureLink: action.profilePictureLink,
                profileCover: action.profileCover,
                firstName: action.firstName,
                lastName: action.lastName,
                birthDate: action.birthDate,
                profession: action.profession,
                companyName: action.companyName,
                city: action.city,
                country: action.country,
                latestCollections: action.latestCollections,
                ownUser: action.ownUser,
                profilePictureLinkOld: action.profilePictureLink,
                profileCoverOld: action.profileCover,
                firstNameOld: action.firstName,
                lastNameOld: action.lastName,
                birthDateOld: action.birthDate,
                professionOld: action.profession,
                companyNameOld: action.companyName,
                cityOld: action.city,
                countryOld: action.country
            };
        }

        case types.GET_PROFILE_FAILURE:
            return {
                ...state,
                fetching: false,
                fetched: false
            };

        case types.ON_FIRST_NAME_CHANGE:
            return {
                ...state,
                firstName: action.firstName
            };

        case types.ON_LAST_NAME_CHANGE:
            return {
                ...state,
                lastName: action.lastName
            };

        case types.ON_BIRTH_DATE_CHANGE:
            return {
                ...state,
                birthDate: action.birthDate
            };

        case types.ON_CITY_CHANGE:
            return {
                ...state,
                city: action.city
            };

        case types.ON_COUNTRY_CHANGE:
            return {
                ...state,
                country: action.country
            };

        case types.ON_PROFESSION_CHANGE:
            return {
                ...state,
                profession: action.profession
            };

        case types.ON_COMPANY_NAME_CHANGE:
            return {
                ...state,
                companyName: action.companyName
            };

        case types.ON_PROFILE_PICTURE_LINK_CHANGE:
            return {
                ...state,
                profilePictureLink: action.profilePictureLink
            };

        case types.ON_PROFILE_COVER_CHANGE:
            return {
                ...state,
                profileCover: action.profileCover
            };

        case types.ON_UPDATE_PROFILE_INITIATE:
            return {
                ...state
            };

        case types.ON_UPDATE_PROFILE_CANCEL:
            return {
                ...state,
                firstName: state.firstNameOld,
                lastName: state.lastNameOld,
                birthDate: state.birthDateOld,
                city: state.cityOld,
                country: state.countryOld,
                profession: state.professionOld,
                companyName: state.companyNameOld,
                profilePictureLink: state.profilePictureLinkOld,
                profileCover: state.profileCoverOld
            };

        case types.ON_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                firstNameOld: state.firstName,
                lastNameOld: state.lastNameOld,
                birthDateOld: state.birthDate,
                cityOld: state.city,
                countryOld: state.country,
                professionOld: state.profession,
                companyNameOld: state.companyName,
                profilePictureLinkOld: state.profilePictureLink,
                profileCoverOld: state.profileCover,
                successStatus: action.successStatus,
                openSnackBar: true
            };

        case types.ON_UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                errors: action.errors,
                message: action.message,
                successStatus: false
            };

        case types.ON_OPEN_PROFILE_PICTURE_MODAL:
            return {
                ...state,
                openProfilePicture: true
            };

        case types.ON_CLOSE_PROFILE_PICTURE_MODAL:
            return {
                ...state,
                openProfilePicture: false
            };

        case types.ON_OPEN_COVER_PICTURE_MODAL:
            return {
                ...state,
                openCoverPicture: true
            };

        case types.ON_CLOSE_COVER_PICTURE_MODAL:
            return {
                ...state,
                openCoverPicture: false
            };

        case types.ON_SLIDE_INDEX_PROFILE_CHANGE:
            return {
                ...state,
                slideIndex: action.stepIndex
            };

        case types.ON_CLOSE_SNACK_BAR:
            return {
                ...state,
                openSnackBar: false
            };

        default:
            return state;
    }
}