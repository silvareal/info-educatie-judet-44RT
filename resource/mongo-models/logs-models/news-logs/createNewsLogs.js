const mongoose = require('mongoose');

const CreateNewsLogsSchema = new mongoose.Schema({

    //newsTitle is a unique key
    newsTitle: String,
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('CreateNewsLogs', CreateNewsLogsSchema);