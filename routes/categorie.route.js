const {getcategorieform, createcategorie, getcategorie,  showcategorieform, editcategorie, deletecategorie} = require('../controllers/categories.controller');

module.exports =  function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /createcategorie 
     * @param {Function} app  express objektet
     */
    app.get('/createcategorie',getcategorieform);

    /**
     * denne funktion håndterer post metoden for endpointet /createcategorie
     * @param {Function} app express objektet
     */
    app.post('/createcategorie', createcategorie);

     /**
     * denne fuktion håndter get metoden for endpointet /categorie 
     * @param {Function} app  express objektet
     */
    app.get('/categorie', getcategorie);
    /**
     * denne fuktion håndter get metoden for endpointet /editcategorie/:id 
     * @param {Function} app  express objektet
     */
    app.get('/editcategorie/:id', showcategorieform);
     /**
     * denne funktion håndterer post metoden for endpointet /editcategorie/:id
     * @param {Function} app express objektet
     */
    app.post('/editcategorie/:id', editcategorie);
    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/deletecategorie/:id', deletecategorie);
}