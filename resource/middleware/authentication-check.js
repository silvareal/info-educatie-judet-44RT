const User = require('mongoose').model('User');

const jwt = require('jsonwebtoken');
const config = require('../../config');

//Middleware we use to check the identity of the user throughout all of his actions
//One mistake that can be done while developing is passing user's _id by request parameters alongside the token
//For that we use the authorization bearer header and only use the data within the request header
//The authentication can be thought of as not safe and it might seem that you require to always pass the current state of user's _id from the application
//However, since nobody but you knows the jwtSecret, nobody can manipulate the token to impersonate another user

//The adventures of jwt authentication learning ! yay... It's fun rewriting the crud twice, it will be fun the third time. Third time's a charm!
module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

        //findById can be used but for code consistency, we use findOne to match other files's template
        return User.findOne({_id: userId}, (err, user) => {

            if (err || !user) {
                return res.status(401).end();
            }

            return next();
        });
    });
};
