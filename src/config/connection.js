// eslint-disable-next-line no-undef
const mysql = require('mysql');
let connection;

// eslint-disable-next-line no-undef
if (process.env.JAWSDB_URL) {
    // eslint-disable-next-line no-undef
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        // port: 3306,
        user: 'root',
        password: '12345678',
        database: 'shelfie_db'
    });
}
  
// Make connection.
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
  
// Export connection for our ORM to use.
// eslint-disable-next-line no-undef
module.exports = connection;