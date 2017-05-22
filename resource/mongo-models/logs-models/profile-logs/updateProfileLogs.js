const mongoose = require('mongoose');

const UpdateProfileLogsSchema = new mongoose.Schema({

    //userId of the member that updated his profile
    userId: String,
    //newState
    profilePictureLink : String,
    profileCover: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    city: String,
    country: String,
    profession: String,
    companyName: String,
    //oldState
    profilePictureLinkOld : String,
    profileCoverOld: String,
    firstNameOld: String,
    lastNameOld: String,
    birthDateOld: String,
    cityOld: String,
    countryOld: String,
    professionOld: String,
    companyNameOld: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateProfileLogs', UpdateProfileLogsSchema);