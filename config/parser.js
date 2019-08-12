const formiable = require("express-formidable");
module.exports = function (app){
    app.use(formiable());
}