// *** Dependencies
//  =============================================================
// eslint-disable-next-line no-undef
var express = require('express');

// Sets up the Express App
// =============================================================
var app = express();
// eslint-disable-next-line no-undef
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
// eslint-disable-next-line no-undef
var db = require('./src/models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Routes
// =============================================================
// eslint-disable-next-line no-undef
require('./src/routes/api-routes')(app);
// eslint-disable-next-line no-undef
// require('./routes/html-routes.js')(app);

// Syncing our database and logging a message to the user upon success
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
    });
});