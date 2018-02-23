const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });

const config = require('./config.json');

/*
Discord Bots API
const dbl = require("dblposter");

const dblPoster = new dbl(`dbl api key`);

dblPoster.bind(client);
Discord Bots API
*/

require('./util/eventLoader')(client);

const token = config.token;

// STOP ERRORS FROM SHOWING UP IN CONSOLE
process.on('uncaughtException', expection => {
    return;
});
process.on('warning', warning => {
    return;
});
process.on('unhandledRejection', rejection => {
    return;
});

var reload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.send(`Problem loading ${cmd}: ${error}`).then(
            response => response.delete(1000).catch(error => console.log(error))
        ).catch(error => console.log(error))
    }
    message.channel.send(`Reloaded ${cmd} successfully!`).then(
        response => response.delete(1000).catch(error => console.log(error))
    ).catch(error => console.log(error));
};
exports.reload = reload;




client.login(token);