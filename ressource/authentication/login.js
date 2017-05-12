const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = new PassportLocalStrategy(
    {usernameField: 'email', passwordField: 'password', session: false, passReqToCallback: true}, (req, email, password, done) => {

    const userData = {
        email: email.trim(),
        password: password.trim()
    };

    // find a user by email address
    return User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            const error = new Error('Incorrect credentials');
            error.name = 'CredentialsError';

            return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database
        return user.comparePasswordLogin(userData.password, (passwordErr, isMatch) => {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                const error = new Error('Incorrect credentials');
                error.name = 'CredentialsError';

                return done(error);
            }

            const payload = {
                sub: user._id
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);

            return done(null, token);
        });
    });
});
