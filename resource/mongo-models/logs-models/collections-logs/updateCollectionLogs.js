const mongoose = require('mongoose');

const UpdateCollectionLogsSchema = new mongoose.Schema({
    // Schema for updating a collection logs

    // New state
    userId: String,
    userName: String,
    collectionName: String,
    collectionDescriptionRaw: String,
    profilePictureLink: String,
    qrLink: String,
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
            }
        }
    ],

    // Old state
    userIdOld: String,
    profilePictureLinkOld: String,
    userNameOld: String,
    qrLinkOld: String,
    collectionNameOld: String,
    collectionDescriptionRawOld: String,
    picturesArrayOld: [
        {
            pictureName: {
                type: String,
            },
            pictureLink: {
                type: String,
            },
            pictureDescriptionRaw: {
                type: String,
            }
        }
    ],

    // Basic info
    collectionId: String,
    updatedByAdmin: {
        type: Boolean,
        default: false
    },
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateCollectionLogs', UpdateCollectionLogsSchema);