const db = require('../config/sql');
// denne funktion væger brugerrole fra user man det er i en ande table så jeg skal
// inner join for at både at få valgt fra user og role og spøre om level er = 50 eller over hvis hope til den næste funktion og hvis ikke så komn over til log in og  req.session.user kommer fra login.controller.js
module.exports =  async function(req, res, next){
    try {
        const usersql =  `
        SELECT roles.level
        FROM users
        INNER JOIN roles
        ON users.fk_role =  roles.id
         WHERE users.id = :id
        `;
        const [rows] = await db.query(usersql, {id: req.session.user});

        if(rows[0].level >= 50){
            return next();
        }
        res.redirect('/');
    } catch (error) {
        res.redirect('/');
        return;
    }
}