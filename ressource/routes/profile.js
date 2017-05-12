const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Collection = require('mongoose').model('Collection');
const UpdateProfileLogs = require('mongoose').model('UpdateProfileLogs');
const config = require('../../config');
const sanitize = require('mongo-sanitize');

const router = new express.Router();

cleanBody = (req, res, next) => {
    req.body = sanitize(req.body);
    next();
};

validateProfileForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user credentials
    //we do not check for the lack of credentials but for length and type

    //longest name in the world is 898 characters long
    if (typeof payload.firstName !== 'string' || payload.firstName.trim().length > 899) {
        isFormValid = false;
        errors.firstName = "Please use a valid first/given name"
    }

    if (typeof payload.lastName !== 'string' || payload.lastName.trim().length > 899) {
        isFormValid = false;
        errors.lastName = "Please use a valid last/family name"
    }

    if (typeof payload.birthDate !== 'string' || payload.birthDate.trim().length > 50) {
        isFormValid = false;
        errors.birthDate = "Please use a valid birth date"
    }

    if (typeof payload.city !== 'string' || payload.city.trim().length > 100) {
        isFormValid = false;
        errors.city = "Please use a valid city name"
    }

    if (typeof payload.country !== 'string' || payload.country.trim().length > 100) {
        isFormValid = false;
        errors.country = "Please use a valid country name"
    }

    if (typeof payload.profession !== 'string' || payload.profession.trim().length > 100) {
        isFormValid = false;
        errors.country = "Please use a valid profession name"
    }

    if (typeof payload.companyName !== 'string' || payload.companyName.trim().length > 100) {
        isFormValid = false;
        errors.companyName = "Please provide a valid company name"
    }

    if (typeof payload.profilePictureLink !== 'string' || payload.profilePictureLink.trim().length > 10000) {
        isFormValid = false;
        errors.profilePictureLink = "Please use a valid profile picture link"
    }

    if (typeof payload.profileCover !== 'string' || payload.profileCover.trim().length > 10000) {
        isFormValid = false;
        errors.profileCover = "Please use a valid link for the cover picture"
    }

    if (!isFormValid) {
        message = "Check the specified fields for errors"
    }

    return {
        success: isFormValid,
        message,
        errors
    }
};

router.post('/profile', (req, res) => {
    User.findOne({name: req.body.userName}, (err, user) => {
        if (err) {
            return res.status(400).json({
                message: "Invalid action"
            });
        }

        if (!user) {
            return res.status(404).json({
                message: "User is not a member"
            });
        }

        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            if (err) {
                return res.status(401).end();
            }

            const userId = decoded.sub;

            if (userId == user._id) {

                Collection.find({userId: userId}, (err, collection) => {
                    const data = {
                        name: user.name,
                        userId: userId,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        birthDate: user.birthDate,
                        profession: user.profession,
                        companyName: user.companyName,
                        city: user.city,
                        country: user.country,
                        profilePictureLink: user.profilePictureLink,
                        profileCover: user.profileCover,
                        ownUser: true,
                        latestCollection: collection
                    };

                    return res.json({
                        message: 'Successfully fetched profile',
                        user: data
                    });

                }).sort({creationDate: -1}).limit(1);
            }
        })
    });
});

router.post('/profile-edit', (req, res) => {
    const validationResult = validateProfileForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

        User.updateOne({_id: {$eq: userId}}, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                city: req.body.city,
                country: req.body.country,
                profession: req.body.profession,
                companyName: req.body.companyName,
                profilePictureLink: req.body.profilePictureLink,
                profileCover: req.body.profileCover
            }
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            const logData = {
                userId: userId,
                profilePictureLink: req.body.profilePictureLink,
                profileCover: req.body.profileCover,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                city: req.body.city,
                country: req.body.country,
                profession: req.body.profession,
                companyName: req.body.companyName,
                profilePictureLinkOld: req.body.profilePictureLinkOld,
                profileCoverOld: req.body.profileCoverOld,
                firstNameOld: req.body.firstNameOld,
                lastNameOld: req.body.lastNameOld,
                birthDateOld: req.body.birthDateOld,
                cityOld: req.body.cityOld,
                countryOld: req.body.countryOld,
                professionOld: req.body.professionOld,
                companyNameOld: req.body.companyNameOld
            };

            const newLog = new UpdateProfileLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }
            });

            return res.json({
                message: 'Successfully updated profile',
                successStatus: true
            });
        });
    });
});

module.exports = router;