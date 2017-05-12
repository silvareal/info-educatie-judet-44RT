const mongoose = require('mongoose');

const SignupLogsSchema = new mongoose.Schema({

    email: String,
    userName: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('SignupLogs', SignupLogsSchema);