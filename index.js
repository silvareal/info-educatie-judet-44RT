const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

//models for mongodb
require('./ressource/mongo-models').connect(config.dbUri);

//middleware
const registerPassport = require('./ressource/authentication/signup');
const loginPassport = require('./ressource/authentication/login');

const authenticationRoutes = require('./ressource/routes/authentication');
const crudRoutes = require('./ressource/routes/crud');
const profileRoutes = require('./ressource/routes/profile');
const homeRoutes = require('./ressource/routes/home');
const adminRoutes = require('./ressource/routes/admin');

const express = require('express');
//tell the app to actually use the middleware
app.use(express.static('./ressource/index/'));
app.use(express.static('./src/build/'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
passport.use('signup', registerPassport);
passport.use('login', loginPassport);
app.use('/authentication', authenticationRoutes);

//Avoid writing useless code - more info in the path of this require ( in the file )
const authenticationChecker = require('./ressource/middleware/authentication-check');
app.use('/home', authenticationChecker);
app.use('/crud', authenticationChecker);

app.use('/crud', crudRoutes);
app.use('/profile', profileRoutes);
app.use('/home', homeRoutes);
app.use('/admin', adminRoutes);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/ressource' + '/index' + '/index.html');
});

app.listen(3000, function () {
    console.log('Server is running');
});