module.exports = function(app){
    // det er navet på den view engine jeg bruger 
    app.set('view engine', 'ejs');
    // hvor er viewsen hende de er i views mappen
    app.set('views', 'views');
};