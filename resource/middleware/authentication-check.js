const User = require('mongoose').model('User');

const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {

    // bearer {token} , not bearer null
    if (req.headers.authorization.split(' ')[1].toString() !== "null") {

        // {token}
        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            // error
            if (err) {
                return res.status(401).end();
            }

            // jwt that was decoded is not valid
            if (!decoded) {
                return res.status(401).end();
            }

            // save usedId from token
            const userId = decoded.sub;

            // query using the userId
            return User.findOne({_id: userId}, (err, user) => {

                // error or user is non-existent
                if (err || !user) {
                    return res.status(401).end();
                }
                return next();
            });
        });
    }
    else return next();
};
