const express = require('express');
const User = require('mongoose').model('User');
const News = require('mongoose').model('News');
const Collection = require('mongoose').model('Collection');
const config = require('../../config');

const jwt = require('jsonwebtoken');

const router = new express.Router();

//Retrieves data for the profile page link
//Links use user's name as a parameter
//Same implementation as authentication-check, but it returns userName instead of next()
//No need to handle errors as they would be handled by the previous middleware

router.get('/credentials', (req, res) => {

    if (req.headers.authorization.split(' ')[1] !== "null") {

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    message: "Not authorized"
                })
            }

            if (!decoded) {
                return res.status(400).json({
                    message: "Internal error"
                })
            }

            const userId = decoded.sub;

            User.findOne({_id: userId}, (err, user) => {
                return res.json({
                    guest: false,
                    userName: user.name,
                    userId: userId,
                    firstName: user.firstName,
                    profilePictureLink: user.profilePictureLink
                })
            });
        });
    }
    else {
        return res.json({
            guest: true
        })
    }
});

router.get('/news', (req, res) => {
    News.find({}, (err, news) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            });
        }

        if (news.length == 0) {
            return res.status(404).json({
                message: "No news added so far"
            })
        }

        return res.json({
            news: news
        });
    }).sort({creationDate: -1}).limit(4);
});

router.get('/collections', (req, res) => {
    Collection.find({}, (err, collections) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            });
        }

        if (collections.length == 0) {
            return res.status(404).json({
                message: "No collections found"
            })
        }

        return res.json({
            collections: collections
        });
    }).sort({time: -1}).limit(4);
});

module.exports = router;