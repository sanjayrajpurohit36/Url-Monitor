var MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const dbConfig = require("../../config/dbconfig");
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.URL);

module.exports = mongoose;
