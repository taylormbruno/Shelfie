// eslint-disable-next-line no-undef
const connection = require('../config/connection').default;

// save email as username
let orm = {
    createUser: function(user, cb){
        let qS = 'CREATE TABLE ' + user + ' (id INT AUTO_INCREMENT NOT NULL, book_title VARCHAR(150), shelf VARCHAR(150) NOT NULL, PRIMARY KEY (id));';
        connection.query(qS, (err,result) => {
            if (err) throw err;
            cb(result);
        });
    },
    allUnread: function(table, cb) {
        let qS = 'SELECT * FROM' + table + ' WHERE shelf="Unread"';
        connection.query(qS, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    allCurrent: function(table, cb) {
        let qS = 'SELECT * FROM' + table + ' WHERE shelf="Current"';
        connection.query(qS, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    allRead: function(table, cb) {
        let qS = 'SELECT * FROM' + table + ' WHERE shelf="Read"';
        connection.query(qS, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // addBook: function(table, title, bookID, status, cb) {
    //     let qS = 'INSERT INTO ' + table;
    //     qS += 
    // }
};

// eslint-disable-next-line no-undef
module.exports = orm;