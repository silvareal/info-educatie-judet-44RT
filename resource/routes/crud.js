const express = require('express');
const Collection = require('mongoose').model('Collection');
const User = require('mongoose').model('User');
const CreateCollectionLogs = require('mongoose').model('CreateCollectionLogs');
const UpdateCollectionLogs = require('mongoose').model('UpdateCollectionLogs');
const DeleteCollectionLogs = require('mongoose').model('DeleteCollectionLogs');
const CommentCollection = require('mongoose').model("CommentCollection");
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');

const config = require('../../config');

const router = new express.Router();

//sanitize the user input
cleanBody = (req, res, next) => {
    req.body = sanitize(req.body);
    next();
};

validateCreateForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user input and limit length of fields.

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
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
};

validateUpdateForm = (payload) => {
    const errors = {};
    let isFormValid = true;
    let message = '';

    //validate the user input and limit length of fields.

    if (!payload.collectionName || typeof payload.collectionName !== 'string' || payload.collectionName.trim().length > 100) {
        isFormValid = false;
        errors.collectionName = "Please use a valid name for the collection"
    }

    if (!payload.collectionDescriptionRaw || typeof payload.collectionDescriptionRaw !== 'string' || payload.collectionDescriptionRaw.trim().length > 5000) {
        isFormValid = false;
        errors.collectionDescriptionRaw = "Please use a valid description"
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
};

//create a new entry
router.post('/create', (req, res) => {
    const validationResult = validateCreateForm(req.body);
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

        const userId = decoded.sub;

        //Values we don't necessarily need and we set to a string
        //We can simply convert the rawState we save from the editors to HTML

        const collectionData = {
            userId: userId,
            collectionName: req.body.collectionName,
            collectionDescriptionRaw: req.body.collectionDescriptionRaw,
            picturesArray: JSON.parse(req.body.picturesArray)
        };

        const logData = {
            userId: userId,
            collectionName: req.body.collectionName
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

router.get('/readAll', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        const userId = decoded.sub;

        //No need to check if the user exists, that is already handled by the authorization middleware
        Collection.find({userId: userId}, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error at /crud/readAll : retrieving collections"
                });
            }

            if (collections.length == 0) {
                return res.status(404).json({
                    message: "You have not added anything yet"
                })
            }

            return res.json({
                collections: collections
            });
        }).sort({creationDate: -1});
    });
});

router.post('/readOne', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        Collection.findOne({_id: req.body.collectionId}, (err, collection) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error in /crud/readOne retrieving a single collection"
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

router.post('/updateShow', (req, res) => {
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

router.post('/updateSave', (req, res) => {
    const validationResult = validateUpdateForm(req.body);
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
                collectionName: req.body.collectionName,
                collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                picturesArray: JSON.parse(req.body.picturesArray)
            }
        }, (err, collection) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error in /crud/updateSave while updating entry",
                    success: false
                });
            }

            //this is a non admin page, the owner ID can t be changed
            const logData = {
                collectionId: req.body.collectionId,
                userId: userId,
                userIdOld: userId,
                collectionName: req.body.collectionName,
                collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                picturesArray: JSON.parse(req.body.picturesArray),
                collectionNameOld: req.body.collectionNameOld,
                collectionDescriptionRawOld: req.body.collectionDescriptionRawOld,
                picturesArrayOld: JSON.parse(req.body.picturesArrayOld),
                updatedByAdmin: false
            };

            const newLog = new UpdateCollectionLogs(logData);
            newLog.save((err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error while logging"
                    })
                }
            });

            if (!collection) {
                return res.status(404).json({
                    message: "The item you are searching for does not exist",
                    success: false
                })
            }

            return res.json({
                message: "Collection successfully updated",
                success: true
            })
        });
    });
});

router.post('/deleteShow', (req, res) => {

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

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

router.post('/deleteExecute', (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {

        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;

        const logData = {
            ownerId: userId,
            userId: userId,
            collectionId: req.body.collectionId,
            collectionName: req.body.collectionName,
            collectionDescriptionRaw: req.body.collectionDescriptionRaw,
            picturesArray: JSON.parse(req.body.picturesArray),
            deletedByAdmin: false
        };

        const newLog = new DeleteCollectionLogs(logData);
        newLog.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: "Error while logging"
                })
            }

            CommentCollection.deleteMany({collectionId: req.body.collectionId}, (err) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
                    })
                }
            });

            Collection.deleteOne({_id: req.body.collectionId}, (err, collection) => {
                if (err) {
                    return res.status(400).json({
                        message: "Database error"
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