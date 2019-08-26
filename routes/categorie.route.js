const {getcategorieform, createcategorie, getcategorie,  showcategorieform, editcategorie, deletecategorie} = require('../controllers/categories.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');

module.exports =  function(app){
     /**
     * denne fuktion håndter get metoden for endpointet /createcategorie 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardcreatecategorie', isauthorized, isadmin, getcategorieform);

    /**
     * denne funktion håndterer post metoden for endpointet /createcategorie
     * @param {Function} app express objektet
     */
    app.post('/dashboardcreatecategorie', isauthorized, isadmin,  createcategorie);

     /**
     * denne fuktion håndter get metoden for endpointet /categorie 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardcategorie', isauthorized, isemployee, getcategorie);
    /**
     * denne fuktion håndter get metoden for endpointet /editcategorie/:id 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardeditcategorie/:id', isauthorized, isadmin, showcategorieform);
     /**
     * denne funktion håndterer post metoden for endpointet /editcategorie/:id
     * @param {Function} app express objektet
     */
    app.post('/dashboardeditcategorie/:id', isauthorized, isadmin, editcategorie);
    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboarddeletecategorie/:id', isauthorized, isadmin, deletecategorie);
}