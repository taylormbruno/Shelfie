// let User = require('../models/User.js');

const passport = require('../config/passport.js');
const db = require('../models');

let userID = 5;

module.exports = function(app) {
    // runs but never ends.
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        db.User.findAll({
            attributes: ['id'],
            where: {
                username: req.body.username
            }
        }).then(function(res){
            userID = res;
            console.log(userID);
        });
        res.json(req.user);
    });
    // adds new user successfully
    app.post('/api/signup', function(req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password 
        }).then(function(res) {
            res.redirect(307, '/api/login');
            console.log(res);
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    // have not figured out how to test with postman
    app.get('/logout', function(req, res) {
        userID = 0;
        req.logout();
        res.redirect('/');
    });

    // creates a new book 
    app.post('/api/addNewBook', function(req, res) {
        db.Books.create({
            book_title: req.body.title,
            book_id: req.body.isbn,
            book_shelf: 'Unread',
            userId: userID
        }).then(function(dbBooks) {
            console.log(dbBooks);
            res.json(dbBooks);
        });
    });

    // all find alls are untested
    app.get('/api/unread', function(req, res) {
        db.Books.findAll({
            where: {
                book_shelf: 'Unread',
                User_id: userID
            }
        }).then(function(dbBooks) {
            res.json(dbBooks);
        });
    });

    app.get('/api/current', function(req, res) {
        db.Books.findAll({
            where: {
                book_shelf: 'Current'
            }
        }).then(function(dbBooks) {
            res.json(dbBooks);
        });
    });

    app.get('/api/read', function(req, res) {
        db.Books.findAll({
            where: {
                book_shelf: 'Read'
            }
        }).then(function(dbBooks) {
            res.json(dbBooks);
        });
    });
    // app.put('/api/updateShelf, function(req, res) {
    // shelf type will be retrieved through req.body
    // })

    //app.delete('/api/remove:id)
};