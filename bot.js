const Discord = require("discord.js");
const client = new Discord.Client({ autoReconnect: true });

const config = require('./config.json');

/*
Discord Bots API
Only use this if you want to transmit the guild size etc. to DiscordBotsList's API!
const dbl = require("dblposter");

const dblPoster = new dbl(`dbl api key`);

dblPoster.bind(client);
Discord Bots API
*/

require('./util/eventLoader')(client);

const token = config.token;

/* Uncomment this if you don't want any errors to show up in the console!
process.on('uncaughtException', expection => {
    return;
});
process.on('warning', warning => {
    return;
});
process.on('unhandledRejection', rejection => {
    return;
});
*/

// Don't touch these! They're basically utility commands.
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
var unload = (message, cmd) => {
    delete require.cache[require.resolve('./commands/' + cmd)];
    message.channel.send(`Unloaded ${cmd} successfully!`).then(
        response => response.delete(1000).catch(error => console.log(error))
    ).catch(error => console.log(error));
};
var load = (message, cmd) => {
    try {
        let cmdFile = require('./commands/' + cmd);
    } catch (error) {
        message.channel.send(`Problem loading ${cmd}:\n\`\`\`${error}\`\`\``).then(
            response => response.delete(1000).catch(error => console.log(error))
        ).catch(error => console.log(error));
    }
    message.channel.send(`Loaded ${cmd} successfully!`).then(
        response => response.delete(1000).catch(error => console.log(error))
    ).catch(error => console.log(error));
};
exports.reload = reload;
exports.unload = unload;
exports.load = load;

client.login(token);