// eslint-disable-next-line no-undef
// var path = require('path');
// const db = require('../models');


module.exports=function(app){

    // this route needs to go to signup/sign in page
    app.get('/', (req,res) => {
        res.render('index');
    });

    //this route needs to go to shelf page
    app.get('/home',(req, res) =>{
        res.render('home');
    });

};