module.exports = function(app, db) {
    const URL = require('../controllers/url.controller.js'); 
    /*
	Test route to make sure everything is working (accessed at GET http://localhost:8000/api/test)	
	A simple get route
    */
	   app.post('test/:data', URL.test);
    
    /** 
    *  @URL: GET http://localhost:8000/api/show	
    *  @desc: A show route to get all the data from books db and record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    // app.get('/show', URL.show);

    /** 
    *  @URL: POST http://localhost:8000/api/post	
    *  @desc: A post route to add books in record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    // app.post('/post', URL.create);

    /** 
    *  @URL: POST http://localhost:8000/api/bookdel/{id}	
    *  @desc: A post route to delete books from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    // app.delete('/bookdel/:id', URL.delete);   

    /** 
    *  @URL: POST http://localhost:8000/api/bookupdate/{id}	
    *  @desc: A post route to update a particular record from record collection 
    *  @Auhor: Sanjay Rajpurohit
    *  @Return: json responce
    */
    // app.put('/bookupdate/:id', Books.update);        
}