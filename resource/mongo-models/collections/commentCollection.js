const mongoose = require('mongoose');

const CommentCollectionSchema = new mongoose.Schema({
    // Schema for commenting on collections
    collectionId: String,
    userId: String,
    userName: String,
    profilePictureLink: String,
    firstName: {
        type: String,
        default: ""
    },
    comment: String,
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommentCollection', CommentCollectionSchema);