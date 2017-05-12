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
const config = require('../../config');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

const router = new express.Router();

cleanBody = (req, res, next) => {
    req.body = sanitize(req.body);
    next();
};

validateCreateCollectionForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user input and limit length of fields.

    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescription || typeof payload.collectionDescription !== 'string' || payload.collectionDescription.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescription = "Please use a valid description"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        if (!errorsPicturesArray[key].pictureDescription || typeof errorsPicturesArray[key].pictureDescription !== 'string' || errorsPicturesArray[key].pictureDescription.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescription = "Please use a valid description for this picture"
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
};

validateUpdateCollectionsForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user input and limit length of fields.

    if (!payload.userId || typeof payload.userId !== 'string' || payload.userId.length !== 24) {
        isFormValid = false;
        errors.userId = "The userId needs to be 24 characters long"
    }

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescription || typeof payload.collectionDescription !== 'string' || payload.collectionDescription.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescription = "Please use a valid description"
    }

    let errorsPicturesArray = JSON.parse(payload.picturesArray);

    Object.keys(errorsPicturesArray).map((key) => {
        if (!errorsPicturesArray[key].pictureName || typeof errorsPicturesArray[key].pictureName !== 'string' || errorsPicturesArray[key].pictureName.trim().length > 100) {
            isFormValid = false;
            errorsPicturesArray[key].pictureName = "Please use a valid name for this picture"
        }
        if (!errorsPicturesArray[key].pictureDescription || typeof errorsPicturesArray[key].pictureDescription !== 'string' || errorsPicturesArray[key].pictureDescription.trim().length > 5000) {
            isFormValid = false;
            errorsPicturesArray[key].pictureDescription = "Please use a valid description for this picture"
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
};

//retrieve the array from the ajax request and make a new array for database update query
validateMakeModeratorsForm = (payload) => {
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
};

validateCreateNewsForm = (payload) => {
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

    if (!payload.newsDescription || typeof payload.newsDescription !== 'string' || payload.newsDescription.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescription = "Please use a shorter and valid description"
    }

    let errorsNewsPicturesArray = JSON.parse(payload.newsPictures);

    Object.keys(errorsNewsPicturesArray).map((key) => {
        if (!errorsNewsPicturesArray[key].newsPictureLink || typeof errorsNewsPicturesArray[key].newsPictureLink !== 'string' || errorsNewsPicturesArray[key].newsPictureLink.trim().length > 10000) {
            isFormValid = false;
            errorsNewsPicturesArray[key].newsPictureLink = "Please use a shorter link"
        }
    });

    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors,
        errorsNewsPicturesArray
    };
};

validateUpdateNewsForm = (payload) => {
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

    if (!payload.newsDescription || typeof payload.newsDescription !== 'string' || payload.newsDescription.trim().length > 5000) {
        isFormValid = false;
        errors.newsDescription = "Please use a shorter and valid description"
    }

    let errorsNewsPicturesArray = JSON.parse(payload.newsPictures);

    Object.keys(errorsNewsPicturesArray).map((key) => {
        if (!errorsNewsPicturesArray[key].newsPictureLink || typeof errorsNewsPicturesArray[key].newsPictureLink !== 'string' || errorsNewsPicturesArray[key].newsPictureLink.trim().length > 10000) {
            isFormValid = false;
            errorsNewsPicturesArray[key].newsPictureLink = "Please use a shorter link"
        }
    });

    if (!isFormValid) {
        message = "Check the specified fields for errors";
    }

    return {
        success: isFormValid,
        message,
        errors,
        errorsNewsPicturesArray
    };
};

router.get('/adminAuthentication', (req, res) => {

    //check if user is admin and retrieve the users list if so

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
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
                res.status(401).json({
                    message: "Not an admin"
                });
            }
        })
    });
});

router.get("/showUsers", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

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
    });
});

router.post('/makeModerators', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }
        //here to be used for logs
        const userId = decoded.sub;

        const validationResult = validateMakeModeratorsForm(req.body);

        //f1
        for (let i = 0; i < validationResult.makeModerators.length; i++) {
            if (validationResult.makeModerators[i] !== null) {
                User.findOne({_id: validationResult.makeModerators[i]}, (err, user) => {

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

                        //if the user by id is not a moderator yet
                        if (user.moderator === false) {
                            User.updateOne({_id: {$eq: validationResult.makeModerators[i]}}, {
                                $set: {
                                    moderator: true
                                }
                            }, (err, user) => {
                                if (err) {
                                    console.log("error 1");
                                }

                                if (!user) {
                                    console.log("error 2");
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
                                        console.log("error 1");
                                    }

                                    if (!user) {
                                        console.log("error 2");
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
    });
});

//the ones that don't specify the target are for the news CRUD
router.post("/create", (req, res) => {
    const validationResult = validateCreateNewsForm(req.body);
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

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }
        //here to be used for logs
        const userId = decoded.sub;

        const newsData = {
            userId: userId,
            newsTitle: req.body.newsTitle,
            newsCoverLink: req.body.newsCoverLink,
            newsDescription: req.body.newsDescription,
            picturesArray: JSON.parse(req.body.newsPictures)
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
    });
});

router.get("/readAll", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }
        //here to be used for logs
        const userId = decoded.sub;

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
        }).sort({creationDate: -1});
    });
});

router.post("/readOne", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }
        //here to be used for logs
        const userId = decoded.sub;

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
});

router.post('/updateShow', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }
        //here to be used for logs
        const userId = decoded.sub;

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
            return res.status(401).end();
        }

        News.updateOne({_id: {$eq: req.body.newsId}}, {
            $set: {
                newsTitle: req.body.newsTitle,
                newsCoverLink: req.body.newsCoverLink,
                picturesArray: JSON.parse(req.body.newsPictures)
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
                newsDescription: req.body.newsDescription,
                newsTitleOld: req.body.newsTitleOld,
                newsCoverLinkOld: req.body.newsCoverLinkOld,
                newsDescriptionOld: req.body.newsDescriptionOld,
                picturesArray: JSON.parse(req.body.newsPictures),
                picturesArrayOld: JSON.parse(req.body.newsPicturesOld)
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
    });
});

router.post('/deleteShow', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

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
    });
});

router.post('/delete', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const logData = {
            newsId: req.body.newsId,
            newsTitle: req.body.newsTitle,
            newsDescription: req.body.newsDescription,
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
            return res.status(401).end();
        }

        const userId = decoded.sub;

        //this part of the application is used to add collections for other users
        //in case they accidentally deleted it, we can retrieve from the old array the logs and personally restore it for them
        //userId is an input since we add the collection for the user with the userId
        const collectionData = {
            userId: req.body.userId,
            collectionName: req.body.collectionName,
            collectionDescription: req.body.collectionDescription,
            picturesArray: JSON.parse(req.body.picturesArray)
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
    });
});

router.get("/readAllCollections", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

        //the admin can see all collections ever added
        Collection.find({}, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error"
                });
            }

            if (collections.length == 0) {
                return res.status(404).json({
                    message: "Nothing has been addded yet"
                })
            }

            return res.json({
                collections: collections
            });
        }).sort({creationDate: -1});
    });
});

router.post("/readOneCollection", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

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
    });
});

router.post('/updateShowCollections', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

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
            return res.status(401).end();
        }

        const userId = decoded.sub;

        Collection.updateOne({_id: {$eq: req.body.collectionId}}, {
            $set: {
                userId: req.body.userId,
                collectionName: req.body.collectionName,
                collectionDescription: req.body.collectionDescription,
                picturesArray: JSON.parse(req.body.picturesArray)
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
                collectionDescription: req.body.collectionDescription,
                picturesArray: JSON.parse(req.body.picturesArray),
                collectionNameOld: req.body.collectionNameOld,
                collectionDescriptionOld: req.body.collectionDescriptionOld,
                picturesArrayOld: JSON.parse(req.body.picturesArrayOld),
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
    });
});

router.post('/deleteShowCollection', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        const userId = decoded.sub;

        User.findOne({_id: userId}, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error in User.findOne from /crud/delete"
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
    });
});

router.post("/deleteCollection", (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

        //ownerId - the id of the owner
        //userId - the id of the admin that deletes the collection
        const logData = {
            ownerId: req.body.ownerId,
            userId: userId,
            collectionId: req.body.collectionId,
            collectionName: req.body.collectionName,
            collectionDescription: req.body.collectionDescription,
            picturesArray: JSON.parse(req.body.picturesArray),
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
        });
    });
});

module.exports = router;