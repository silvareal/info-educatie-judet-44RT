const mongoose = require('mongoose');

const DeleteNewsLogsSchema = new mongoose.Schema({

    newsId: String,
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
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('DeleteNewsLogs', DeleteNewsLogsSchema);