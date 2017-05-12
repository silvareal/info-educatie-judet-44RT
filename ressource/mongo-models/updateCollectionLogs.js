const mongoose = require('mongoose');

const UpdateCollectionLogsSchema = new mongoose.Schema({

    //newState
    userId: String,
    collectionName: String,
    collectionDescription: String,
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
    //oldState
    userIdOld: String,
    collectionNameOld: String,
    collectionDescriptionOld: String,
    picturesArrayOld: [
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
    collectionId: String,
    updatedByAdmin: {
        type: Boolean,
        default: false
    },
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('UpdateCollectionLogs', UpdateCollectionLogsSchema);