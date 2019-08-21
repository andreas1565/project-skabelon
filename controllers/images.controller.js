const db = require('../config/sql');
const fs = require('fs');
const {join} = require('path');  

/**
 * @module controler/getimages
 */
/**
     * denne fuktion renderer images.ejs med en table med alle data fra images table og INNER join products tablen for at de to tabler bliver til en
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/

exports.getimages = async function(req, res, next){
    try {
       const  imgaesql = `SELECT  images.id, images.name as imagesname, products.name as productsname FROM images
        INNER JOIN products
        ON images.fk_product = products.id`;
       const  [rows] = await db.query(imgaesql);
       res.render('dashboard/images', {images: rows});
    } catch (error) {
        console.log(error);
        console.log('fejl');
    }
}

/**
 * @module controler/showimagesform
 */

/**
     * denne fuktion renderer showproductsform som er en form med den enkelte billede med hjælpe fra  req.params.id som er id fra  url og INNER join products tablen for at man som bruger kan se vilket product
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion 
*/

exports.showimagesform = async function(req, res, next){
    try {
        const imagesql =  `SELECT  images.id, images.name as imagesname, products.name as productsname FROM images
        INNER JOIN products
        ON images.fk_product = products.id`;
        const [rows, fieilds] = await db.query(imagesql, { id: req.params.id });
        res.render('dashboard/editimage', {image: rows[0]});
    } catch (error) {
        console.log(error);
        console.log('fejl'); 
    }
};

/**
 * @module controler/editimages
 */

/**
     * denne fuktion tjeker om felterne er tom og  image og insæter dem i databasen som en updatering  med hjælpe fra  req.params.id som er id fra  url  
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/
exports.editimages = async function(req, res, next){
    let success = true;
    let errorMessage;
     // denne Regular Expression gør at den tester om der står image inde i req.files.image.type og test er en javascript method er sammen linger string
     if (!/image/.test(req.files.image.type)) {
        success = false;
        errorMessage = 'Den uploadede fil er ikke et billede';
    }
    if(success !== true){
        const imagesql =  `SELECT  images.id, images.name as imagesname, products.name as productsname FROM images
        INNER JOIN products
        ON images.fk_product = products.id`;
        const [rows, fieilds] = await db.query(imagesql, { id: req.params.id });
        res.render('dashboard/editimage', {image: rows[0]}); 
    }
    try {
        const imagename = 'SELECT id, name FROM images WHERE  id = :id';
        const [rows] = await db.query(imagename, {id: req.params.id})
        const tempfile = fs.readFileSync(req.files.image.path);
        const newFileName = `${Date.now()}_${ req.files.image.name}`;
        fs.writeFileSync(join(__dirname, "../public/images/uploads", newFileName),tempfile);
        // her slette jeg den gammel file så uploadDir er hvor file liger og rows[0].image er navn på den gammel file
        fs.unlinkSync(join(__dirname, "../public/images/uploads", rows[0].name)); 
        const imgaesql =  `UPDATE images SET name = :image  WHERE id = :id`;
        const [result] = await db.query(imgaesql, {
            image: newFileName,
            id: req.params.id   
        });
        res.redirect('/editimage/' + req.params.id);
    } catch (error) {
        console.log(error);
        console.log('fejl');
    }
}

/**
 * @module controler/deleteimages
 */

/**
     * denne fuktion sletter et products med hjælpe fra  req.params.id som er id fra  url
     * @param {Object} req er et object
     * @param {Function} res er en Function callback
     * @param {Function} next er en Function callback og koncekvensen af next er den hopper videre til næste funktion
*/

exports.deleteimages = async function(req, res, next){
    try {
        const imagename = 'SELECT id, name FROM images WHERE  id = :id';
        const [rows] = await db.query(imagename, {id: req.params.id});
        fs.unlinkSync(join(__dirname, "../public/images/uploads", rows[0].name));
        const imagessql = `DELETE FROM images WHERE id = :id`;
        await db.query(imagessql, {id: req.params.id}); 
        res.redirect('/images');
    } catch (error) {
        console.log(error);
        console.log('fejl'); 
    }
}