const mongoose = require('mongoose');

const CreateNewsLogsSchema = new mongoose.Schema({
    // Schema for creating a news article logs
    newsTitle: String,
    time: {type: Date, default: Date.now},
});

module.exports = mongoose.model('CreateNewsLogs', CreateNewsLogsSchema);