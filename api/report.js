const mongodb = require("mongodb").MongoClient;
var assert = require('assert');
var mongo_config = require("../config").mongo_config;

// db url
var url = mongo_config.host;

var findDocuments = function (db, callback) {
    var dbo = db.db(mongo_config.db);
    var collection = dbo.collection(mongo_config.collection);
    // Find some documents
    collection.find({ name: 'Dratini' }).toArray(function (err, docs) {
        console.log("Found the following records");
        callback(docs);
    });
}

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    findDocuments(db, function (docs) {
        console.log(docs);
        exports.getPokemonByName = function () {
            return docs;
        }
        db.close();
    });
});

router.get('/report', function (req, res) {
    
    res.jsonp(db.getPokemonByName());
  });