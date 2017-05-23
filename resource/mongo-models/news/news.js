const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({

    userId: String,
    newsTitle: {
        type: String,
        index: {unique: true}
    },
    newsCoverLink: {
        type: String,
    },
    newsDescription: {
        type: String,
    },
    picturesArray: [
        {
            newsPictureLink: {
                type: String,
            }
        }
    ],
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('News', NewsSchema);