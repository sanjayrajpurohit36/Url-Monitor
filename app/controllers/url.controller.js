const UrlModel = require('../models/url.model.js'); // Object of model

module.exports =  { 
    
    test: function (req, res) {
            console.log(req);
    },
    
    /** 
    *  @URL: GET http://localhost:8080/api/show	
    *  @desc: A show route to get all the data from books db and record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    show: function (req, res) {
        var dbo = req.app.db.db("books");
        var test = dbo.collection('record');        
        test.find().toArray().then(function (result) {
        return res.status(200).send({
                data: result,
                message: "Complete data fetched",
                error: ''
            });   
        });
    },

    /** 
    *  @URL: POST http://localhost:8080/api/post	
    *  @desc: A post route to add books in record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
   create: function (req, res) {
        var dbo = req.app.db.db("books");
        var test = dbo.collection('record');        
        var data = req.body.data;               // data from user
        test.insert(data).then(function (result) {
        res.send({
                message: "Data Inserted Successfully",
                error: '',
                status: 200,
            });
        });       
   },

   /** 
    *  @URL: POST http://localhost:8080/api/bookdel/{id}	
    *  @desc: A post route to delete books from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
   delete: function(req, res) {
        var dbo = req.app.db.db("books");
        var test = dbo.collection('record');
        var book_id = parseInt(req.params.id);   //id parsed in int from URL
        test.findOneAndDelete({"id": book_id}).then(function (result) {
            res.send({
                message: "Data Deleted Successfully",
                error: '',
                status: 200
            })
        })
   }, 

   /** 
    *  @URL: POST http://localhost:8080/api/bookupdate/{id}	
    *  @desc: A post route to update a particular record from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
   update: function (req, res) {
        var dbo = req.app.db.db("books");
        var test = dbo.collection('record');
        var id = parseInt(req.params.id); //id parsed in int from URL
        var data = req.body.data;       //updated data from user
        test.findOneAndUpdate({"id": id},{$set:{"id": data.id, "title": data.title, 
        "author": data.author, "read": data.read}})
        .then(function (result) {
            res.send({
                message: "Data Updates Successfully",
                error: '',
                status: 200
            })
        })   
   },

}
