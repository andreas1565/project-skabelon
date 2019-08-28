const db = require('../config/sql');
// denne funktion væger brugerrole fra user man det er i en ande table så jeg skal
// inner join for at både at få valgt fra user og role og spøre om level er = 50 eller over hvis hope til den næste funktion og hvis ikke så komn over til log in og  req.session.user kommer fra login.controller.js
module.exports =  async function(req, res, next){
    if(req.session.user === undefined){
        res.redirect('/login');
    }
    try {
        const usersql =  `
        SELECT roles.level, users.id
        FROM users
        INNER JOIN roles
        ON users.fk_role =  roles.id
         WHERE users.id = :id
        `;
        const [rows] = await db.query(usersql, {id: req.session.user});
        console.log(rows);
        if(rows[0].level === 10){
            return next();
          return
        }else{
            res.redirect('/login');
        }
       // res.redirect('/');
    } catch (error) {
        console.log(error);
       // res.redirect('/');
        return;
    }
}