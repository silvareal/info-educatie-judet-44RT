const express = require('express');
const Collection = require('mongoose').model('Collection');
const News = require('mongoose').model('News');

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

function readAllCollectionsRedis(req, res, next) {
    client.get("collectionsBrowse", (err, collections) => {
        if (collections) {
            return res.json({
                collections: JSON.parse(collections),
                fromCache: true
            })
        }
        else return next();
    });
}

function readAllCollections(req, res) {
    Collection.find({}, (err, collections) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (!collections) {
            return res.status(404).json({
                message: "NoCollections"
            })
        }

        client.set("collectionsBrowse", JSON.stringify(collections));

        return res.json({
            collections: collections,
            fromCache: false
        });

    }).sort({time: -1}).limit(10);
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

function getCollectionsForSearchRedis(req, res, next) {
    client.get("collectionsSearch", (err, collections) => {
        if (collections) {
            return res.json({
                collections: JSON.parse(collections),
                fromCache: true
            })
        }
        else return next();
    });
}

function getCollectionsForSearch(req, res) {
    Collection.find({}, (err, collections) => {

        if (err) {
            return res.status(400).json({
                message: "Database error"
            })
        }

        if (!collections) {
            return res.status(404).json({
                message: "NoCollections"
            })
        }

        client.set("collectionsSearch", JSON.stringify(collections));

        return res.json({
            collections: collections,
            fromCache: false
        })
    }).sort({time: -1});
}

router.get("/getCollectionsForSearch", getCollectionsForSearchRedis, getCollectionsForSearch);

// all collections
router.post("/searchCollections", (req, res) => {

    const validationResult = validateSearchForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false
        });
    }
    //{collectionName: {$regex: req.body.searchQuery.trim(), $options: 'si'}}
    Collection.find({}, (err, collections) => {

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

        // The search function by tags or collectionName
        let foundCollections = [];
        for (let i = 0; i < collections.length; i++) {
            let data = collections[i];
            if ((data.collectionName).toUpperCase().includes((req.body.searchQuery).toUpperCase().trim()))
                foundCollections = foundCollections.concat(data);
            else if (data.tags) {
                for (let j = 0; j < data.tags.length; j++) {
                    if ((data.tags[j].value).toUpperCase().includes((req.body.searchQuery).toUpperCase().trim())) {
                        foundCollections = foundCollections.concat(data);
                        break;
                    }
                }
            }
        }

        res.json({
            collections: foundCollections
        })
    }).sort({time: -1});
});

function readAllNewsRedis(req, res, next) {
    client.get("newsBrowse", (err, news) => {
        if (news) {
            return res.json({
                news: JSON.parse(news),
                fromCache: true
            })
        }
        else return next();
    });
}

function readAllNews(req, res) {
    News.find({}, (err, news) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            });
        }

        if (news.length === 0) {
            return res.status(404).json({
                message: "NoNews"
            })
        }

        client.set("newsBrowse", JSON.stringify(news));

        return res.json({
            news: news,
            fromCache: false
        });
    }).sort({time: -1}).limit(10);
}

router.get("/readAllNews", readAllNewsRedis, readAllNews);

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

module.exports = router;