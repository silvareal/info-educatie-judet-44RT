const mongoose = require('mongoose');

const UpdateNewsLogsSchema = new mongoose.Schema({
    // Schema for updating a news article logs

    // New state
    newsTitle: String,
    newsCoverLink: String,
    newsDescriptionRaw: String,
    picturesArray: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],
    // Old state
    newsTitleOld: String,
    newsCoverLinkOld: String,
    newsDescriptionRawOld: String,
    userName: String,
    profilePictureLink: String,
    picturesArrayOld: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],

    // Basic info
    newsId: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateNewsLogs', UpdateNewsLogsSchema);