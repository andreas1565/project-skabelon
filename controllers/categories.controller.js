const db = require('../config/sql');
/**
 * @module controler/getcategorieform
 */

/**
     * denne fuktion renderer create-categorie så er oprate kategorie form 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.getcategorieform = function(req , res , next) {
    res.render('create-categorie');
};

/**
 * @module controler/createcategorie
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate kategorie formen og insæter dem i databasen
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/

exports.createcategorie = async function(req, res ,next) {
    // backend validating 
    let success = true;
    let errorMessage;
    if (req.fields.name === "") {
        success = false;
        errorMessage ='feltet navn er tom';
    }
    if(req.fields.description === ""){
        errorMessage = "feltet beskrivesel er tom";
        success = false;
    }
    if(success !== true){
        res.render("create-categorie",  {errorMessage, ...req.fields});
         // return stopper fuction
        return;
    }
   try {
       const categoriesql = `INSERT INTO categories SET name = :name, description = :description`;
       const categorie = await db.query(categoriesql, {
        name:  req.fields.name,
        description: req.fields.description
       });
       res.redirect('categorie');
   } catch (error) {
       console.log(error);
       if(error.code === 'ER_DUP_ENTRY'){
            // return stopper fuction
           return res.send("denne bruger eksisterer allerede");
       }
       res.send('fejl');
   }
};

/**
 * @module controler/getcategorie
 */

/**
     * denne fuktion renderer getcategorie som er en table af alle data fra categorie
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} nexter en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/

exports.getcategorie = async function(req, res, next){
    try {
     const categoriesql = `SELECT id, name, description FROM test3.categories`
     const [rows, fieilds] = await db.query(categoriesql);
     res.render('categorie', {categories: rows}); 
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
}

/**
 * @module controler/showcategorieform
 */

/**
     * denne fuktion renderer showcategorieform som er en form med den enkelte kategori med hjælpe fra  req.params.id som er id fra  url 
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/

exports.showcategorieform = async function(req, res, next){
    try {
        const categoriesql = `SELECT id, name, description FROM categories WHERE id = :id`;
        const [rows, fieilds] = await db.query(categoriesql, { id: req.params.id});
        res.render('editcategorie', {categorie: rows[0]}); 
      //  console.log(rows[0]);
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}

/**
 * @module controler/editcategorie
 */

/**
     * denne fuktion tjeker om felterne er tom og insæter data fra oprate kategorie og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/

exports.editcategorie = async function(req, res, next){
    if (req.fields.name === "") {
        success = false;
        errorMessage ='feltet navn er tom';
    }
    if(req.fields.description === ""){
        errorMessage = "feltet beskrivesel er tom";
        success = false;
    }
    if(success !== true){
        const categoriesql = `SELECT id, name, description FROM categories WHERE id = :id`;
        const [rows, fieilds] = await db.query(categoriesql, { id: req.params.id});
        res.render("editcategorie",  {errorMessage, categorie: rows[0]});
        return;
    }
    try {
        const categoriesql = `UPDATE categories SET name = :name, description = :description  WHERE id = :id `;
        const  categorie = await db.query(categoriesql, {
            name: req.fields.name,
            description: req.fields.description,
            categories: req.fields.categories,
            id: req.params.id
        });
        res.redirect('/editcategorie/' + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}
/**
 * @module controler/deletecategorie
 */

/**
     * denne fuktion sletter en kategoire med hjælpe fra  req.params.id som er id fra  url
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.deletecategorie = async function(req, res, next){
    try {
        const categoriesql = `DELETE FROM categories WHERE id = :id`;
        await db.query(categoriesql, {id: req.params.id}); 
        res.redirect('/categorie');
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
}