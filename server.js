// *** Dependencies
//  =============================================================
// eslint-disable-next-line no-undef
var express = require('express');
var passport = require('./src/config/passport');
var exphbs = require('-handlebars');


// Sets up the Express App
// =============================================================
// eslint-disable-next-line no-undef
var PORT = process.env.PORT || 8080;
// eslint-disable-next-line no-undef
var db = require('./src/models');

// Sets up the Express app to handle data parsing

// Static directory

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// eslint-disable-next-line no-undef
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// Routes
// =============================================================
// eslint-disable-next-line no-undef
require('./src/routes/api-routes')(app);
// eslint-disable-next-line no-undef
// throwing error
require('./src/routes/html-routes.js')(app);

// Syncing our database and logging a message to the user upon success
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
    });
});
