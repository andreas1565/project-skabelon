const db = require('../config/sql');

exports.getcreateform = async function(req, res, next){
    const categoriesql = `SELECT id,  name FROM categories`;
    const [rows, fieilds] = await db.query(categoriesql);
    res.render('create-product', {categories: rows });
}

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
    if(req.fields.name === ""){
        errorMessage = "feltet navn er tom";
        success = false;
    }
    if(success !== true){
        const categoriesql = `SELECT id,  name FROM categories`;
        const [rows, fieilds] = await db.query(categoriesql);
        res.render("create-product",  {errorMessage, ...req.fields,  categories: rows});
        return;
    }
    try {
        const productssql =  `INSERT INTO products SET name = :name, description = :description, price = :price, weight = :weight, amount = :amount, fk_categories = :categories`; 
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
            return res.send("denne bruger eksisterer allerede");
        }
        res.send('fejl');
    }
}
/**
 * @module controler/getproducts
 */
/**
     * denne fuktion renderer products.ejs med data 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback
*/

exports.getproducts = async function (req, res, next){
    try {
        const productssql =  `SELECT products.id, products.name, products.description, products.price, products.weight, products.amount, categories.name as categoriesname FROM test3.products
        INNER JOIN categories
        ON fk_categories = categories.id`;
        const [rows, fieilds ] = await  db.query(productssql);
      //  console.log(rows);
         res.render('products', { "title": 'products', products: rows });
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
};

exports.showproductsform = async function(req, res, next){
    try {
        const productssql =  `SELECT products.id, products.name, products.description, products.price, products.weight, products.amount, fk_categories FROM test3.products
        WHERE id = :id`;
        const categoriesql = `SELECT id,name FROM test3.categories`
        const [rows, fieilds] = await db.query(productssql, { id: req.params.id });
        const [rows2, fieilds2] = await db.query(categoriesql);
        res.render('editproduct', { product: rows[0], categories: rows2}); 
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
}

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
        res.render("editproduct",  {errorMessage,  product: rows[0], categories: rows2});
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