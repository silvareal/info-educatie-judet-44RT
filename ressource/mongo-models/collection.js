const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({

    userId: String,
    collectionName: {
        type: String,
        index: {unique: true}
    },
    collectionDescription: {
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
                type: String,
            }
        }
    ],
    creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);