const db = require('../config/sql');
exports.getusers = async function(req,res,next){
    try {
        const usersql = `SELECT users.id, users.username, users.passphrase, profiles.email FROM users
        INNER JOIN profiles
        ON users.fk_profile = profiles.id`; 
        // Destructuring i sted for const users  res.render('users', { users: users[0] });
        const [rows,  fieilds] = await db.query(usersql);
       // console.log(rows);
       // console.log(fieilds);
        res.render('users', { users: rows });
        res.end();
    } catch (error) {
        console.log(error);
        res.send('fejl');
    }
};

exports.showuserform = async function(req, res, next){
    try {
        const usersql = `SELECT users.id, users.username, profiles.email FROM users
        INNER JOIN profiles
        ON users.fk_profile = profiles.id 
        WHERE  users.id = :id`;
        const [rows, fieilds ] = await db.query(usersql, {id: req.params.id});
        res.render('edituser', { user: rows[0] }); 
    } catch (error) {
        console.log(error);
        res.send('fejl'); 
    }
};

exports.edituser = async function(req, res, next){
    try {
        /*
        subquery er en sql sætning inde i en sætning
        (
            SELECT fk_profile from users
            WHERE id = :id 
        )
        */ 
       const usersql =  `UPDATE users SET username = :username WHERE id = :id`;
       const profilesql =  `UPDATE profiles SET email = :email 
        WHERE id = (
            SELECT fk_profile from users
            WHERE id = :id 
        )`;
        const user = await db.query(usersql, { id: req.params.id, username: req.fields.username });
        const profile = await db.query(profilesql, { id: req.params.id, email: req.fields.email });

        // req.route.path = //  /edituser/:id

        const path = req.route.path.replace(':id', '');
        res.redirect(path  + req.params.id);
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
};

exports.deleteuser = async  function(req,res,next) {
    try {
        const usersql = `DELETE FROM profiles WHERE id = (
            SELECT fk_profile FROM users WHERE id = :id
        )`;
        await db.query(usersql, { id: req.params.id });
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        res.send('fejl');  
    }
}