const mongoose = require('mongoose');

const CommentNewsSchema = new mongoose.Schema({

    newsId: String,
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

module.exports = mongoose.model('CommentNews', CommentNewsSchema);