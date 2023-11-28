module.exports.go = (server) => {
    const Primus = require('primus');

    const primus = new Primus(server, {
        transformer : 'websockets',
    });

    //check if connection is valid and log it
    primus.on('connection', (spark) => {
        console.log('Connection made');


    });
};