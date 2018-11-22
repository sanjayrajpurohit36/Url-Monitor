//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema; //instance of Schema

const url_schema = new Schema({
    id: String,
    url: String,
    data: String,
    method: String,
    headers: String,
    responses: String,
    sync_status: String
});

module.exports = mongoose.model('URLM', url_schema);