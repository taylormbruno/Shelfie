
const passport = require('../config/passport.js');
const db = require('../models');

let userID = 5;

module.exports = function(app) {
    // runs but never ends.
    // eslint-disable-next-line no-undef
    app.post('/api/login', passport.authenticate('local'), function(req, res) {
        // receives error:
        // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.redirect('/users' + req.user.username);
        let body = req.body;
        let user = req.user;
        userID = user.dataValues.id;
        console.log(userID);
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
    // returns 'created_at' doesn't have a default value
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

    // unread book shelf finds return empty arrays -- no errors
    app.get('/api/unread', function(req, res) {
        db.Books.findAll({
            subQuery: false,
            attributes: ['id', 'book_title', 'book_id', 'book_shelf'],
            include: [
                {
                    model: db.User,
                    as: 'User', 
                    where: {id: { UserId: userID }}
                }
            ],
            where: {
                book_shelf: 'Unread',
                // UserId: userID
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

    // works as expected
    app.put('/api/updateShelf', function(req, res) {
    // shelf type will be retrieved through req.body
        db.Books.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }
        ).then(function(dbShelf) {
            res.json(dbShelf);
        });
    });

    // works as expected
    app.delete('/api/remove:id', function(req, res) {
        db.Books.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbDelete){
            res.json(dbDelete);
        });
    });
};