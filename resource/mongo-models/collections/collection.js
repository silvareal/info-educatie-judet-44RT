const mongoose = require('mongoose');

const CollectionSchema = new mongoose.Schema({
    // Schema for all collections
    // pictureDescription from the req.body is not to be saved
    // collectionName must be unique
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
    tags: {type: Array, default: []},
    likes: {type: Number, default: 0},
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Collection', CollectionSchema);