const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = new PassportLocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, (req, email, password, done) => {

        // payload from the request
        const userData = {
            email: email.trim(),
            password: password.trim()
        };

        // find a user by email address
        return User.findOne({email: userData.email}, (err, user) => {
            // error
            if (err) {
                return done(err);
            }

            // user not found
            if (!user) {
                const error = new Error('Incorrect credentials');
                error.name = 'CredentialsError';

                return done(error);
            }

            // user is banned
            if (user.banned === true) {
                const error = new Error('User is banned');
                error.name = 'UserBanned';

                return done(error);
            }

            // check if a hashed user's password is equal to a value saved in the database
            return user.comparePasswordLogin(userData.password, (passwordErr, isMatch) => {
                // error
                if (err) {
                    return done(err);
                }

                // the two passwords don't match
                if (!isMatch) {
                    const error = new Error('Incorrect credentials');
                    error.name = 'CredentialsError';

                    return done(error);
                }

                // data saved in the jwt
                const payload = {
                    sub: user._id,
                    isAdmin: user.admin,
                    profilePictureLink: user.profilePictureLink,
                    userName: user.name
                };

                // create the token
                const token = jwt.sign(payload, config.jwtSecret);

                return done(null, token);
            });
        });
    });
