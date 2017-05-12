const User = require('mongoose').model('User');
const SignupLogs = require('mongoose').model('SignupLogs');
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy(
    {usernameField: 'email', passwordField: 'password', session: false, passReqToCallback: true}, (req, email, password, done) => {

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

    const logData = {
        email: email.trim(),
        userName: req.body.name.trim()
    };

    //Log the signup
    const newLog = new SignupLogs(logData);
        newLog.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: "Error while logging"
                })
            }
        });

    //Insert the new user into the MongoDB
    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) {
            //errors will have specific names
            //reference on MongoDB's website
            return done(err);
        }
        return done(null);
    });

});
