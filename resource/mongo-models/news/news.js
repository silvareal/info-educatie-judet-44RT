const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    // Schema for creating a news article
    // newsTitle must be unique
    userId: String,
    newsTitle: {
        type: String,
        index: {unique: true}
    },
    userName: String,
    profilePictureLink: String,
    newsCoverLink: {
        type: String,
    },
    newsDescriptionRaw: {
        type: String,
    },
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);