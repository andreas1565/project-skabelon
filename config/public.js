module.exports = function (app, express) {
    app.use(express.static('./public')); // Where are static files located
}