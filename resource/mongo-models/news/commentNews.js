const mongoose = require('mongoose');

const CommentNewsSchema = new mongoose.Schema({
    // Schema for commenting on news articles
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