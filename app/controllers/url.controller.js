const UrlModel = require('../models/url.model.js');

module.exports =  { 
    
    create: function (req, res) {
        var dbo = req.app.db.db("url");
        var test = dbo.collection('data');        
        var data = req.body;
        test.insert(data).then(result => { 
            res.send({
                    success: true,
                    _id: result.id,
                    status: 200,
                });
        })
    
        // test.insert(data).then(function (result) {

        // test.find({"sync_status": "false"},function(err, items){
        //     async.each(items, function(item, callback){
        //         console.log("sd", item)
        //         //     console.log(items.length, item);
        //         //     test.findOneAndUpdate({"id": item.id}, {
        //         //         $set: {
        //         //             "responses": "data.url"
        //         //         }
        //         //     }).then(function(res){
        //         //         console.log("DONE ONE");
        //         //         callback();
        //         //     })
        //         // }
        //         ,
        //         function(err){
        //             console.log("DONE ALL");
        //         }
        //     );


        // console.log("result", result)

        // })
        // });       
    },

    const arr = [];
    this.state = [];

    moitorURL = (url) => {
        controller.get(url).then(res => {
            arr.push(res)
            this.setState({arr: arr})
        })
    }
    
    get: function (req, res) {
        var id = req.params.id;
        console.log(typeof id)
        var dbo = req.app.db.db("url");
        var test = dbo.collection('data');        
        test.findOne({"id": id}, function (err, result) {
        res.send({
                success: true,
                id: '1',
                responses: result.responses,
                url: result.url,
                data: result.data,
                method: result.mehtod,
                headers: result.headers,
                status: 200,
            });
        });       
    },

    update: function (req, res) {
        console.log("req",req.body);
        var dbo = req.app.db.db("url");
        var test = dbo.collection('data');
        var id = req.params.id;
        var data = req.body;
        console.log("data",data);
        test.findOneAndUpdate({"id": id}, {
            $set: {
                "url": data.url, 
                "method": data.method, 
                "data": data.data
            }
        })
        .then(function (result) {
            console.log("result",result);
            res.send({
                success: true,
                id: result.id,
                status: 200
            })
        })   
   },

   delete: function(req, res) {
        var dbo = req.app.db.db("url");
        var test = dbo.collection('data');
        var id = req.params.id;
        test.findOneAndDelete({"id": id}).then(function (result) {
            res.send({
                success: true,
                status: 200
            })
        })
   }, 
}
