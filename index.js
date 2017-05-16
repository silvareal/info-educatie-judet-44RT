const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

const socket = require('./resource/routes/socket.js');

//models for mongodb
require('./resource/mongo-models').connect(config.dbUri);

//middleware
const registerPassport = require('./resource/authentication/signup');
const loginPassport = require('./resource/authentication/login');

const authenticationRoutes = require('./resource/routes/authentication');
const crudRoutes = require('./resource/routes/crud');
const profileRoutes = require('./resource/routes/profile');
const homeRoutes = require('./resource/routes/home');
const adminRoutes = require('./resource/routes/admin');
const commentRoutes = require('./resource/routes/comment');

const express = require('express');
//tell the app to actually use the middleware
app.use(express.static('./resource/index/'));
app.use(express.static('./src/build/'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());
passport.use('signup', registerPassport);
passport.use('login', loginPassport);
app.use('/authentication', authenticationRoutes);

//Avoid writing useless code - more info in the path of this require ( in the file )
const authenticationChecker = require('./resource/middleware/authentication-check');
app.use('/home', authenticationChecker);
app.use('/crud', authenticationChecker);

app.use('/crud', crudRoutes);
app.use('/profile', profileRoutes);
app.use('/home', homeRoutes);
app.use('/admin', adminRoutes);

app.use('/comment', commentRoutes);

io.sockets.on('connection', socket);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/resource' + '/index' + '/index.html');
});

server.listen(3000, function () {
    console.log('Server is running');
});