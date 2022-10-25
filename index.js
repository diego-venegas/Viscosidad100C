//Framework hapi.js
const Hapi = require('hapi');

const bourne = require("@hapi/bourne");

// logic port and machine
const host = 'localhost';
const port = process.env.PORT || 8000; 

// Create Server
const server = Hapi.Server({
    host: host,
    port: port
});

// Initiate Server
const init = async () => {

    await server.start();
    console.log("Server up no porto: " + port);

}
//Define routes
require('./routes/routes')(server);
//Initiate App
init();

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {

        var data = {
            msg: 'API Calculadora'
        };

        return data;
    }
});