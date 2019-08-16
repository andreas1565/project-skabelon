const {getproducts, getcreateform, createproducts, showproductsform, editproducts, deleteproducts} = require('../controllers/products.controller');
/**
 *  products route
 * @module route/products
 */
module.exports =  function(app){
     /**
    * denne fuktion håndter get metoden for endpointet /products
     * @param {Function} app  express objektet
     */
    app.get('/products', getproducts);
     /**
    * denne fuktion håndter get metoden for endpointet /createproducts
     * @param {Function} app  express objektet
     */
    app.get('/createproducts', getcreateform);
    /**
     * denne funktion håndterer post metoden for endpointet /createcategorie
     * @param {Function} app express objektet
     */
    app.post('/createproducts', createproducts);
     /**
     * denne fuktion håndter get metoden for endpointet /editproduct/:id 
     * @param {Function} app  express objektet
     */
    app.get('/editproduct/:id', showproductsform);
     /**
     * denne funktion håndterer post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/editproduct/:id', editproducts);
    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/deleteuser/:id', deleteproducts);
}
   
