const express = require('express');
const Collection = require('mongoose').model('Collection');
const News = require('mongoose').model('News');

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

router.get('/readAllCollections', (req, res) => {
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

        return res.json({
            collections: collections
        });

    }).sort({time: -1}).limit(10);
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

// all collections
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

router.get("/readAllNews", (req, res) => {
    News.find({}, (err, news) => {
        if (err) {
            return res.status(400).json({
                message: "Database error"
            });
        }

        if (news.length == 0) {
            return res.status(404).json({
                message: "NoNews"
            })
        }

        return res.json({
            news: news
        });
    }).sort({time: -1}).limit(10);
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

    News.find({newsTitle: {$regex: req.body.searchQuery.trim(), $options: 'si'}}, (err, news) => {


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

module.exports = router;