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

    /**
    * denne fuktion håndtere get metoden for endpointet /products dette route går at alle product kan blive vist og funktion getfroendproducts giver et response med en side med alle product 
     * @param {Function} app  express objektet
     */
    app.get('/products', getfroendproducts);

    /**
    * denne fuktion håndtere get metoden for endpointet /soeg/ dette route går at der komme en form og funktionen productsearch  gøre søg efter product navn og kategorie og price og beskrivelsen
     * @param {Function} app  express objektet
     */

    app.get('/soeg/', productsearch);

    /**
    * denne fuktion håndtere get metoden for endpointet /products/:categorieid dette route atman kan filtrer produkter efter den bestemte kategori ved hjælp af kategoriens id
     * @param {Function} app  express objektet
     */
    
    app.get('/products/:categorieid', getfroendproductswithcategorie);

    /**
    * denne fuktion håndtere get metoden for endpointet /singelproduct/:id dette route gør at man kan se den enkelt product ved hjæple af product id
     * @param {Function} app  express objektet
     */

    app.get('/singelproduct/:id', singelproduct);


    /*froend products end*/

    /**
    * denne fuktion håndtere get metoden for endpointet /dashboardproducts
     * @param {Function} app  express objektet
     */
    app.get('/dashboardproducts', isauthorized, isemployee, getproducts);
    
     /**
    * denne fuktion håndtere get metoden for endpointet /createproducts
     * @param {Function} app  express objektet
     */
    app.get('/dashboardcreateproducts',isauthorized, isadmin,  getcreateform);
    /**
     * denne funktion håndterere post metoden for endpointet /createproducts
     * @param {Function} app express objektet
     */
    app.post('/dashboardcreateproducts', isauthorized, isadmin, createproducts);
     /**
     * denne fuktion håndtere get metoden for endpointet /editproduct/:id 
     * @param {Function} app  express objektet
     */
    app.get('/dashboardeditproduct/:id', isauthorized,  isadmin, showproductsform);
     /**
     * denne funktion håndterere post metoden for endpointet /editproduct/:id
     * @param {Function} app express objektet
     */
    app.post('/dashboardeditproduct/:id',isauthorized, isadmin, editproducts);

    app.post('/dashboardeditproduct/image/:id', isauthorized, isadmin, editproductsimage);
    /**
     * denne fuktion håndtere get metoden for endpointet /deletecategorie/:id
     * @param {Function} app  express objektet
     */
    app.get('/dashboarddeleteproducts/:id',isauthorized, isadmin, deleteproducts);
}
   
