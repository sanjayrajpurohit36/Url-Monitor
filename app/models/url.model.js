var mongoose = require("./mongoose")

const url_schema = new mongoose.Schema({
    id: String,
    url: String,
    data: String,
    method: String,
    headers: String,
    responses: Array,
    percentile_50: String,
    percentile_75: String,
    percentile_95: String,
    percentile_99: String,
    sync_status: String
});

module.exports = mongoose.model('URL', url_schema);