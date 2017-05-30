const mongoose = require('mongoose');

const DeleteNewsLogsSchema = new mongoose.Schema({
    // Schema for deleting an news article logs
    newsId: String,
    userName: String,
    newsTitle: String,
    newsCoverLink: String,
    newsDescriptionRaw: String,
    profilePictureLink: String,
    picturesArray: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('DeleteNewsLogs', DeleteNewsLogsSchema);