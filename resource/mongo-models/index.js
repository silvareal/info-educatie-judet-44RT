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
    require('./user');
    require('./collection');
    require('./news');
    require('./loginLogs');
    require('./signupLogs');
    require('./createCollectionLogs');
    require('./updateCollectionLogs');
    require('./deleteCollectionLogs');
    require('./createNewsLogs');
    require('./updateNewsLogs');
    require('./deleteNewsLogs');
    require('./updateProfileLogs');
    require('./commentCollection');
    require('./commentNews');
};
