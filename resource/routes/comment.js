const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const sanitize = require('mongo-sanitize');
const CommentCollection = require('mongoose').model("CommentCollection");
const User = require('mongoose').model('User');

const router = new express.Router();

cleanBody = (req, res, next) => {
    req.body = sanitize(req.body);
    next();
};

validateCommentForm = (payload) => {
    let isFormValid = true;
    let message = '';

    //limit the comment length to 1000 characters
    if (!payload.comment || typeof payload.comment !== 'string' || payload.comment.trim().length > 1000) {
        isFormValid = false;
        message = "Missing comment";
    }

    return {
        success: isFormValid,
        message
    };

};

router.get("/getUserCredentials", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        const userId = decoded.sub;

        User.findOne({_id: userId}, (err, user) => {

            if (err) {
                res.status(400).json({
                    message: "Database error"
                });
            }

            if (!user) {
                res.status(404).json({
                    message: "User not found"
                })
            }

            res.json({
                userName: user.name,
                firstName: user.firstName
            });

        });

    });
});

router.post("/retrieveCollectionsComments", (req, res) => {
    CommentCollection.find({collectionId: req.body.collectionId}, (err, comments) => {

        if (err) {
            res.status(400).json({
                message: "Database error"
            });
        }

        if (!comments) {
            //send status 200 and display in the comment section a message stating that there are no comments added yet
            res.json({
                message: "No comments found"
            });
        }

        res.json({
            message: "Retrieved comments",
            comments: comments
        });

    }).sort({time: -1});
});

router.post("/postCommentCollections", (req, res) => {

    const validationResult = validateCommentForm(req.body);

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        const userId = decoded.sub;

        if (validationResult.success) {
            const commentData = {
                collectionId: req.body.collectionId,
                userId: userId,
                userName: req.body.userName,
                firstName: req.body.firstName,
                comment: req.body.comment
            };

            const newComment = new CommentCollection(commentData);
            newComment.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while commenting"
                    })
                }
            });
            res.json({
                commentAdded: true
            });
        }
        //form isn't valid
        else {
            res.json({
                commentAdded: false
            })
        }

    });
});

module.exports = router;