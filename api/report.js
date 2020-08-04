const mongodb = require("mongodb").MongoClient;
const express = require('express');
const { query } = require("express");
var router = express.Router();
var mongo_config = require("../config").mongo_config;
format = require('util').format;

router.get('/report', function (req, res) {
    var querystr = {};

    exact_date = req.query.date;
    start_date = req.query.start_date;
    end_date = req.query.end_date;

    if (exact_date) {
        if (start_date || end_date) {
            res.status(500);
            res.send("choose either exact date or date range, but not both");
        }
        querystr.import_date = {
            $gte: new Date(exact_date + 'T00:00:00.000Z'),
            $lte: new Date(exact_date + 'T23:59:59.999Z')
        }
    } else if (start_date && end_date) {
        querystr.import_date = {
            $gte: new Date(start_date + 'T00:00:00.000Z'),
            $lte: new Date(end_date + 'T23:59:59.999Z')
        }
    } else {
        res.status(500);
            res.send("choose either exact date or date range");
    }


    mongodb.connect(mongo_config.host, function (err, db) {
        if (err) throw err;

        var dbo = db.db(mongo_config.db);

        dbo.collection(mongo_config.collection).find(querystr).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();

        });
    });
});

module.exports = router;