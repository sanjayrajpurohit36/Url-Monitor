var mongoose = require("./mongoose");

const url_schema = new mongoose.Schema({
  url: String,
  responses: Array,
  sync_status: { type: Boolean, default: false }
});

module.exports = mongoose.model("URL", url_schema);
