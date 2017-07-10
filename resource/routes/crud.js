const express = require('express');
const Collection = require('mongoose').model('Collection');
const CreateCollectionLogs = require('mongoose').model('CreateCollectionLogs');
const UpdateCollectionLogs = require('mongoose').model('UpdateCollectionLogs');
const DeleteCollectionLogs = require('mongoose').model('DeleteCollectionLogs');
const CommentCollection = require('mongoose').model("CommentCollection");
const jwt = require('jsonwebtoken');

const config = require('../../config');

const router = new express.Router();

// Redis
const redis = require('redis');
const client = redis.createClient();

function validateSearchForm(payload) {
    let isFormValid = true;

    if (!payload.searchQuery || typeof payload.searchQuery !== 'string' || payload.searchQuery.trim().length > 100) {
        isFormValid = false
    }

    return {
        success: isFormValid
    }
}

function validateCreateForm(payload) {
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
}

function validateUpdateForm(payload) {
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
}

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

        const collectionData = {
            userId: userId,
            userName: userName,
            profilePictureLink: profilePictureLink,
            collectionName: req.body.collectionName,
            collectionDescriptionRaw: req.body.collectionDescriptionRaw,
            picturesArray: JSON.parse(req.body.picturesArray),
            tags: JSON.parse(req.body.tags)
        };

        const logData = {
            userId: userId,
            collectionName: req.body.collectionName
        };

        const newCollection = new Collection(collectionData);
        newCollection.save((err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: "Another collection with the same name exists"
                })
            }

            client.del("collectionsAdmin");
            client.del("logsCollectionsCreate");
            client.del("Collections of:" + userId);
            client.del("collectionsBrowse");
            client.del("collectionsSearch");
            client.del("collectionsHome");

            return res.json({
                success: true
            });
        });

        const newLog = new CreateCollectionLogs(logData);
        newLog.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: "Error while logging"
                })
            }

           CreateCollectionLogs.find({}, (err, logs) => {
                if (logs) {
                    client.set("logsCollectionsCreate", JSON.stringify(logs))
                }
           }).sort({time: -1});
        });
    });
});

function readAllRedis(req, res, next) {
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
        client.get("Collections of:" + userId , (err, collections) => {
            if (collections){
                return res.json({
                    collections: JSON.parse(collections),
                    fromCache: true
                });
            }
                else return next();
        })
    })
}

function readAll(req, res) {
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

        Collection.find({userId: userId}, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error"
                });
            }

            if (collections.length === 0) {
                return res.json({
                    message: "You have not added anything yet"
                })
            }

            client.set("Collections of:" + userId , JSON.stringify(collections));

            return res.json({
                collections: collections,
                fromCache: false
            });
        }).sort({time: -1}).limit(10);
    })
}

router.get("/readAll", readAllRedis, readAll);

router.get('/readAll', (req, res) => {

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

        //No need to check if the user exists, that is already handled by the authorization middleware
        Collection.find({userId: userId}, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error"
                });
            }

            if (collections.length === 0) {
                return res.status(404).json({
                    message: "You have not added anything yet"
                })
            }

            return res.json({
                collections: collections
            });
        }).sort({time: -1}).limit(10);
    });
});

router.post('/loadMore', (req, res) => {
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

        Collection.find({userId: userId}, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error"
                });
            }

            if (parseInt(collections.length) === 0) {
                return res.status(404).json({
                    message: "NoCollections"
                })
            }

            return res.json({
                collections: collections
            });
        }).sort({time: -1}).limit(10).skip(parseInt(req.body.loadAfter));
    })
});

// only own collections
router.post("/searchCollections", (req, res) => {

    const validationResult = validateSearchForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false
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

        const userId = decoded.sub;

        Collection.find({
            collectionName: {$regex: req.body.searchQuery.trim(), $options: 'si',},
            userId: userId
        }, (err, collections) => {
            if (err) {
                return res.status(400).json({
                    message: "Database error"
                });
            }

            if (collections.length === 0) {
                return res.json({
                    errorMessage: "NoRecordsError"
                })
            }

            res.json({
                collections: collections
            });
        }).sort({time: -1});

    })
});

router.post('/readOne', (req, res) => {

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
    }
    else {
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
});

router.post('/updateShow', (req, res) => {

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

        Collection.findOne({_id: req.body.collectionId, userId: userId}, (err, collection) => {
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

        Collection.updateOne({_id: {$eq: req.body.collectionId}, userId: userId}, {
            $set: {
                collectionName: req.body.collectionName,
                collectionDescriptionRaw: req.body.collectionDescriptionRaw,
                picturesArray: JSON.parse(req.body.picturesArray),
                tags: JSON.parse(req.body.tags)
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
                    message: "Collection does not exist",
                    success: false
                })
            }

            client.del("collectionsAdmin");
            client.del("logsCollectionsUpdate");
            client.del("Collections of:" + userId);
            client.del("collectionsBrowse");
            client.del("collectionsSearch");
            client.del("collectionsHome");

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
                tags: JSON.parse(req.body.tags),
                tagsOld: JSON.parse(req.body.tagsOld),
                updatedByAdmin: false
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

        Collection.findOne({_id: req.body.collectionId, userId: userId}, (err, collection) => {
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

        const logData = {
            ownerId: userId,
            userId: userId,
            collectionId: req.body.collectionId,
            collectionName: req.body.collectionName,
            collectionDescriptionRaw: req.body.collectionDescriptionRaw,
            picturesArray: JSON.parse(req.body.picturesArray),
            tags: JSON.parse(req.body.tags),
            deletedByAdmin: false
        };

        Collection.deleteOne({_id: req.body.collectionId, userId: userId}, (err, collection) => {
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

            client.del("collectionsAdmin");
            client.del("logsCollectionsDelete");
            client.del("Collections of:" + userId);
            client.del("Comments of:" + req.body.collectionId);
            client.del("collectionsBrowse");
            client.del("collectionsSearch");
            client.del("collectionsHome");

            return res.json({
                message: "Collection was successfully deleted"
            });
        });

        CommentCollection.deleteMany({collectionId: req.body.collectionId, userId: userId}, (err) => {
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
                    client.set("logsCollectionsDelete", JSON.stringify(logs));
                }
            }).sort({time: -1});
        });
    });
});

module.exports = router;