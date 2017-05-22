const mongoose = require('mongoose');

module.exports.connect = (uri) => {

    mongoose.connect(uri);
    // plug in the promise library:
    // due to synchronous actions, mongoose won't work without a promise
    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Error on mongoose connection: ${err}`);
        process.exit(1);
    });

    // load models
    require('./authentication/user');
    require('./collections/collection');
    require('./news/news');
    require('./logs-models/authentication-logs/loginLogs');
    require('./logs-models/authentication-logs/signupLogs');
    require('./logs-models/collections-logs/createCollectionLogs');
    require('./logs-models/collections-logs/updateCollectionLogs');
    require('./logs-models/collections-logs/deleteCollectionLogs');
    require('./logs-models/news-logs/createNewsLogs');
    require('./logs-models/news-logs/updateNewsLogs');
    require('./logs-models/news-logs/deleteNewsLogs');
    require('./logs-models/profile-logs/updateProfileLogs');
    require('./collections/commentCollection');
    require('./news/commentNews');
};
