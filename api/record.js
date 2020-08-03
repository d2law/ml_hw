const fs = require('fs');
const express = require('express');
var router = express.Router();
const multer = require('multer');
const filepath = './tmp_storage/'
const csv = require('csvtojson')
const mongodb = require("mongodb").MongoClient;
var mongo_config = require("../config").mongo_config;

var url = mongo_config.host;

// -> Import CSV File to MongoDB database
function importCsvData2MongoDB(file) {
    csv()
        .fromFile(filepath + file)
        .then((jsonObj) => {
            var today = new Date(); 
            jsonObj.forEach(function (elem) {
                elem.import_date = today;
            })

            // Insert Json-Object to MongoDB
            mongodb.connect(url, { useNewUrlParser: true }, (err, db) => {
                if (err) throw err;
                var dbo = db.db(mongo_config.db);
                dbo.collection(mongo_config.collection).insertMany(jsonObj, (err, res) => {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + res.insertedCount);
                    db.close();
                });
            });

            fs.unlinkSync(filepath + file);
        })
}


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, filepath)
    },
    filename: function (req, file, cb) {

        console.log("File Object", file);
        var ext = '';
        if (file.originalname.split('.').length > 1) {
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
        }

        var user_id =
            cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

var upload = multer({ storage: storage });

var uploadSingle = upload.single('uploadFile');

router.post('/record', (req, res, next) => {
    uploadSingle(req, res, (err) => {

        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        if (err) {
            res.end("Something went wrong!");
        }

        importCsvData2MongoDB(file.filename);
        res.json({ message: "file uploaded" + file.filename + ", " + file.size + "byte" });
    })
});

module.exports = router;
