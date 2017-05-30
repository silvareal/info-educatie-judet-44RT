const mongoose = require('mongoose');

const LoginLogsSchema = new mongoose.Schema({
    // Schema for the login logs
    userId: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('LoginLogs', LoginLogsSchema);