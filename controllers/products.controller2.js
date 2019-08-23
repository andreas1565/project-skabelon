const db = require('../config/sql');
const fs = require('fs');
const {join} = require('path');   

/**
 * @module controler/getproductform
*/

/**
     * denne fuktion renderer create-product så er oprate product form og looper igenm alle kategoie i en select
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.getcreateform = async function(req, res, next){
    const categoriesql = `SELECT id,  name FROM categories`;
    const [rows, fieilds] = await db.query(categoriesql);
    res.render('dashboard/create-product', {categories: rows });
}
/**
 * @module controler/createproducts
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate products formen og insæter dem i databasen 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.createproducts = async function(req, res, next){
    let success = true;
    let errorMessage;
    if (!req.fields.categories || isNaN(req.fields.categories) || req.fields.categories == "0") {
        success = false;
        errorMessage ='vælg en kategorie';
    }
    if(req.fields.amount === ""){
        errorMessage = "feltet antal er tom";
        success = false;
    }else if(isNaN(req.fields.amount)){
        errorMessage = 'du kan kun skrive tal i antal feltet';
        success  = false;
    }
    if(req.fields.weight === ""){
        errorMessage = "feltet vægt er tom";
        success = false;
    }else if(isNaN(req.fields.weight)){
        errorMessage = 'du kan kun skrive tal i vægt feltet';
        success  = false;
    }
    if(req.fields.price === ""){
        errorMessage = "feltet prise er tom";
        success = false;
    }else if(isNaN(req.fields.price)){
        errorMessage = 'du kan kun skrive tal i postion feltet';
        success  = false;
    }
    if(req.fields.description === ""){
        errorMessage = "feltet beskrivelse er tom";
        success = false;
    }
     /* her spør man hvis det førest  element er et space  */ 
     if(req.fields.description[0] == " "){
        /* looper man i gemmen beskrives felte for at det førest ikke er et space */ 
        while(req.fields.description[0] === " ") {
            /* slice(1) fjern det føreste element */ 
            req.fields.description = req.fields.description.slice(1);
        }
        success = false;
        errorMessage = 'ingen mellemrum';
    }
    if(req.fields.name === ""){
        errorMessage = "feltet navn er tom";
        success = false;
    }
    if(success !== true){
        const categoriesql = `SELECT id,  name FROM categories`;
        const [rows, fieilds] = await db.query(categoriesql);
        res.render("dashboard/create-product",  {errorMessage, ...req.fields,  categories: rows});
         // return stopper fuction
        return;
    }
    try {
         /* uden resize */
        const productssql =  `INSERT INTO products SET name = :name, description = :description,  price = :price, weight = :weight, amount = :amount, fk_categories = :categories`; 
       const  products = await db.query(productssql, {
           name: req.fields.name,
           description: req.fields.description,
           price: req.fields.price,
           weight: req.fields.weight,
           amount: req.fields.amount,
           categories: req.fields.categories
       });
       res.redirect('products');
    } catch (error) {
        console.log(error);
        if(error.code === 'ER_DUP_ENTRY'){
             // return stopper fuction
            return res.send("denne bruger eksisterer allerede");
        }
        res.send('fejl');
    }
}
/**
 * @module controler/getproducts
 */
/**
     * denne fuktion renderer products.ejs med en table med alle data fra products table og INNER join categorie tablen for at de to tabler bliver til en
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/

exports.getproducts = async function (req, res, next){
    try {
        const productssql =  `SELECT products.id, products.name, products.description, products.price, products.weight, products.amount, categories.name as categoriesname FROM test3.products
        INNER JOIN categories
        ON fk_categories = categories.id`;
        const [rows, fieilds ] = await  db.query(productssql);
      //  console.log(rows);
         res.render('dashboard/products', { "title": 'products', products: rows });
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
};
/**
 * @module controler/showproductsform
 */

/**
     * denne fuktion renderer showproductsform som er en form med den enkelte products med hjælpe fra  req.params.id som er id fra  url og looper igenm alle kategoie i en select
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/
exports.showproductsform = async function(req, res, next){
    try {
        const productssql =  `SELECT products.id, products.name, products.description,  products.price, products.weight, products.amount, fk_categories FROM test3.products
        WHERE id = :id`;
        const categoriesql = `SELECT id,name FROM test3.categories`
        const [rows, fieilds] = await db.query(productssql, { id: req.params.id });
        const [rows2, fieilds2] = await db.query(categoriesql);
        res.render('dashboard/editproduct', { product: rows[0], categories: rows2}); 
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
}
/**
 * @module controler/editproducts
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate products og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.editproducts = async  function(req, res, next){
    let success = true;
    let errorMessage;
    if (!req.fields.categories || isNaN(req.fields.categories) || req.fields.categories == "0") {
        success = false;
        errorMessage ='vælg en kategorie';
    }
    if(req.fields.amount === ""){
        errorMessage = "feltet antal er tom";
        success = false;
    }else if(isNaN(req.fields.amount)){
        errorMessage = 'du kan kun skrive tal i antal feltet';
        success  = false;
    }
    if(req.fields.weight === ""){
        errorMessage = "feltet vægt er tom";
        success = false;
    }else if(isNaN(req.fields.weight)){
        errorMessage = 'du kan kun skrive tal i vægt feltet';
        success  = false;
    }
    if(req.fields.price === ""){
        errorMessage = "feltet prise er tom";
        success = false;
    }else if(isNaN(req.fields.price)){
        errorMessage = 'du kan kun skrive tal i postion feltet';
        success  = false;
    }
    if(req.fields.description === ""){
        errorMessage = "feltet beskrivelse er tom";
        success = false;
    }
     /* her spør man hvis det førest  element er et space  */ 
     if(req.fields.description[0] == " "){
        /* looper man i gemmen beskrives felte for at det førest ikke er et space */ 
        while(req.fields.description[0] === " ") {
            /* slice(1) fjern det føreste element */ 
            req.fields.description = req.fields.description.slice(1);
        }
        success = false;
        errorMessage = 'ingen mellemrum';
    }
    if(req.fields.name === ""){
        errorMessage = "feltet navn er tom";
        success = false;
    }
    if(success !== true){
        const productssql =  `SELECT products.id, products.name, products.description, products.price, products.weight, products.amount, fk_categories FROM test3.products
        WHERE id = :id`;
        const categoriesql = `SELECT id,name FROM test3.categories`
        const [rows, fieilds] = await db.query(productssql, { id: req.params.id });
        const [rows2, fieilds2] = await db.query(categoriesql);
        res.render("dashboard/editproduct",  {errorMessage,  product: rows[0], categories: rows2});
        return;
    }
    try {
        const productssql = `UPDATE products SET name = :name, description = :description, price = :price,  weight = :weight, amount = :amount, fk_categories = :categories  WHERE id = :id `;
        const  products = await db.query(productssql, {
            name: req.fields.name,
            description: req.fields.description,
            price: req.fields.price,
            weight: req.fields.weight,
            amount: req.fields.amount,
            categories: req.fields.categories,
            id: req.params.id
        });
        res.redirect('/editproduct/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}

exports.editproductsimage = async function(req, res, next){
    let success = true;
    let errorMessage;
     // Regular Expression er et objekt, der beskriver et mønster med tegn.
    // denne Regular Expression gør at den tester om der står image inde i req.files.image.type og test er en javascript method er sammen linger string
    if (!/image/.test(req.files.image.type)) {
        success = false;
        errorMessage = 'Den uploadede fil er ikke et billede';
    }
    if(req.files.image.size >  2000000){
        success = false;
        errorMessage = 'filen må max fulde 2mb';
    }
    if(success !== true){
        const productssql =  `SELECT products.id, products.name, products.description, products.price, products.weight, products.amount, fk_categories FROM test3.products
        WHERE id = :id`;
        const categoriesql = `SELECT id,name FROM test3.categories`
        const [rows, fieilds] = await db.query(productssql, { id: req.params.id });
        const [rows2, fieilds2] = await db.query(categoriesql);
        res.render("dashboard/editproduct",  {errorMessage,  product: rows[0], categories: rows2});
        return;
    }
    try {
         // fs.readFileSync hvilken file vi man gerne læse og forskellen på readFile og readFileSync er at readFile er asynkron og skal bruge et callback og readFileSync er synkron
         const tempfile = fs.readFileSync(req.files.image.path);
         // req.files.image.name er navn på file og  Date.now er et timestamp for hvornår filen er uploadet så jeg  sætter timestamp og navnet sammen og adskiller med _ 
         // hvis man haver 2 billeder med samme navn forhindre den at billederne ikke bliver overskrevet
         const newFileName = `${Date.now()}_${ req.files.image.name}`;
         // writeFileSync og  uploaddir er det sted i applicationen hvor filen skal ligge newfile er filens nye navn og data er den midlertidige mappe hvor dataen skal hentes fra
         fs.writeFileSync(join(__dirname, "../public/images/uploads", newFileName), tempfile);
        // her vælger jeg navnet og id på billedet kommer fra databasen fra det enkelte product og upload den nye til uploaddir 
        const result = await db.query('INSERT INTO images SET name = :name, fk_product = :productid',{
            name: newFileName,
            productid: req.params.id
        });
        res.redirect('/editproduct/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}
/**
 * @module controler/deletecategorie
 */

/**
     * denne fuktion sletter et products med hjælpe fra  req.params.id som er id fra  url
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.deleteproducts = async function(req, res, next){
    try {    
        const productssql = `DELETE FROM products WHERE id = :id`;
        await db.query(productssql, {id: req.params.id}); 
        res.redirect('/products');
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}