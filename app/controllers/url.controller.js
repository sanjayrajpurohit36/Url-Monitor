const UrlModel = require("../models/url.model.js");
const UrlRepository = require("../../repositories/UrlRepository");

module.exports = {
  create: function(req, res) {
    var data = req.body;
    UrlRepository.create(data)
      .then(result => {
        console.log(result);
        UrlRepository.hit_data(result);
        res.send({
          success: true,
          _id: result._id
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  getAll: function(req, res) {
    UrlRepository.all()
      .then(data => {
        res.send({
          success: true,
          data
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  get: function(req, res) {
    var id = req.params.id;
    UrlRepository.find(id)
      .then(resp => {
        result = resp[0];
        res.send({
          success: true,
          _id: result._id,
          responses: result.responses,
          percentile_50: result.percentile_50,
          percentile_75: result.percentile_75,
          percentile_95: result.percentile_95,
          percentile_99: result.percentile_99,
          url: result.url,
          data: result.data,
          method: result.method,
          headers: result.headers,
          sync_status: result.sync_status
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message: "Not found"
        });
      });
  },

  update: function(req, res) {
    var id = req.params.id;
    var data = req.body;
    UrlRepository.update(id, data)
      .then(result => {
        res.send({
          success: true,
          id: result.id
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  },

  delete: function(req, res) {
    var id = req.params.id;
    UrlRepository.delete(id)
      .then(result => {
        res.send({
          success: true
        });
      })
      .catch(message => {
        res.send({
          success: false,
          message
        });
      });
  }
};
