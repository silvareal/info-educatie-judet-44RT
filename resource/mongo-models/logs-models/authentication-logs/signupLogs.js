const mongoose = require('mongoose');

const SignupLogsSchema = new mongoose.Schema({
    // Schema for the signup logs
    email: String,
    userName: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('SignupLogs', SignupLogsSchema);