const express = require('express');
const User = require('mongoose').model('User');
const Collection = require('mongoose').model('Collection');
const News = require('mongoose').model('News');
const CreateCollectionLogs = require('mongoose').model('CreateCollectionLogs');
const UpdateCollectionLogs = require('mongoose').model('UpdateCollectionLogs');
const DeleteCollectionLogs = require('mongoose').model('DeleteCollectionLogs');
const CreateNewsLogs = require('mongoose').model('CreateNewsLogs');
const UpdateNewsLogs = require('mongoose').model('UpdateNewsLogs');
const DeleteNewsLogs = require('mongoose').model('DeleteNewsLogs');
const LoginLogs = require('mongoose').model('LoginLogs');
const SignupLogs = require('mongoose').model('SignupLogs');
const UpdateProfileLogs = require('mongoose').model('UpdateProfileLogs');
const CommentCollection = require('mongoose').model("CommentCollection");
const CommentNews = require('mongoose').model("CommentNews");
const config = require('../../config');
const jwt = require('jsonwebtoken');

const router = new express.Router();

// Redis
const redis = require('redis');
const client = redis.createClient();

function validateSearchForm(payload) {
    let isFormValid = true;

    // validate search query
    if (!payload.searchQuery || typeof payload.searchQuery !== 'string' || payload.searchQuery.trim().length > 100) {
        isFormValid = false
    }

    return {
        success: isFormValid
    }
}

function validateCreateCollectionForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    // validate user's id
    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }
    // validate userName
    if (!payload.userNameToAdd || typeof payload.userNameToAdd !== 'string' || payload.userNameToAdd.trim().length === 0) {
        isFormValid = false;
        errors.userName = "Missing user name"
    }
    // validate the profile picture link - not required
    if (payload.profilePictureLink) {
        if (payload.profilePictureLink.trim().length > 10000) {
            isFormValid = false;
            errors.profilePictureLink = "Please use a shorter link for the profile picture"
        }
    }
    // validate collection's name
    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }
    // validate collection's description
    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        // validate every picture's name
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        // validate every picture's description
        if (!errorsPicturesArray[key].pictureDescriptionRaw || typeof errorsPicturesArray[key].pictureDescriptionRaw !== 'string' || errorsPicturesArray[key].pictureDescriptionRaw.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescriptionRaw = "Please use a valid description for this picture"
        }
        // validate every picture's link length
        if (!errorsPicturesArray[key].pictureLink || typeof errorsPicturesArray[key].pictureLink !== 'string') {
            isFormValid = false;
            errorsPicturesArray[key].pictureLink = "Please use a link for the picture"
        }
    });

    // message to send if there are any errors
    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors,
        errorsPicturesArray
    };
}

function validateUpdateCollectionsForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    // validate user's id
    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }
    // validate userName
    if (!payload.userNameToAdd || typeof payload.userNameToAdd !== 'string' || payload.userNameToAdd.trim().length === 0) {
        isFormValid = false;
        errors.userName = "Missing user name"
    }
    // validate the profile picture link - not required
    if (payload.profilePictureLink) {
        if (payload.profilePictureLink.trim().length > 10000) {
            isFormValid = false;
            errors.profilePictureLink = "Please use a shorter link for the profile picture"
        }
    }
    // validate collection's name
    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }
    // validate collection's description
    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        // validate every picture's name
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        // validate every picture's description
        if (!errorsPicturesArray[key].pictureDescriptionRaw || typeof errorsPicturesArray[key].pictureDescriptionRaw !== 'string' || errorsPicturesArray[key].pictureDescriptionRaw.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescriptionRaw = "Please use a valid description for this picture"
        }
        // validate every picture's link
        if (!errorsPicturesArray[key].pictureLink || typeof errorsPicturesArray[key].pictureLink !== 'string') {
            isFormValid = false;
            errorsPicturesArray[key].pictureLink = "Please use a link for the picture"
        }
    });

    // message to send if there are any errors
    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors,
        errorsPicturesArray
    };
}

function validateCreateNewsForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    // validate news article's title
    if (!payload.newsTitle || typeof payload.newsTitle !== 'string' || payload.newsTitle.trim().length > 100) {
        isFormValid = false;
        errors.newsTitle = "Please use a valid title"
    }
    // validate news article's cover photo link
    if (!payload.newsCoverLink || typeof payload.newsCoverLink !== 'string' || payload.newsCoverLink.trim().length > 10000) {
        isFormValid = false;
        errors.newsCoverLink = "Please use a shorter link"
    }
    // validate news article's description
    if (!payload.newsDescriptionRaw || typeof payload.newsDescriptionRaw !== 'string' || payload.newsDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescriptionRaw = "Please use a valid description"
    }

    // message to send if there are any errors
    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function validateUpdateNewsForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    // validate news article's title
    if (!payload.newsTitle || typeof payload.newsTitle !== 'string' || payload.newsTitle.trim().length > 100) {
        isFormValid = false;
        errors.newsTitle = "Please use a valid title"
    }
    // validate news article's cover photo link
    if (!payload.newsCoverLink || typeof payload.newsCoverLink !== 'string' || payload.newsCoverLink.trim().length > 10000) {
        isFormValid = false;
        errors.newsCoverLink = "Please use a shorter link"
    }
    // validate news article's description
    if (!payload.newsDescriptionRaw || typeof payload.newsDescriptionRaw !== 'string' || payload.newsDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescriptionRaw = "Please use a shorter and valid description"
    }

    // message to send if there are any errors
    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

function showUsersRedis(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        // error
        if (err) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        // jwt that was decoded is not valid
        if (!decoded) {
            return res.status(400).json({
                message: "Internal error"
            })
        }

        // use the admin property from the jwt to check admin identity
        const isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("users", (err, users) => {
                if (users) {
                    return res.json({
                        users: JSON.parse(users),
                        fromCache: true
                    })
                }
                else return next();
            })
        }
        else return res.status(401).end();
    })
}

function showUsers(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        // error
        if (err) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        // jwt that was decoded is not valid
        if (!decoded) {
            return res.status(400).json({
                message: "Internal error"
            })
        }

        // use the admin property from the jwt to check admin identity
        const isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            User.find({admin: false}, (err, users) => {
                client.set("users", JSON.stringify(users));
                res.json({
                    users: users,
                    fromCache: false
                })
            });
        }
        else return res.status(401).end();
    });
}

router.get("/showUsers", showUsersRedis, showUsers);

router.post('/banUser', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

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

        //here to be used for logs
        const userId = decoded.sub;
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            User.findOne({_id: req.body.userIdToBan}, (err, user) => {

                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                User.updateOne({_id: req.body.userIdToBan}, {
                        $set: {
                            banned: !user.banned
                        }
                    }, (err, user) => {
                        if (err) {
                            return res.status(400).json({
                                message: "Database error"
                            });
                        }

                        if (!user) {
                            return res.status(404).json({
                                message: "User not found"
                            })
                        }

                        client.del("users");

                        res.json({
                            success: true
                        })
                    }
                )

            });
        }
        else return res.status(401).end();
    });
});

router.post('/makeModerators', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

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

        //here to be used for logs
        const userId = decoded.sub;
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            User.findOne({_id: req.body.userId}, (err, user) => {

                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }

                User.updateOne({_id: req.body.userId}, {
                    $set: {
                        moderator: !user.moderator
                    }
                }, (err, user) => {

                    if (err) {
                        return res.status(400).json({
                            message: "Database error"
                        });
                    }

                    if (!user) {
                        return res.status(404).json({
                            message: "User not found"
                        })
                    }

                    client.del("users");

                    res.json({
                        success: true
                    })
                })
            })
        }
    });
});

//the ones that don't specify the target are for the NEWS CRUD
router.post("/create", (req, res) => {
    const validationResult = validateCreateNewsForm(req.body);
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

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

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

        //here to be used for logs
        const userId = decoded.sub;
        const isAdmin = decoded.isAdmin;
        const userName = decoded.userName;
        const profilePictureLink = decoded.profilePictureLink;

        if (isAdmin === true) {

            const newsData = {
                userId: userId,
                newsTitle: req.body.newsTitle,
                newsCoverLink: req.body.newsCoverLink,
                newsDescriptionRaw: req.body.newsDescriptionRaw,
                userName: userName,
                profilePictureLink: profilePictureLink
            };

            const newNews = new News(newsData);
            newNews.save((err) => {
                if (err) {
                    return res.status(400).json({
                        success: false
                    })
                }

                client.del("logsNewsCreate");
                client.del("newsBrowse");
                client.del("newsHome");

                const logData = {
                    newsTitle: req.body.newsTitle
                };

                const newLog = new CreateNewsLogs(logData);
                newLog.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error while logging"
                        })
                    }

                    CreateNewsLogs.find({}, (err, logs) => {
                        if (logs) {
                            client.set("logsNewsCreate", JSON.stringify(logs))
                        }
                    }).sort({time: -1});

                });

                return res.json({
                    success: true
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post('/loadMoreNews', (req, res) => {
    News.find({}, (err, news) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(news.length) === 0) {
            return res.json({
                message: "NoNews"
            })
        }

        return res.json({
            news: news
        })
    }).sort({time: -1}).limit(10).skip(parseInt(req.body.loadAfter));
});

router.post("/readOne", (req, res) => {

    News.findOne({_id: req.body.newsId}, (err, news) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            });
        }

        if (!news) {
            return res.status(404).json({
                message: "The item you are searching for does not exist"
            });
        }

        res.json({
            news: news
        });
    });
});

router.post('/updateShow', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

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

        //here to be used for logs
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            News.findOne({_id: req.body.newsId}, (err, news) => {
                if (err) {
                    //Database error
                    return res.status(400).json({
                        message: "Database Error"
                    });
                }

                if (!news) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                res.json({
                    news: news
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post('/updateSave', (req, res) => {
    const validationResult = validateUpdateNewsForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
            errorsNewsPicturesArray: validationResult.errorsNewsPicturesArray
        });
    }

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

        if (isAdmin === true) {

            News.updateOne({_id: {$eq: req.body.newsId}}, {
                $set: {
                    newsTitle: req.body.newsTitle,
                    newsDescriptionRaw: req.body.newsDescriptionRaw,
                    newsCoverLink: req.body.newsCoverLink
                }
            }, (err, news) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error",
                        success: false
                    });
                }

                if (!news) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist",
                        success: false
                    })
                }

                client.del("logsNewsUpdate");
                client.del("newsBrowse");
                client.del("newsHome");

                const logData = {
                    newsId: req.body.newsId,
                    newsTitle: req.body.newsTitle,
                    newsCoverLink: req.body.newsCoverLink,
                    newsDescriptionRaw: req.body.newsDescriptionRaw,
                    newsTitleOld: req.body.newsTitleOld,
                    newsCoverLinkOld: req.body.newsCoverLinkOld,
                    newsDescriptionRawOld: req.body.newsDescriptionRawOld,
                    userName: req.body.userName,
                    profilePictureLink: req.body.profilePictureLink
                };

                const newLog = new UpdateNewsLogs(logData);
                newLog.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error while logging"
                        })
                    }

                    UpdateNewsLogs.find({}, (err, logs) => {
                        if (logs) {
                            client.set("logsNewsUpdate", JSON.stringify(logs))
                        }
                    }).sort({time: -1});

                });

                return res.json({
                    message: "News successfully updated",
                    success: true
                })
            });
        }
        else return res.status(401).end();
    });
});

router.post('/deleteShow', (req, res) => {

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
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            News.findOne({_id: req.body.newsId}, (err, news) => {
                if (err) {
                    //Database error
                    return res.status(400).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                if (!news) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                res.json({
                    message: "Collection exists",
                    news: news
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post('/delete', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

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
        const userId = decoded.sub;
        const profilePictureLink = decoded.profilePictureLink;
        const userName = decoded.userName;

        if (isAdmin === true) {

            News.deleteOne({_id: req.body.newsId}, (err, news) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }

                if (!news) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    })
                }

                client.del("logsNewsDelete");
                client.del("Comments of:" + req.body.newsId);
                client.del("newsBrowse");
                client.del("newsHome");

                const logData = {
                    newsId: req.body.newsId,
                    newsTitle: req.body.newsTitle,
                    userName: userName,
                    userId: userId,
                    profilePictureLink: profilePictureLink,
                    newsDescriptionRaw: req.body.newsDescriptionRaw,
                    newsCoverLink: req.body.newsCoverLink
                };

                const newLog = new DeleteNewsLogs(logData);
                newLog.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error while logging"
                        })
                    }

                    DeleteNewsLogs.find({}, (err, logs) => {
                        if (logs) {
                            client.set("logsNewsDelete", JSON.stringify(logs))
                        }
                    }).sort({time: -1});
                });

                return res.json({
                    message: "News article deleted"
                });
            });

            CommentNews.deleteMany({newsId: req.body.newsId}, (err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }
            });

        }
        else return res.status(401).end();
    });
});

router.post("/createCollection", (req, res) => {
    const validationResult = validateCreateCollectionForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
            errorsPicturesArray: validationResult.errorsPicturesArray
        });
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            const collectionData = {
                userId: req.body.userId,
                collectionName: req.body.collectionName,
                collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                picturesArray: JSON.parse(req.body.picturesArray),
                profilePictureLink: req.body.userProfilePictureLink,
                userName: req.body.userNameToAdd
            };

            const logData = {
                userId: userId,
                collectionName: req.body.collectionName,
                createdByAdmin: true
            };

            const newLog = new CreateCollectionLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }
            });

            const newCollection = new Collection(collectionData);
            newCollection.save((err) => {
                if (err) {
                    return res.status(400).json({
                        success: false
                    })
                }

                client.del("collectionsAdmin");
                client.del("logsCollectionsCreate");
                client.del("Collections of:" + req.body.userId);
                client.del("collectionsBrowse");
                client.del("collectionsSearch");
                client.del("collectionsHome");

                CreateCollectionLogs.find({}, (err, logs) => {
                    if (logs) {
                        client.set("logsCollectionsCreate", JSON.stringify(logs))
                    }
                }).sort({time: -1});

                return res.json({
                    success: true
                });
            });
        }
        else return res.status(401).end();
    });
});

function readAllCollectionsRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("collectionsAdmin", (err, collections) =>{
                if (collections) {
                    return res.json({
                        collections: JSON.parse(collections),
                        fromCache: true
                    });
                }
                else
                    return next();
            })
        }
        else return res.status(401).end();
    })
}

function readAllCollections(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            Collection.find({}, (err, collections) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    });
                }

                if (collections.length === 0) {
                    return res.status(404).json({
                        message: "Nothing has been addded yet"
                    })
                }

                client.set("collectionsAdmin", JSON.stringify(collections));

                return res.json({
                    collections: collections,
                    fromCache: false
                });
            }).sort({time: -1}).limit(10);
        }
        else return res.status(401).end();
    })
}

router.get("/readAllCollections", readAllCollectionsRedis, readAllCollections);

router.post('/loadMoreCollections', (req, res) => {
    Collection.find({}, (err, collections) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (parseInt(collections.length) === 0) {
            return res.json({
                message: "NoCollections"
            })
        }

        return res.json({
            collections: collections
        })
    }).sort({time: -1}).limit(10).skip(parseInt(req.body.loadAfter));
});

router.post("/searchCollections", (req, res) => {

    const validationResult = validateSearchForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false
        });
    }

    Collection.find({collectionName: {$regex: req.body.searchQuery.trim(), $options: 'si'}}, (err, collections) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (!collections) {
            return res.status(404).json({
                message: "NoRecordsError"
            })
        }

        res.json({
            collections: collections
        })
    }).sort({time: -1});
});

router.post("/readOneCollection", (req, res) => {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            Collection.findOne({_id: req.body.collectionId}, (err, collection) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!collection) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                res.json({
                    collection: collection
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post('/updateShowCollections', (req, res) => {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            Collection.findOne({_id: req.body.collectionId}, (err, collection) => {
                if (err) {
                    //Database error
                    return res.status(400).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                if (!collection) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    });
                }

                res.json({
                    collection: collection
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post('/updateSaveCollections', (req, res) => {
    const validationResult = validateUpdateCollectionsForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors,
            errorsPicturesArray: validationResult.errorsPicturesArray
        });
    }

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            Collection.updateOne({_id: {$eq: req.body.collectionId}}, {
                $set: {
                    userId: req.body.userId,
                    collectionName: req.body.collectionName,
                    collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                    picturesArray: JSON.parse(req.body.picturesArray),
                    userName: req.body.userNameToAdd,
                    qrLink: req.body.qrLink,
                    profilePictureLink: req.body.userProfilePictureLink
                }
            }, (err, collection) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error in /crud/updateSave while updating entry",
                        success: false
                    });
                }

                if (!collection) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist",
                        success: false
                    })
                }

                client.del("collectionsAdmin");
                client.del("logsCollectionsUpdate");
                client.del("Collections of:" + req.body.userIdOld);
                client.del("Collections of:" + req.body.userId);
                client.del("collectionsBrowse");
                client.del("collectionsSearch");
                client.del("collectionsHome");

                const logData = {
                    collectionId: req.body.collectionId,
                    userId: req.body.userId,
                    userIdOld: req.body.userIdOld,
                    collectionName: req.body.collectionName,
                    collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                    picturesArray: JSON.parse(req.body.picturesArray),
                    collectionNameOld: req.body.collectionNameOld,
                    collectionDescriptionRawOld: req.body.collectionDescriptionRawOld,
                    picturesArrayOld: JSON.parse(req.body.picturesArrayOld),
                    userName: req.body.userNameToAdd,
                    userNameOld: req.body.userNameToAddOld,
                    profilePictureLink: req.body.userProfilePictureLink,
                    profilePictureLinkOld: req.body.userProfilePictureLinkOld,
                    qrLink: req.body.qrLink,
                    qrLinkOld: req.body.qrLinkOld,
                    updatedByAdmin: true
                };

                const newLog = new UpdateCollectionLogs(logData);
                newLog.save((err) => {
                    if (err) {
                        return res.status(400).json({
                            message: "Error while logging"
                        })
                    }

                    UpdateCollectionLogs.find({}, (err, logs) => {
                        if (logs) {
                            client.set("logsCollectionsUpdate", JSON.stringify(logs))
                        }
                    }).sort({time: -1});

                });

                return res.json({
                    message: "Collection successfully updated",
                    success: true
                })
            });
        }
        else return res.status(401).end();
    });
});

router.post('/deleteShowCollection', (req, res) => {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            User.findOne({_id: userId}, (err, user) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!user) {
                    return res.status(404).json({
                        message: "User not found"
                    });
                }
                Collection.findOne({_id: req.body.collectionId}, (err, collection) => {
                    if (err) {
                        //Database error
                        return res.status(400).json({
                            message: "The item you are searching for does not exist"
                        });
                    }

                    if (!collection) {
                        return res.status(404).json({
                            message: "The item you are searching for does not exist"
                        });
                    }

                    res.json({
                        message: "Collection exists",
                        collection: collection
                    });
                });
            });
        }
        else return res.status(401).end();
    });
});

router.post("/deleteCollection", (req, res) => {

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
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            //ownerId - the id of the owner
            //userId - the id of the admin that deletes the collection
            const logData = {
                ownerId: req.body.ownerId,
                userId: userId,
                collectionId: req.body.collectionId,
                collectionName: req.body.collectionName,
                collectionDescription: req.body.collectionDescription,
                picturesArray: JSON.parse(req.body.picturesArray),
                userName: req.body.userName,
                profilePictureLink: req.body.profilePictureLink,
                qrLink: req.body.qrLink,
                deletedByAdmin: true
            };

            Collection.deleteOne({_id: req.body.collectionId}, (err, collection) => {
                if (err) {
                    return res.status(400).json({
                        message: "The item you are searching for does not exist"
                    })
                }

                if (!collection) {
                    return res.status(404).json({
                        message: "The item you are searching for does not exist"
                    })
                }

                client.del("collectionsAdmin");
                client.del("logsCollectionsDelete");
                client.del("Collections of:" + req.body.ownerId);
                client.del("Comments of:" + req.body.collectionId);
                client.del("collectionsBrowse");
                client.del("collectionsSearch");
                client.del("collectionsHome");

                return res.json({
                    message: "Collection was successfully deleted"
                });
            });

            CommentCollection.deleteMany({collectionId: req.body.collectionId}, (err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }
            });

            const newLog = new DeleteCollectionLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }

                DeleteCollectionLogs.find({}, (err, logs) => {
                    if (logs) {
                        client.set("logsCollectionsDelete", JSON.stringify(logs))
                    }
                }).sort({time: -1});

            });
        }
        else return res.status(401).end();
    });
});

function logsLoginRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsLogin", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            })
        }
        else return res.status(401).end();
    })
}

function logsLogin(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            LoginLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsLogin", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });

            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsLogin", logsLoginRedis, logsLogin);

function logsSignupRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsSignup", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            })
        }
        else return res.status(401).end();
    })
}

function logsSignup(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            SignupLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsSignup", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });

            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsSignup", logsSignupRedis, logsSignup);

function logsCollectionsCreateRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsCollectionsCreate", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            });
        }
        else return res.status(401).end();
    })
}

function logsCollectionsCreate(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            CreateCollectionLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsCollectionsCreate", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsCollectionsCreate", logsCollectionsCreateRedis, logsCollectionsCreate);

function logsCollectionsDeleteRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsCollectionsDelete", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            });
        }
        else return res.status(401).end();
    })
}

function logsCollectionsDelete(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            DeleteCollectionLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsCollectionsDelete", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsCollectionsDelete", logsCollectionsDeleteRedis, logsCollectionsDelete);

function logsCollectionsUpdateRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsCollectionsUpdate", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            })
        }
        else return res.status(401).end();
    })
}

function logsCollectionsUpdate(req, res) {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            UpdateCollectionLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsCollectionsUpdate", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsCollectionsUpdate", logsCollectionsUpdateRedis, logsCollectionsUpdate);

function logsNewsUpdateRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsNewsUpdate", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            });
        }
        else return res.status(401).end();
    })
}

function logsNewsUpdate(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            UpdateNewsLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsNewsUpdate", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsNewsUpdate", logsNewsUpdateRedis, logsNewsUpdate);

function logsNewsCreateRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsNewsCreate", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            })
        }
        else return res.status(401).end();
    })
}

function logsNewsCreate(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            CreateNewsLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsNewsCreate", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsNewsCreate", logsNewsCreateRedis, logsNewsCreate);

function logsNewsDeleteRedis(req, res, next) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            client.get("logsNewsDelete", (err, logs) => {
                if (logs !== null) {
                    res.json({
                        logs: JSON.parse(logs),
                        fromCache: true
                    })
                }
                else {
                    next();
                }
            })
        }
        else return res.status(401).end();
    })
}

function logsNewsDelete(req, res) {
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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            DeleteNewsLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsNewsDelete", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    })
}

router.get("/logsNewsDelete", logsNewsDeleteRedis, logsNewsDelete);

function logsProfileRedis(req, res, next) {

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

            let isAdmin = decoded.isAdmin;
            if (isAdmin === true) {
                client.get("logsProfile", (err, logs) => {
                    if (logs !== null) {
                        res.json({
                            logs: JSON.parse(logs),
                            fromCache: true
                        })
                    }
                    else {
                        next();
                    }
                });
            }
            else return res.status(401).end();
        }
    )
}

function logsProfile(req, res) {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            UpdateProfileLogs.find({}, (err, logs) => {

                if (err) {
                    res.status(400).json({
                        message: "Database error"
                    });
                }

                if (!logs) {
                    res.status(404).json({
                        message: "No logs found"
                    });
                }

                client.set("logsProfile", JSON.stringify(logs));

                res.json({
                    logs: logs,
                    fromCache: false
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
}

router.get("/logsProfile", logsProfileRedis, logsProfile);

module.exports = router;