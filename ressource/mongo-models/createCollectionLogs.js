const mongoose = require('mongoose');

const CreateCollectionLogsSchema = new mongoose.Schema({

    //collectionName is a unique key
    userId: String,
    collectionName: String,
    createdByAdmin: {
        type: Boolean,
        default: false
    },
    time: {type: Date, default: Date.now},

});

module.exports = mongoose.model('CreateCollectionLogs', CreateCollectionLogsSchema);