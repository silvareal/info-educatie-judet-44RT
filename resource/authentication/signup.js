const User = require('mongoose').model('User');
const SignupLogs = require('mongoose').model('SignupLogs');
const PassportLocalStrategy = require('passport-local').Strategy;

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

        // save the data in the database
        const newLog = new SignupLogs(logData);
        newLog.save((err) => {
            // error
            if (err) {
                return res.status(400).json({
                    message: "Error while logging"
                })
            }
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
