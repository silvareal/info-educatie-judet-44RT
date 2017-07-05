const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const CommentCollection = require('mongoose').model("CommentCollection");
const CommentNews = require('mongoose').model("CommentNews");
const User = require('mongoose').model('User');
const Collection = require('mongoose').model('Collection');

const router = new express.Router();

// Redis
const redis = require('redis');
const client = redis.createClient();

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

router.get("/getLikes", (req, res) => {

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

        User.findOne({_id: userId}, (err, user) => {

            if (err) {
                res.status(400).json({
                    message: "Database error"
                });
            }

            if (!user) {
                res.status(404).json({
                    message: "Not a valid user"
                })
            }

            res.json({
                liked: user.liked
            })

        });
    })
});

router.post("/like", (req, res) => {

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

        User.findOne({_id: userId}, (err, user) => {

            if (err) {
                res.status(400).json({
                    message: "Database error",
                    successLike: true
                });
            }

            if (!user) {
                res.status(404).json({
                    message: "Not a valid user",
                    successLike: true
                })
            }

            // likedId = id of collection or news article liked by the person
            let newLiked = user.liked.concat(req.body.likedId);

            User.updateOne({_id: user._id}, {
                $set: {
                    liked: newLiked
                }
            }, (err, user) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error",
                        successLike: false
                    });
                }

                if (!user) {
                    res.status(404).json({
                        message: "Not a valid user",
                        successLike: false
                    })
                }

                Collection.findOne({_id: req.body.likedId}, (err, collection) => {

                    if (err) {
                        return res.status(400).json({
                            message: "Database error in /crud/updateSave while updating entry",
                            successLike: true
                        });
                    }

                    if (!collection) {
                        return res.status(404).json({
                            message: "Collection does not exist",
                            successLike: true
                        })
                    }

                    Collection.updateOne({_id: req.body.likedId}, {
                        $set: {
                            likes: collection.likes + 1
                        }
                    }, (err, collection) => {

                        if (err) {
                            return res.status(400).json({
                                message: "Database error in /crud/updateSave while updating entry",
                                successLike: false
                            });
                        }

                        if (!collection) {
                            return res.status(404).json({
                                message: "Collection does not exist",
                                successLike: false
                            })
                        }

                        client.del("collectionsAdmin");
                        client.del("logsCollectionsCreate");
                        client.del("Collections of:" + userId);
                        client.del("collectionsBrowse");
                        client.del("collectionsSearch");
                        client.del("collectionsHome");

                        res.json({
                            successLike: true
                        });
                    });
                });
            });
        });
    });
});

router.post("/unlike", (req, res) => {
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

        User.findOne({_id: userId}, (err, user) => {

            if (err) {
                res.status(400).json({
                    message: "Database error",
                    successLike: true
                });
            }

            if (!user) {
                res.status(404).json({
                    message: "Not a valid user",
                    successLike: true
                })
            }

            // likedId = id of the collection or news that is getting unliked
            let newLiked = user.liked.filter((liked) => {
                return liked !== req.body.likedId;
            });

            User.updateOne({_id: {$eq: userId}}, {
                $set: {
                    liked: newLiked
                }
            }, (err, user) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error",
                        successLike: false
                    });
                }

                if (!user) {
                    res.status(404).json({
                        message: "Not a valid user",
                        successLike: false
                    })
                }

                Collection.findOne({_id: req.body.likedId}, (err, collection) => {

                    if (err) {
                        return res.status(400).json({
                            message: "Database error in /crud/updateSave while updating entry",
                            successLike: true
                        });
                    }

                    if (!collection) {
                        return res.status(404).json({
                            message: "Collection does not exist",
                            successLike: true
                        })
                    }

                    Collection.updateOne({_id: req.body.likedId}, {
                        $set: {
                            likes: collection.likes - 1
                        }
                    }, (err, collection) => {

                        if (err) {
                            return res.status(400).json({
                                message: "Database error in /crud/updateSave while updating entry",
                                successLike: false
                            });
                        }

                        if (!collection) {
                            return res.status(404).json({
                                message: "Collection does not exist",
                                successLike: false
                            })
                        }

                        client.del("collectionsAdmin");
                        client.del("logsCollectionsCreate");
                        client.del("Collections of:" + userId);
                        client.del("collectionsBrowse");
                        client.del("collectionsSearch");
                        client.del("collectionsHome");

                        res.json({
                            successLike: true
                        });
                    });
                });
            })

        });
    });
});

router.post("/deleteCommentCollections", (req, res) => {

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

        const isAdmin = decoded.isAdmin;
        const isModerator = decoded.isModerator;

        if (isAdmin === true || isModerator === true) {

            CommentCollection.findOne({_id: req.body.commentId}, (err, comment) => {

                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }

                if (!comment) {
                    return res.status(404).json({
                        message: "The comment doesn't exist"
                    })
                }

                CommentCollection.deleteOne({_id: req.body.commentId}, (err) => {

                    if (err) {
                        return res.status(400).json({
                            message: "Database error"
                        })
                    }

                    client.del("Comments of:" + comment.collectionId);

                    return res.json({
                        message: "Comment deleted"
                    });
                });
            });
        }
        else return res.status(401).json({
            message: "Not authorized"
        })
    });
});

router.post("/deleteCommentNews", (req, res) => {

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

        const isAdmin = decoded.isAdmin;
        const isModerator = decoded.isModerator;

        if (isAdmin === true || isModerator === true) {
            CommentNews.findOne({_id: req.body.commentId}, (err, comment) => {

                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }

                if (!comment) {
                    return res.status(404).json({
                        message: "The comment doesn't exist"
                    })
                }

                CommentNews.deleteOne({_id: req.body.commentId}, (err) => {

                    if (err) {
                        return res.status(400).json({
                            message: "Database error"
                        })
                    }

                    client.del("Comments of:" + comment.newsId);

                    return res.json({
                        message: "Comment deleted"
                    });

                });
            })
        }
        else return res.status(401).json({
            message: "Not authorized"
        })
    })
});

function retrieveNewsCommentsRedis(req, res, next) {
    client.get("Comments of:" + req.body.newsId, (err, comments) => {
        if (comments) {
            return res.json({
                message: "Retrieved comments",
                comments: JSON.parse(comments),
                fromCache: true
            })
        }
        else return next();
    });
}

function retrieveNewsComments(req, res) {
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

        client.set("Comments of:" + req.body.newsId, JSON.stringify(comments));

        res.json({
            message: "Retrieved comments",
            comments: comments,
            fromCache: false
        });

    }).sort({time: -1}).limit(10);
}

router.post("/retrieveNewsComments", retrieveNewsCommentsRedis, retrieveNewsComments);

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
        const userName = decoded.userName;
        const profilePictureLink = decoded.profilePictureLink;
        const firstName = decoded.firstName;

        if (validationResult.success) {
            const commentData = {
                newsId: req.body.newsId,
                userId: userId,
                userName: userName,
                firstName: firstName,
                comment: req.body.comment,
                profilePictureLink: profilePictureLink
            };

            const newComment = new CommentNews(commentData);
            newComment.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while commenting"
                    })
                }

                client.del("Comments of:" + req.body.newsId);
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

function retrieveCollectionsCommentsRedis(req, res, next) {
    client.get("Comments of:" + req.body.collectionId, (err, comments) => {
        if (comments) {
            return res.json({
                message: "Retrieved comments",
                comments: JSON.parse(comments),
                fromCache: true
            })
        }
        else return next();
    });
}

function retrieveCollectionsComments(req, res) {
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

        client.set("Comments of:" + req.body.collectionId, JSON.stringify(comments));

        res.json({
            message: "Retrieved comments",
            comments: comments,
            fromCache: false
        });

    }).sort({time: -1}).limit(10);
}

router.post("/retrieveCollectionsComments", retrieveCollectionsCommentsRedis, retrieveCollectionsComments);

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
        const userName = decoded.userName;
        const firstName = decoded.firstName;
        const profilePictureLink = decoded.profilePictureLink;

        if (validationResult.success) {
            const commentData = {
                collectionId: req.body.collectionId,
                userId: userId,
                userName: userName,
                firstName: firstName,
                comment: req.body.comment,
                profilePictureLink: profilePictureLink
            };

            const newComment = new CommentCollection(commentData);
            newComment.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while commenting"
                    })
                }

                client.del("Comments of:" + req.body.collectionId)
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