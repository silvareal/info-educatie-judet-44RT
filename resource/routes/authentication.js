const express = require('express');
const validator = require('validator');
const passport = require('passport');
const User = require('mongoose').model('User');
const LoginLogs = require('mongoose').model('LoginLogs');
const SignupLogs = require('mongoose').model('SignupLogs');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const router = new express.Router();

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = 'Please provide your email address';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = 'Please provide your password';
    }

    if (!isFormValid) {
        message = 'Check the form for errors';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateSignupForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = 'Please provide a valid email address';
    }

    if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = 'Password must have at least 8 characters';
    }

    if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = 'Please provide a valid username';
    }

    if (!isFormValid) {
        message = 'Check the specified fields for errors';
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.post('/login', (req, res, next) => {
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('login', (err, token) => {
        if (err) {
            if (err.name === 'CredentialsError') {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form'
            });
        }

        return jwt.verify(token, config.jwtSecret, (err, decoded) => {

            const userId = decoded.sub;

            const logData = {
                userId: userId
            };

            const newLog = new LoginLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }
                return res.json({
                    success: true,
                    token,
                });
            });
        });
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        });
    }

    return passport.authenticate('signup', (err) => {
        if (err) {

            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'Username or email already taken',
                    errors: {
                        email: 'Email address already registered',
                        name: 'Username already registered'
                    }
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Could not process the form'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'You have successfully signed up!'
        });
    })(req, res, next);
});

module.exports = router;