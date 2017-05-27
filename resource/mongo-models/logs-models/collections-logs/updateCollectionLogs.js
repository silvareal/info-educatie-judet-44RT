const mongoose = require('mongoose');

const UpdateCollectionLogsSchema = new mongoose.Schema({

    //newState
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
    //oldState
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
    collectionId: String,
    updatedByAdmin: {
        type: Boolean,
        default: false
    },
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateCollectionLogs', UpdateCollectionLogsSchema);