const mongoose = require('mongoose');

const UpdateProfileLogsSchema = new mongoose.Schema({
    // Schema for users profile updates

    // New state
    profilePictureLink : String,
    profileCover: String,
    firstName: String,
    lastName: String,
    birthDate: String,
    city: String,
    country: String,
    profession: String,
    companyName: String,

    // Old state
    profilePictureLinkOld : String,
    profileCoverOld: String,
    firstNameOld: String,
    lastNameOld: String,
    birthDateOld: String,
    cityOld: String,
    countryOld: String,
    professionOld: String,
    companyNameOld: String,

    // Basic info
    userId: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateProfileLogs', UpdateProfileLogsSchema);