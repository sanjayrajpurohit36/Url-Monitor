//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema; //instance of Schema

const url_schema = new Schema({
    url: String,
    data: String,
    method: String,
    u_name: String,
    u_password: String,
});

module.exports = mongoose.model('URLM', url_schema);