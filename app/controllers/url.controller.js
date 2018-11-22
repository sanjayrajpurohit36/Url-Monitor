const UrlModel = require('../models/url.model.js');
const UrlRepository = require('../../repositories/UrlRepository');

module.exports = {

    create: function (req, res) {
        var data = req.body;
        UrlRepository.create(data).then(result => {
            UrlRepository.hit_data(data);
            res.send({
                success: true,
                _id: result.id,
                status: 200,
            });
        }).catch(msg => {
            res.send({
                success: false,
                msg,
                status: 500,
            });
        }) 
    },

    get: function (req, res) {
        var id = req.params.id;
        UrlRepository.find(id).then(resp => {
            let result = resp[0]
            res.send({
                success: true,
                id: '1',
                responses: result.responses,
                percentile_50: result.percentile_50,
                percentile_75: result.percentile_75,
                percentile_95: result.percentile_95,
                percentile_99: result.percentile_99,
                url: result.url,
                data: result.data,
                method: result.method,
                headers: result.headers,
                status: 200,
            });
        });
    },

    update: function (req, res) {
        var id = req.params.id;
        var data = req.body;
        UrlRepository.update(id, data).then(result => {
            res.send({
                success: true,
                id: result.id,
                status: 200
            })
        }).catch(err => {
            res.send({
                success: false,
                err,
                status: 500
            })
        })
    },

    delete: function (req, res) {
        var id = req.params.id;
        UrlRepository.delete(id).then(result => {
            res.send({
                success: true,
                status: 200
            })
        })
    },
}