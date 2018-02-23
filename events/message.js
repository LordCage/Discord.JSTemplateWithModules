const config = require('../config.json');
module.exports = message => {
    const client = message.client;
    const prefix = config.prefix;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let cmdFile = require(`../commands/${command}`);
        cmdFile.run(client, message, args);
    } catch (error) {
        console.log(`Command ${command} failed!\n${error}`)
    }
};