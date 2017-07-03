const User = require('mongoose').model('User');
const SignupLogs = require('mongoose').model('SignupLogs');
const PassportLocalStrategy = require('passport-local').Strategy;

// Redis
const redis = require('redis');
const client = redis.createClient();

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {

        // payload from request and our own, empty, fields
        const userData = {
            email: email.trim(),
            password: password.trim(),
            name: req.body.name.trim(),
            firstName: '',
            lastName: '',
            birthDate: '',
            profession: '',
            companyName: '',
            city: '',
            country: '',
            registerDate: Date.now(),
            profilePictureLink: '',
            profileCover: '',
            admin: false,
            moderator: false
        };

        // data saved in the signup logs
        const logData = {
            email: email.trim(),
            userName: req.body.name.trim()
        };

        client.del("logsSignup");
        client.del("users");

        // save the data in the database
        const newLog = new SignupLogs(logData);
        newLog.save(() => {
            // error
            SignupLogs.find({}, (err, logs) => {
                if (logs) {
                    client.set("logsSignup", JSON.stringify(logs))
                }
            }).sort({time: -1});
        });

        //Insert the new user into the MongoDB
        const newUser = new User(userData);
        newUser.save((err) => {

            // error
            if (err) {
                return done(err);
            }
            return done(null);
        });
    });
