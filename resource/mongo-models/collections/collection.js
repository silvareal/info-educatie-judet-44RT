const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({

    //pictureDescription is never used except for keeping track of data (in state) in the UI
    //so we don't save it and fill our db with megabytes of futile data

    userId: String,
    userName: String,
    collectionName: {
        type: String,
        index: {unique: true}
    },
    qrLink: String,
    profilePictureLink: String,
    collectionDescriptionRaw: {
        type: String,
    },
    picturesArray: [
        {
            pictureName: {
                type: String,
            },
            pictureLink: {
                type: String,
            },
            pictureDescriptionRaw: {
                type: String,
            },
        }
    ],
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);