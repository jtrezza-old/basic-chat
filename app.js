
const express   = require('express');
const swig      = require('swig');
const routes    = require('./routes'); //created by me
const http      = require('http');
const realtime  = require('./my_modules/realtime');//created by me
const port      = 8080;

const app       = express();
/**
 * We need an instance of http.Server in order to use socket.io. The function createServer accepts
 * a request handler function as the parameter (we will use the express app)
 */
const server    = http.createServer(app);

//Configuring swig
swig.setDefaults({ cache: false });
//Setting template engine. I've chosen Swig, Jade sucks :P
app.engine('html', swig.renderFile);
//Serving static files
app.use(express.static('public'));
//Setting the routes of the app
routes(app);
//Setting the server to the socket.io module
realtime(server);

/**
 * You can put the object app to listen too, but if you do that, the server will not serve the file
 * socket.io/socket.io.js. It's not necessary to add the second parameter, because the request handler have been
 * setted when the server object was instanciated. Moreover, if we do that, the express routes wil not work.
 */
server.listen(port);