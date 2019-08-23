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
        const imagesql =  `SELECT  images.id, images.name as imagesname, products.name as productsname FROM images
        INNER JOIN products
        ON images.fk_product = products.id`;
        const [rows, fieilds] = await db.query(imagesql, { id: req.params.id });
        res.render('dashboard/editimage', {image: rows[0], errorMessage}); 
    }
    try {
        const imagename = 'SELECT id, name FROM images WHERE  id = :id';
        const [rows] = await db.query(imagename, {id: req.params.id})
        const tempfile = fs.readFileSync(req.files.image.path); /*req.files.image.path er en sti hvor billedet ligge midlertidigt stien til mappen er c://user/bruger/appdata/local/temp/hashstrang  indeholde af mappe blievr slette hver gang man genstart serveren*/   // fs.readFileSync hvilken file vi man gerne læse og forskellen på readFile og readFileSync er at readFile er asynkron og skal bruge et callback og readFileSync er synkron
        // req.files.image.name er navn på file og  Date.now er et timestamp for hvornår filen er uploadet så jeg  sætter timestamp og navnet sammen og adskiller med _ 
        // det står inde i `` en string literal og det betyder at man kan skive variabler inde i en string og ${} er sådan man siger her er en variable
        const newFileName = `${Date.now()}_${ req.files.image.name}`;
        // ___dirname den mappe hvor filen ligger i 
        //  join  gør at den finder stien til mappen uanset hvilket filsystem du er på 
        // writeFileSync flytter jeg file fra den midlertidigt mappe jeg bestemer mappen er ../public/images/uploads og jeg buger ikke den midlertidigt mappe for di hvor gang server genstart så bliver den  midlertidigt mappe slette  
        fs.writeFileSync(join(__dirname, "../public/images/uploads", newFileName),tempfile);
        // her slette jeg den gammel file så ../public/images/uploads er hvor file liger og rows[0].image er navn på den gammel file
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