const User = require('mongoose').model('User');

const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.split(' ')[1].toString() !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).end();
            }

            if (!decoded) {
                return res.status(401).end();
            }

            const userId = decoded.sub;
            const isAdmin = decoded.isAdmin;

            return User.findOne({_id: userId, admin: isAdmin}, (err, user) => {

                if (err || !user) {
                    return res.status(401).end();
                }

                return next();
            });
        });
    }
    else return res.status(401).end();
};