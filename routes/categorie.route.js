const {getcategorieform, createcategorie, getcategorie,  showcategorieform, editcategorie, deletecategorie} = require('../controllers/categories.controller');

module.exports =  function(app){
    app.get('/createcategorie',getcategorieform);
    app.post('/createcategorie', createcategorie);

    app.get('/categorie', getcategorie);
    app.get('/editcategorie/:id', showcategorieform);
    app.post('/editcategorie/:id', editcategorie);
    app.get('/deletecategorie/:id', deletecategorie);
}