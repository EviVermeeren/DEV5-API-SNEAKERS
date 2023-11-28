module.exports.go = (server) => {
    const Primus = require('primus');

    const primus = new Primus(server, {
        transformer : 'websockets',
    });

    //check if connection is valid and log it
    primus.on('connection', (spark) => {
        console.log('Connection made');

        spark.on('data', (data) => {
            console.log("team: " + data.team + " with score: " + data.score);
            primus.write(data);

        });

    });
};