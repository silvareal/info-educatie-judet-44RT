const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    // Schema for sending out a feedback or a contact form
    userId: String,
    userName: String,
    feedback: String,
    time: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Contact', ContactSchema);