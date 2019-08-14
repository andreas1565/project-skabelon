const db = require('../config/sql');
exports.get = function(req , res , next) {
    res.render('signup');
};

exports.post = async function(req, res ,next) {
    // backend validating 
   try {
       const profilesql = `INSERT INTO  profiles SET email = :email`
       const usersql = `INSERT INTO users SET username = :username, passphrase = :password, fk_profile = :fk`;
       const profile = await db.query(profilesql, {email: req.fields.email})
       const user = await db.query(usersql, {
        password:  req.fields.password,
        username: req.fields.username,
        fk: profile[0].insertId
       });
      res.send("du er nu oprettet som bruger tillykke! :)");
   } catch (error) {
       console.log(error);
       if(error.code === 'ER_DUP_ENTRY'){
           return res.send("denne bruger eksisterer allerede");
       }
       res.send('fejl');
   }
};