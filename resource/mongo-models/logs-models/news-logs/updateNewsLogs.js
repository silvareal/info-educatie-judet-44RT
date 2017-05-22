const mongoose = require('mongoose');

const UpdateNewsLogsSchema = new mongoose.Schema({

    //newState
    newsTitle: String,
    newsCoverLink: String,
    newsDescription: String,
    picturesArray: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],
    //oldState
    newsTitleOld: String,
    newsCoverLinkOld: String,
    newsDescriptionOld: String,
    picturesArrayOld: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],
    newsId: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateNewsLogs', UpdateNewsLogsSchema);