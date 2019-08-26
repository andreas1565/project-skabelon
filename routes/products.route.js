const {getproducts, getcreateform, createproducts, showproductsform, editproducts, editproductsimage, deleteproducts, getfroendproducts, singelproduct, getfroendproductswithcategorie, productsearch} = require('../controllers/products.controller2');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
const isadmin = require('../midleware/isadmin');
/**
 *  products route
 * @module route/products
 */
module.exports =  function(app){
    /*froend products*/ 
    
    app.get('/products', getfroendproducts);
    
    app.get('/soeg/', productsearch)
    
    app.get('/products/:categorieid', getfroendproductswithcategorie);

    app.get('/singelproduct/:id', singelproduct);


    /*froend products end*/
    /**
    * denne fuktion håndter get metoden for endpointet /products
     * @param {Function} app  express objektet
     */
    app.get('/dashboardproducts', isauthorized, isemployee, getproducts);
     /**
    * denne fuktion håndter get metoden for endpointet /createproducts
     * @param {Function} app  express objektet
     */
    app.get('/dashboardcreateproducts',isauthorized, isadmin,  getcreateform);
    /**
     * denne funktion håndterer post metoden for endpointet /createproducts
     * @param {Function} app express objektet
     */
    app.post('/dashboardcreateproducts', isauthorized, isadmin, createproducts);
     /**
     * denne fuktion håndter get metoden for endpointet /editproduct/:id 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardeditproduct/:id', isauthorized,  isadmin, showproductsform);
     /**
     * denne funktion håndterer post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/dashboardeditproduct/:id',isauthorized, isadmin, editproducts);

    app.post('/dashboardeditproduct/image/:id', isauthorized, isadmin, editproductsimage);
    /**
     * denne fuktion håndter get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboarddeleteproducts/:id',isauthorized, isadmin, deleteproducts);
}
   
