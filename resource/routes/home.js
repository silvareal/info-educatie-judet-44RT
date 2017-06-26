const express = require('express');
const User = require('mongoose').model('User');
const News = require('mongoose').model('News');
const Collection = require('mongoose').model('Collection');
const Contact = require('mongoose').model('Contact');
const config = require('../../config');

const jwt = require('jsonwebtoken');

const router = new express.Router();

//Retrieves data for the profile page link
//Links use user's name as a parameter
//Same implementation as authentication-check, but it returns userName instead of next()
//No need to handle errors as they would be handled by the previous middleware

function validateContactForm(payload) {
    let isFormValid = true;
    const errors = {};

    if (!payload || typeof payload.feedback !== 'string' || payload.feedback.trim().length === 0) {
        isFormValid = false;
        errors.feedback = "Feedback cannot be empty"
    }

    if (!payload || typeof payload.feedback !== 'string' || payload.feedback.trim().length > 50000) {
        isFormValid = false;
        errors.feedback = "Feedback cannot be longer than 5000 characters"
    }

    return {
        success: isFormValid,
        errors
    }
}

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
                    profilePictureLink: user.profilePictureLink,
                    admin: user.admin
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

        if (news.length === 0) {
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

        if (collections.length === 0) {
            return res.status(404).json({
                message: "No collections found"
            })
        }

        return res.json({
            collections: collections
        });
    }).sort({time: -1}).limit(4);
});

router.post('/contact', (req, res) => {

    const validationResult = validateContactForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            errors: validationResult.errors
        })
    }

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
                const userName = decoded.userName;

                const contactData = {
                    userId: userId,
                    userName: userName,
                    feedback: req.body.feedback
                };

                const newContact = new Contact(contactData);
                newContact.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            success: false
                        })
                    }

                    return res.json({
                        success: true
                    })
                });
            }
        )
    }
});

module.exports = router;