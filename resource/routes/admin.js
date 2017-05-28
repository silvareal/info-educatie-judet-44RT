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

function validateSearchForm(payload) {
    let isFormValid = true;

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

    //validate the user input and limit length of fields.

    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }

    if (!payload.userName || typeof payload.userName !== 'string' || payload.userName.trim().length === 0) {
        isFormValid = false;
        errors.userName = "Missing user name"
    }

    if (payload.profilePictureLink) {
        if (payload.profilePictureLink.trim().length > 10000) {
            isFormValid = false;
            errors.profilePictureLink = "Please use a shorter link for the profile picture"
        }
    }

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
    }

    if (!payload.qrLink || typeof payload.qrLink !== 'string' || payload.qrLink.trim().length > 10000) {
        isFormValid = false;
        errors.qrLink = "Link missing or too long"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        if (!errorsPicturesArray[key].pictureDescriptionRaw || typeof errorsPicturesArray[key].pictureDescriptionRaw !== 'string' || errorsPicturesArray[key].pictureDescriptionRaw.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescriptionRaw = "Please use a valid description for this picture"
        }
        if (!errorsPicturesArray[key].pictureLink || typeof errorsPicturesArray[key].pictureLink !== 'string') {
            isFormValid = false;
            errorsPicturesArray[key].pictureLink = "Please use a link for the picture"
        }
    });

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

    //validate the user input and limit length of fields.

    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }

    if (!payload.userName || typeof payload.userName !== 'string' || payload.userName.trim().length === 0) {
        isFormValid = false;
        errors.userName = "Missing user name"
    }

    if (payload.profilePictureLink) {
        if (payload.profilePictureLink.trim().length > 10000) {
            isFormValid = false;
            errors.profilePictureLink = "Please use a shorter link for the profile picture"
        }
    }

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
    }

    if (!payload.qrLink || typeof payload.qrLink !== 'string' || payload.qrLink.trim().length > 10000) {
        isFormValid = false;
        errors.qrLink = "Please use a shorter link"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        if (!errorsPicturesArray[key].pictureDescriptionRaw || typeof errorsPicturesArray[key].pictureDescriptionRaw !== 'string' || errorsPicturesArray[key].pictureDescriptionRaw.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescriptionRaw = "Please use a valid description for this picture"
        }
        if (!errorsPicturesArray[key].pictureLink || typeof errorsPicturesArray[key].pictureLink !== 'string') {
            isFormValid = false;
            errorsPicturesArray[key].pictureLink = "Please use a link for the picture"
        }
    });

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

//retrieve the array from the ajax request and make a new array for database update query
function validateMakeModeratorsForm(payload) {
    let i = 0;
    let makeModerators = [];
    payload.moderators = JSON.parse(payload.moderators);
    for (let j = 0; j <= payload.moderators.length; j++) {
        if (payload.moderators[j] !== undefined) {
            makeModerators[i] = payload.moderators[i];
            i++;
        }
    }
    return {
        makeModerators: makeModerators
    }
}

function validateCreateNewsForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user input and limit length of fields.

    if (!payload.newsTitle || typeof payload.newsTitle !== 'string' || payload.newsTitle.trim().length > 100) {
        isFormValid = false;
        errors.newsTitle = "Please use a valid title"
    }

    if (!payload.newsCoverLink || typeof payload.newsCoverLink !== 'string' || payload.newsCoverLink.trim().length > 10000) {
        isFormValid = false;
        errors.newsCoverLink = "Please use a shorter link"
    }

    if (!payload.newsDescriptionRaw || typeof payload.newsDescriptionRaw !== 'string' || payload.newsDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescriptionRaw = "Please use a valid description"
    }

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

    //validate the user input and limit length of fields.

    if (!payload.newsTitle || typeof payload.newsTitle !== 'string' || payload.newsTitle.trim().length > 100) {
        isFormValid = false;
        errors.newsTitle = "Please use a valid title"
    }

    if (!payload.newsCoverLink || typeof payload.newsCoverLink !== 'string' || payload.newsCoverLink.trim().length > 10000) {
        isFormValid = false;
        errors.newsCoverLink = "Please use a shorter link"
    }

    if (!payload.newsDescriptionRaw || typeof payload.newsDescriptionRaw !== 'string' || payload.newsDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescriptionRaw = "Please use a shorter and valid description"
    }

    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

router.get('/adminAuthentication', (req, res) => {

    //check if user is admin and retrieve the users list if so

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

            User.findOne({_id: userId}, (err, user) => {

                if (user.admin === true) {

                    res.json({
                        message: "Welcome admin"
                    });
                }
                else {
                    res.json({
                        message: "Not an admin"
                    })
                }
            })
        });
    }
    else return res.status(401).end();
});

router.get("/showUsers", (req, res) => {

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

            User.findOne({_id: userId}, (err, user) => {

                if (user.admin === true) {

                    User.find({admin: false}, (err, users) => {
                        res.json({
                            data: users
                        })
                    });
                }
                else {
                    res.status(401).json({
                        message: "Not an admin"
                    });
                }
            })
        }
        else return res.status(401).end();
    });
});

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

        const validationResult = validateMakeModeratorsForm(req.body);

        if (isAdmin === true) {
            for (let i = 0; i < validationResult.makeModerators.length; i++) {
                if (validationResult.makeModerators[i] !== null) {
                    User.findOne({_id: validationResult.makeModerators[i]}, (err, user) => {

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

                            //if the user by id is not a moderator yet
                            if (user.moderator === false) {
                                User.updateOne({_id: {$eq: validationResult.makeModerators[i]}}, {
                                    $set: {
                                        moderator: true
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
                                })
                            }
                            else {
                                if (user.moderator === true) {
                                    User.updateOne({_id: {$eq: validationResult.makeModerators[i]}}, {
                                        $set: {
                                            moderator: false
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
                                    });
                                }
                            }

                        }
                    );
                }
                if (i === validationResult.makeModerators.length - 1) {
                    res.json({
                        message: "All okay"
                    });
                }
            }
        }
        else return res.status(401).end();
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
        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {
            const newsData = {
                userId: userId,
                newsTitle: req.body.newsTitle,
                newsCoverLink: req.body.newsCoverLink,
                newsDescriptionRaw: req.body.newsDescriptionRaw,
                userName: req.body.userName,
                profilePictureLink: req.body.profilePictureLink
            };

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
            });

            const newNews = new News(newsData);
            newNews.save((err) => {
                if (err) {
                    return res.status(400).json({
                        success: false
                    })
                }

                return res.json({
                    success: true
                });
            });
        }
        else return res.status(401).end();
    });
});

router.get("/readAll", (req, res) => {

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

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
            }).sort({time: -1}).limit(10);
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

router.post('/searchNews', (req, res) => {

    const validationResult = validateSearchForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false
        });
    }

    News.find({newTitle: {$regex: req.body.searchQuery.trim(), $options: 'si'}}, (err, news) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (!news) {
            return res.status(404).json({
                message: "NoRecordsError"
            })
        }

        res.json({
            news: news
        })
    }).sort({time: -1});
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

        let isAdmin = decoded.isAdmin;

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

        let isAdmin = decoded.isAdmin;

        if (isAdmin === true) {

            const logData = {
                newsId: req.body.newsId,
                newsTitle: req.body.newsTitle,
                userName: req.body.userName,
                profilePictureLink: req.body.profilePictureLink,
                newsDescriptionRaw: req.body.newsDescriptionRaw,
                newsCoverLink: req.body.newsCoverLink,
                picturesArray: JSON.parse(req.body.newsPictures)
            };

            const newLog = new DeleteNewsLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }
            });

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
                qrLink: req.body.qrLink,
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

                return res.json({
                    success: true
                });
            });
        }
        else return res.status(401).end();
    });
});

router.get("/readAllCollections", (req, res) => {

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

                return res.json({
                    collections: collections
                });
            }).sort({time: -1}).limit(10);
        }
        else return res.status(401).end();
    });
});

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

            const newLog = new DeleteCollectionLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }

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

            });
        }
        else return res.status(401).end();
    });
});

router.get("/logsLogin", (req, res) => {

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

                res.json({
                    logs: logs
                });

            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsSignup", (req, res) => {

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

                res.json({
                    logs: logs
                });

            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsCollectionsCreate", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsCollectionsDelete", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsCollectionsUpdate", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsNewsUpdate", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsNewsCreate", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
        else return res.status(401).end();
    });
});

router.get("/logsNewsDelete", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
    });
});

router.get("/logsProfile", (req, res) => {

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

                res.json({
                    logs: logs
                });
            }).sort({time: -1});
        }
    });
});

module.exports = router;