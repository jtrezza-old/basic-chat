
const express = require('express');
const swig = require('swig');
const routes = require('./routes'); //created by me
const port = 8080;

swig.setDefaults({ cache: false });

const app = express();
app.engine('html', swig.renderFile);
//Serving static files
app.use(express.static('public'));
//Setting the routes of the app
routes(app);

app.listen(port, function(){
    console.log('App running on port '+port);
});