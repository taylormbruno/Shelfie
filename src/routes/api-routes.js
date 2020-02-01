let db = require('../models');
let passport = require('../config/passport');

let userID;

module.exports = function(app) {
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        db.User.findAll({
            attributes: ['id'],
            where: {
                username: 'tb'
            }
        }).then(function(res){
            userID = res;
        });
        res.json(req.user);
    });

    app.post('/api/signup', function(req, res) {
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function() {
            res.redirect(307, '/api/login');
        }).catch(function(err) {
            res.status(401).json(err);
        });
    });

    app.get('/logout', function(req, res) {
        userID = 0;
        req.logout();
        res.redirect('/');
    });

    app.post('/api/addNewBook', function(req, res) {
        db.Books.create({
            book_title: req.body.title,
            book_id: req.body.isbn,
            book_shelf: 'Unread'
        }).then(function(dbBooks) {
            res.json(dbBooks);
        });
    });

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

};