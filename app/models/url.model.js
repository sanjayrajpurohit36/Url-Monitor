var mongoose = require("./mongoose");

const url_schema = new mongoose.Schema({
  url: String,
  data: String,
  method: String,
  headers: String,
  responses: Array,
  percentile_50: String,
  percentile_75: String,
  percentile_95: String,
  percentile_99: String,
  sync_status: { type: Boolean, default: false }
});

module.exports = mongoose.model("URL", url_schema);
