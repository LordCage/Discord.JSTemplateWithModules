const main = require('../bot.js');
exports.run = (client, message, args) => {
    let cmd = args.join(' ');
    main.load(message, cmd);
};

exports.conf = {
    name: 'load',
    description: 'Load a command. Reserved to bot owner.',
    aliases: [],

    enabled: true,
    guildOnly: false,
    ownerOnly: true
}