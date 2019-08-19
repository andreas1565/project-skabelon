const {dashboard} = require('../controllers/dashboard.controller');
const isauthorized = require('../midleware/isauthorized');
const isemployee = require('../midleware/isemployee');
module.exports =  function(app){
    app.get('/dashboard', isauthorized, isemployee, dashboard);
}