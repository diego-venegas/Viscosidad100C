//Framework hapi.js
const Hapi = require('hapi');

// logic port and machine
const host = 'localhost';
const PORT = process.env.PORT || 8000; 

// Create Server
const server = Hapi.Server({
    host: host,
    PORT: PORT
});

// Initiate Server
const init = async () => {

    await server.start();
    console.log("Server up no porto: " + PORT);

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