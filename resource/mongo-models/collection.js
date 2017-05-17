const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({

    //pictureDescription is never used except for keeping track of data (in state) in the UI

    userId: String,
    collectionName: {
        type: String,
        index: {unique: true}
    },
    collectionDescription: {
        type: Object,
    },
    collectionDescriptionRender: {
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
            pictureDescription: {
                type: Object,
            },
            pictureDescriptionRender: {
                type: String,
            },
            pictureDescriptionRaw: {
                type: String,
            },
        }
    ],
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);