// async await er for at undgå at lave call back funktioner og prommissees 
// ulempen  ved call backs er at vi får et call back inden i et call back og det  bliver et  call back helvede
// ulempen  ved prommisses er at det er en funktion inde  i en funktion  og det er svært at læse
// koden  inden i try prøver vi om virker 
// catch får fat i fejlen og viser den hvis der er en i consolen og  lukker programmet
module.exports = async function(app){
    try {
        await app.listen(process.env.PORT);
        console.log('app kører på port', process.env.PORT);
    } catch (error) {
        console.error(error);
        // denne  funktion sørger for at programmet lukker ordentligt 1 betyder luk programmet uden at gøre noget 
        process.exit(1);
    }
}