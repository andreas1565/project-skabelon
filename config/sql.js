// mysql2 som standart kan ikke håndtere promises. men hvis du skive mysql2/promise og nu kan man bruge promises og async await
const {createPool} = require('mysql2/promise');
module.exports = (function(){
    return createPool({
        // host er adressen
        host: process.env.DB_HOST,
        // bruger navet til databasen
        user:  process.env.DB_USER,
        // adganskode til databasen
        password: process.env.DB_PASSWORD,
        // hvad  er navnet databasen 
        database:  process.env.DB_DATABASE,
        // hvor mange der kan være forbundet på samme tid
        connectionLimit: 10,
        port: process.env.DB_PORT,
        // det går at jeg kan have navn givene placeholder i  sted for ?
        namedPlaceholders:  true
    })
}())