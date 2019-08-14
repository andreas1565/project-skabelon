const db = require('../config/sql');
exports.getcategorieform = function(req , res , next) {
    res.render('create-categorie');
};

exports.createcategorie = async function(req, res ,next) {
    // backend validating 
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
           return res.send("denne bruger eksisterer allerede");
       }
       res.send('fejl');
   }
};

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

exports.editcategorie = async function(req, res, next){
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