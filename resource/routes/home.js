const express = require('express');
const User = require('mongoose').model('User');
const config = require('../../config');

const jwt = require('jsonwebtoken');

const router = new express.Router();

//Retrieves data for the profile page link
//Links use user's name as a parameter
//Same implementation as authentication-check, but it returns userName instead of next()
//No need to handle errors as they would be handled by the previous middleware

router.get('/credentials', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        const userId = decoded.sub;

        User.findOne({_id: userId}, (err, user) => {
            return res.json({
                userName: user.name,
                userId: userId
            })
        });
    });
});

module.exports = router;