const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const CommentCollection = require('mongoose').model("CommentCollection");
const CommentNews = require('mongoose').model("CommentNews");
const User = require('mongoose').model('User');

const router = new express.Router();

function validateCommentForm(payload) {
    let isFormValid = true;
    let message = '';

    if (!payload.newsId && !payload.collectionId) {
        isFormValid = false;
        message = "No id received"
    }

    //limit the comment length to 1000 characters
    if (!payload.comment || typeof payload.comment !== 'string' || payload.comment.trim().length > 1000) {
        isFormValid = false;
        message = "Missing comment";
    }

    return {
        success: isFormValid,
        message
    };
}

router.post("/retrieveNewsComments", (req, res) => {
    CommentNews.find({newsId: req.body.newsId}, (err, comments) => {

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

    }).sort({time: -1}).limit(10);
});

router.post("/loadMoreCommentsNews", (req, res) => {
    CommentNews.find({newsId: req.body.newsId}, (err, comments) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(comments.length) === 0) {
            return res.json({
                message: "NoComments"
            })
        }

        return res.json({
            comments: comments
        })
    }).sort({time: -1}).limit(10).skip(parseInt(req.body.loadAfter));
});

router.post("/commentsCountNews", (req, res) => {
    CommentNews.find({newsId: req.body.newsId}, (err, comments) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(comments.length) === 0) {
            return res.json({
                message: "NoComments"
            })
        }

        return res.json({
            commentsCount: comments.length
        })
    });
});

router.post("/postCommentNews", (req, res) => {

    const validationResult = validateCommentForm(req.body);

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

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

        if (validationResult.success) {
            const commentData = {
                newsId: req.body.newsId,
                userId: userId,
                userName: req.body.userName,
                firstName: req.body.firstName,
                comment: req.body.comment,
                profilePictureLink: req.body.profilePictureLink
            };

            const newComment = new CommentNews(commentData);
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

router.get("/getUserCredentials", (req, res) => {

    if (req.headers.authorization.split(' ')[1].toString() !== "null") {

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
                    firstName: user.firstName,
                    userId: userId,
                    profilePictureLink: user.profilePictureLink
                });

            });

        });
    }
    else return res.json({guest: true})
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

    }).sort({time: -1}).limit(10);
});

router.post("/loadMoreCommentsCollections", (req, res) => {
    CommentCollection.find({collectionId: req.body.collectionId}, (err, comments) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(comments.length) === 0) {
            return res.json({
                message: "NoComments"
            })
        }

        return res.json({
            comments: comments
        })
    }).sort({time: -1}).limit(10).skip(parseInt(req.body.loadAfter));
});

router.post("/commentsCount", (req, res) => {
    CommentCollection.find({collectionId: req.body.collectionId}, (err, comments) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(comments.length) === 0) {
            return res.json({
                message: "NoComments"
            })
        }

        return res.json({
            commentsCount: comments.length
        })
    });
});

router.post("/postCommentCollections", (req, res) => {

    const validationResult = validateCommentForm(req.body);

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

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

        if (validationResult.success) {
            const commentData = {
                collectionId: req.body.collectionId,
                userId: userId,
                userName: req.body.userName,
                firstName: req.body.firstName,
                comment: req.body.comment,
                profilePictureLink: req.body.profilePictureLink
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