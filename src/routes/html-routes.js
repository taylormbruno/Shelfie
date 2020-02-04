// eslint-disable-next-line no-undef
// var path = require('path');

module.exports=function(app){

    // this route needs to go to signup/sign in page
    app.get('/', (req,res) => {
        // eslint-disable-next-line no-undef
        // res.sendFile(path.join(__dirname, '../../public/index.html'));
        res.send('hello world');
    });

    //this route needs to go to shelf page
    app.get('/home',(req, res) =>{
        // eslint-disable-next-line no-undef
        // res.sendFile(path.join(__dirname, '../../public/home.html'));
        res.send('hello world');
    });

};