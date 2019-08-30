const db = require('../config/sql');
const fs = require('fs');
const {join} = require('path');   
/* froend controller */ 
/**
 * @module controler/getfroendproducts 
*/

/**
     * denne fuktion renderer en template med de data fra produkttabellen som jeg har valgt og looper igennem alle produkter så de vist ude på siden det samme er gældende for kategorier den bliver  bare loopet igennem et select
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
 exports.getfroendproducts = async function(req, res, next){
    // bestem hvor mange elementer der skal vises pr side
    let items_pr_page = 3;
    
    // vi går som standard ud fra at det er den første side der skal vises
    let current_page = 1;

    // tjek at page findes i querystring og at det er et tal
    if(req.query.page != undefined){
        
        if(parseInt(req.query.page) < 1){
            res.redirect('/products');
            return;
        }
        if(parseInt(req.query.page) >= 1){
            current_page = parseInt(req.query.page);
        }
    }

    // find ud af hvor mange produkter der er i databasen
    let [result] = await db.query('SELECT COUNT(*) AS total_items FROM products');
    let total_items = result[0].total_items;

    // beregn hvor mange produkter der skal springes over 
    // for at vise den pågældende side
    // grunden til -1 er at current_page kan være 0  er at når man er på en førest skal den ikke spange noget over
    let offset  = (current_page - 1) * items_pr_page;

    // beregn hvor mange sider der er i alt, 
    // baseret på antal elementer og elementer pr side
    // Math.ceil gør kommatal til heltal ved at runde up 
    let total_pages = Math.ceil(total_items / items_pr_page);

    // hvis "offset" er større end totalle antal items, så indlæses den sidste side
    if (offset > total_items) {
    res.redirect('/products?page=' + total_pages);
     return;
    }


    // hent de produkter der hører til den side der skal vises
    // LIMIT har to værdier, den første er hvor meget der skal springes over
    // den anden er hvor mange der skal hentes
    const categoriessql = `SELECT id, name FROM test3.categories`;
    const productssql  = `SELECT  images.name AS imagesname, products.name AS productsname, products.id AS productsid, products.fk_categories  
    FROM products
    LEFT OUTER JOIN images
    ON images.fk_product = products.id AND images.primary = 1
    LIMIT :offset, :items_pr_page `;
    const [rows] =  await db.query(productssql, {
        offset: offset,
        items_pr_page: items_pr_page
    });
    const [rows2] = await db.query(categoriessql);
    res.render('frontend/products', { title: 'products' ,products: rows, categories: rows2,  'total_pages': total_pages, 'current_page': current_page});
} 
/**
     * denne fuktion renderer en template med de produkter som har en specifik kategori
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.getfroendproductswithcategorie = async function(req, res, next){
    const categoriessql = `SELECT id, name FROM test3.categories `;
    const productssql  = `SELECT  images.name AS imagesname, products.name AS productsname, products.id AS productsid, products.fk_categories  
    FROM products
    LEFT OUTER JOIN images
    ON images.fk_product = products.id AND images.primary = 1 WHERE fk_categories =  :categorieid`;
    const [rows] =  await db.query(productssql, {categorieid: req.params.categorieid});
    const [rows2] = await db.query(categoriessql);
    res.render('frontend/products', { title: 'products' ,products: rows, categories: rows2});
}
/**
     * denne fuktion renderer en template med de produkter hvor der er valgt det enkelt produkt id kommer fra et link fra /produkter og bliver hentet fra URL´ en med req.params.id
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.singelproduct = async function(req, res, next){
    const productssql = `SELECT products.id AS productsid,  products.name AS productsname, products.description,  products.price, products.weight, products.amount, images.name AS imagesname, fk_categories 
    FROM products
    LEFT OUTER JOIN images
    ON images.fk_product = products.id AND images.primary = 1
    WHERE products.id = :id `;

    const allimagessql = ` SELECT name, images.primary FROM images
    WHERE fk_product = :id AND images.primary = 0
    ORDER BY images.primary DESC `;
    
    const outerProductsql = `SELECT id,name FROM products
    WHERE fk_categories = :outerProduct AND id != :currentproductid
    ORDER BY RAND()
    LIMIT 3`;

    const [product] = await db.query(productssql, {id: req.params.id});

    const [images] = await db.query(allimagessql, {id: req.params.id});

    const [outerProducts] = await db.query(outerProductsql, {outerProduct: product[0].fk_categories, currentproductid: req.params.id});

    res.render('frontend/singelproduct', { title: 'enkel product' ,product: product[0], images, outerProducts});
}
/**
     * til at starte med kan man kun se formen på siden hvis man bare klikker søg uden at have skrevet noget så vil man få vist alle produkter men hvis man skriver noget i felterne vid deres søgeresultat blive sendt med ud på siden  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback 
*/
exports.productsearch = async function(req, res, next){
   /*  const searchsql = `SELECT images.name AS imagesname, products.name AS productsname, products.id AS productsid, categories.name AS categoriesname 
    FROM products
    LEFT OUTER JOIN images
    ON images.fk_product = products.id AND images.primary = 1
    INNER JOIN categories
    ON products.fk_categories = categories.id
    WHERE products.name LIKE :searchproduct OR categories.name LIKE :searchcategorie OR products.price LIKE :searchprice OR products.description LIKE :searchdescription`; */
    
    const categoriesql = `SELECT id,  name FROM categories`;
    
    const [categories] =  await db.query(categoriesql);
    // put req.query inde i en variabel for at kune vis data i form efter man har søgt
    let values = req.query;
    // her tjækker jeg om req.query er = 0 for at når man kommer inde på siden at den ikke viser produkteren
    if(Object.keys(req.query).length == 0){
        res.render('frontend/soeg', {categories, values});
    }else{
       // start grund sql sætningen, den kan hente samtlige produkter
        let sql_query = `
        SELECT images.name AS imagesname, products.name AS productsname, products.id AS productsid, categories.name AS categoriesname, products.price, products.description 
        FROM products
        LEFT OUTER JOIN images
        ON images.fk_product = products.id AND images.primary = 1
        INNER JOIN categories
        ON products.fk_categories = categories.id
        WHERE 1=1`;
        // start params samlingen, den skal bare være tom til at starte med
        let sql_params = {};
        // så her tjækker jeg om  query parameter name findes
        if(req.query.name != undefined && req.query.name != ""){
            // indesætter det der står i navn bliver en del af sqlen oven over
            sql_query += ' AND products.name LIKE :searchproduct ';
            sql_params.searchproduct = '%' + req.query.name + '%';
        }
        if(req.query.minimumPris != undefined && req.query.minimumPris != ""){
            sql_query += ' AND products.price  >= :minimumPris ';
            sql_params.minimumPris =  req.query.minimumPris  ;
        }
        if(req.query.maximumPris != undefined && req.query.maximumPris != ""){
            sql_query += ' AND products.price  <= :maximumPris ';
            sql_params.maximumPris =  req.query.maximumPris  ;
        }
        if(req.query.description != undefined || req.query.description != ""){
            sql_query += ' AND products.description LIKE :searchdescription ';
            sql_params.searchdescription = '%'+  req.query.description +'%';
        }
        if(req.query.categories != undefined && req.query.categories != ""){
            sql_query +=  ' AND  categories.id LIKE :searchcategorie ';
            sql_params.searchcategorie =req.query.categories;
        }
        // her kør jeg sql og sql_params og send det med over til template filen 
        const [searchs] =  await db.query(sql_query, sql_params);
        res.render('frontend/soeg',{'searchs': searchs, categories,  values});
    }
}
/* froend controller end */

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
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    if (!req.fields.categories || isNaN(req.fields.categories) || req.fields.categories == "0") {
        success = false;
        errorMessage ='vælg en kategorie';
    }
    if(req.fields.amount === ""){
        errorMessage = "feltet antal er tom";
        success = false;
    }
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    else if(isNaN(req.fields.amount)){
        errorMessage = 'du kan kun skrive tal i antal feltet';
        success  = false;
    }
    if(req.fields.weight === ""){
        errorMessage = "feltet vægt er tom";
        success = false;
    }
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    else if(isNaN(req.fields.weight)){
        errorMessage = 'du kan kun skrive tal i vægt feltet';
        success  = false;
    }
    if(req.fields.price === ""){
        errorMessage = "feltet prise er tom";
        success = false;
    }
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    else if(isNaN(req.fields.price)){
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
       res.redirect('/dashboardproducts');
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
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    if (!req.fields.categories || isNaN(req.fields.categories) || req.fields.categories == "0") {
        success = false;
        errorMessage ='vælg en kategorie';
    }
    if(req.fields.amount === ""){
        errorMessage = "feltet antal er tom";
        success = false;
    }
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    else if(isNaN(req.fields.amount)){
        errorMessage = 'du kan kun skrive tal i antal feltet';
        success  = false;
    }
    if(req.fields.weight === ""){
        errorMessage = "feltet vægt er tom";
        success = false;
    }
    // NaN betyder I flere sprog: 'Not A Number'
    // Javascript funktionen isNaN() giver 'true' hvis udtrykket i paranteser ikke er et tal.
    else if(isNaN(req.fields.weight)){
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
        res.redirect('/dashboardeditproduct/' + req.params.id);
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
        // her sætter jeg publiched til 0 hvis det ikke allerede er 0 
         const published = 0; 
         // hvis published ikke er undefined eller ==1 
         if(req.fields.published != undefined && req.fields.published == 1){
             published = 1;
         }
         // jeg opdatere primary til at være 0 hvis den er 1 skal den ændre status tilbage til 0 så jeg nedenunder kan ændre værdien til 1 
         if(published == 1){
             await db.query('update images set images.primary = 0 WHERE fk_product = :productid', {
                productid: req.params.id 
             });
         }
        // her vælger jeg navnet og id på billedet kommer fra databasen fra det enkelte product og upload den nye til uploaddir 
        const result = await db.query('INSERT INTO images SET name = :name, fk_product = :productid, images.primary = :published' ,{
            name: newFileName,
            productid: req.params.id,
            published: published
        });
       // console.log(result);
        res.redirect('/dashboardeditproduct/' + req.params.id);
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
        res.redirect('/dashboardproducts');
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}